"use client";

import { useSyncExternalStore } from "react";

export type Theme = "light" | "dark";
export const THEME_KEY = "rk-theme";

/* ---------- Theme: reads <html data-theme>, which the inline script sets before paint ---------- */
function subscribeTheme(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}

export function useTheme(): Theme {
  return useSyncExternalStore(
    subscribeTheme,
    () => (document.documentElement.dataset.theme === "dark" ? "dark" : "light"),
    () => "light",
  );
}

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* storage blocked: theme still applies for this visit */
  }
}

/* ---------- Scroll ---------- */
function subscribeScroll(cb: () => void) {
  window.addEventListener("scroll", cb, { passive: true });
  window.addEventListener("resize", cb);
  return () => {
    window.removeEventListener("scroll", cb);
    window.removeEventListener("resize", cb);
  };
}

export function useScrolled(threshold = 8) {
  return useSyncExternalStore(subscribeScroll, () => window.scrollY > threshold, () => false);
}

/** Id of the section currently under the header, or "" at the top of the page. */
export function useActiveSection(ids: readonly string[]) {
  return useSyncExternalStore(
    subscribeScroll,
    () => {
      const line = 120;
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      return current;
    },
    () => "",
  );
}

/* ---------- Clock: whole seconds, null on the server ---------- */
function subscribeClock(cb: () => void) {
  const t = window.setInterval(cb, 1000);
  return () => window.clearInterval(t);
}

export function useNowSeconds(): number | null {
  return useSyncExternalStore(subscribeClock, () => Math.floor(Date.now() / 1000), () => null);
}
