"""
Finds faces in every gallery photo and writes src/data/gallery-focus.ts: a CSS object-position
per photo that keeps the faces inside the frame wherever the photo is cropped with object-cover.

The position is solved for the tightest crops on the site:
  - wide frames up to 2.25:1 (edition-card covers) for the vertical position
  - tall frames down to 0.75:1 (photo strip) for the horizontal position
A position that fits the faces in the tightest frame also fits them in any looser frame.

Run: python scripts/face-focus.py
Needs: opencv-python. Fix any misses in OVERRIDES below.
"""
import json
import os
import re

import cv2

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GALLERY_TS = os.path.join(ROOT, "src", "data", "gallery.ts")
OUT = os.path.join(ROOT, "src", "data", "gallery-focus.ts")

WIDEST = 2.25  # width / height of the widest frame
NARROWEST = 0.75  # width / height of the narrowest frame
MARGIN = 0.35  # extra room around each face, as a fraction of its size (hair, chin)

# Hand-checked positions that win over detection: "x% y%"
OVERRIDES: dict[str, str] = {
    "/gallery/bareilly-2026-002.webp": "30% 36%",
    "/gallery/bareilly-2026-010.webp": "50% 27%",
    "/gallery/bareilly-2026-020.webp": "95% 8%",
    "/gallery/patna-2026-131.webp": "50% 23%",
    "/gallery/mumbai-2026-173.webp": "70% 0%",
    "/gallery/mumbai-2026-191.webp": "30% 14%",
    "/gallery/mumbai-2026-197.webp": "70% 45%",
    "/gallery/mumbai-2026-210.webp": "100% 65%",
    "/gallery/bareilly-2025-222.webp": "50% 25%",
    "/gallery/bareilly-2025-229.webp": "10% 13%",
    "/gallery/bhopal-2025-327.webp": "50% 30%",
    "/gallery/bhopal-2025-337.webp": "50% 0%",
    "/gallery/bhopal-2025-340.webp": "80% 9%",
}

cascades = [cv2.CascadeClassifier(cv2.data.haarcascades + n) for n in ("haarcascade_frontalface_default.xml", "haarcascade_profileface.xml")]


def skin_share(img, x, y, fw, fh):
    """Share of skin-toned pixels in the middle of a box (rejects shirts, posters and logos)."""
    roi = img[y + fh // 5 : y + fh * 4 // 5, x + fw // 5 : x + fw * 4 // 5]
    if roi.size == 0:
        return 0
    ycc = cv2.cvtColor(roi, cv2.COLOR_BGR2YCrCb)
    mask = cv2.inRange(ycc, (40, 135, 85), (255, 180, 135))
    return cv2.countNonZero(mask) / (roi.shape[0] * roi.shape[1])


def faces_in(img):
    h, w = img.shape[:2]
    gray = cv2.equalizeHist(cv2.cvtColor(img, cv2.COLOR_BGR2GRAY))
    min_side = int(min(w, h) * 0.045)
    found = []
    for i, c in enumerate(cascades):
        neighbours = 9 if i == 0 else 11
        for x, y, fw, fh in c.detectMultiScale(gray, scaleFactor=1.08, minNeighbors=neighbours, minSize=(min_side, min_side)):
            found.append((x, y, fw, fh))
        if i == 1:  # profiles facing the other way
            flipped = cv2.flip(gray, 1)
            for x, y, fw, fh in c.detectMultiScale(flipped, scaleFactor=1.08, minNeighbors=neighbours, minSize=(min_side, min_side)):
                found.append((w - x - fw, y, fw, fh))
    found = [b for b in found if skin_share(img, *b) >= 0.35]
    # Merge overlapping boxes
    merged = []
    for b in sorted(found, key=lambda b: -b[2] * b[3]):
        cx, cy = b[0] + b[2] / 2, b[1] + b[3] / 2
        if not any(abs(cx - (m[0] + m[2] / 2)) < m[2] * 0.6 and abs(cy - (m[1] + m[3] / 2)) < m[3] * 0.6 for m in merged):
            merged.append(b)
    # Ignore tiny faces far smaller than the main ones (crowd in the background)
    if merged:
        biggest = max(b[2] for b in merged)
        merged = [b for b in merged if b[2] >= biggest * 0.4]
    return merged


def solve(lo, hi, visible, center_fallback):
    """Start of a window of size `visible` (all fractions of 0..1) that covers [lo, hi], as an object-position fraction."""
    if visible >= 1:
        return center_fallback
    if hi - lo <= visible:
        start = (lo + hi) / 2 - visible / 2
    else:
        start = lo  # too tall to fit: keep the top (foreheads and eyes beat chins)
    start = min(max(start, 0), 1 - visible)
    return start / (1 - visible)


def axis_span(boxes, pos, size, extent, visible):
    """Faces along one axis, largest first, added while they still fit the window."""
    boxes = sorted(boxes, key=lambda b: -b[size])
    lo = hi = None
    for b in boxes:
        pad = b[size] * MARGIN
        a, z = (b[pos] - pad) / extent, (b[pos] + b[size] + pad * 0.6) / extent
        nlo, nhi = (a, z) if lo is None else (min(lo, a), max(hi, z))
        if lo is not None and nhi - nlo > visible:
            continue
        lo, hi = nlo, nhi
    return max(lo, 0), min(hi, 1)


def main():
    src = open(GALLERY_TS, encoding="utf-8").read()
    photos = re.findall(r'"src": "([^"]+)"', src)
    focus, misses = {}, []
    for p in photos:
        img = cv2.imread(os.path.join(ROOT, "public", p.lstrip("/")))
        h, w = img.shape[:2]
        boxes = faces_in(img)
        if not boxes:
            misses.append(p)
            # No faces found: people are usually in the upper-middle of event photos
            x, y = 0.5, 0.35
        else:
            v_visible = (w / WIDEST) / h
            h_visible = (h * NARROWEST) / w
            ylo, yhi = axis_span(boxes, 1, 3, h, v_visible)
            xlo, xhi = axis_span(boxes, 0, 2, w, h_visible)
            y = solve(ylo, yhi, v_visible, 0.5)
            x = solve(xlo, xhi, h_visible, 0.5)
        focus[p] = f"{round(x * 100)}% {round(y * 100)}%"
    focus.update(OVERRIDES)

    with open(OUT, "w", encoding="utf-8", newline="\n") as f:
        f.write("/* Generated by scripts/face-focus.py. Do not edit by hand: use OVERRIDES in the script. */\n\n")
        f.write("/** CSS object-position per gallery photo, keeping faces in frame when cropped */\n")
        f.write("export const FOCUS: Record<string, string> = ")
        f.write(json.dumps(focus, indent=1, ensure_ascii=False))
        f.write(";\n\nexport const focusOf = (src: string) => FOCUS[src] ?? \"50% 35%\";\n")
    print(f"{len(photos)} photos, {len(misses)} without detected faces")
    print("misses:", " ".join(m.split("/")[-1].replace(".webp", "") for m in misses))


main()
