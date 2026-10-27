/*
  Author photos: public/authors/*.jpg → square public/authors/{slug}.webp for the round avatars.
  Large portraits get a hand-picked square crop around the face (in original pixels).
  Run: node scripts/build-authors.mjs
*/
import sharp from "sharp";

const SIZE = 240; // avatars show at 56–80px; 240 covers 3x screens

const PHOTOS = [
  { file: "abdul.jpg", slug: "abdul-bismillah", crop: { left: 684, top: 684, width: 4102, height: 4102 } },
  { file: "adnan.jpg", slug: "adnan-kafeel-darvesh" },
  { file: "geet.jpg", slug: "geet-chaturvedi" },
  { file: "geetashree.jpg", slug: "geetashree" },
  { file: "kumar.jpg", slug: "kumar-ambuj" },
  { file: "naresh.jpg", slug: "naresh-saxena" },
  { file: "rajesh.jpg", slug: "rajesh-joshi" },
  { file: "shivmurti.jpg", slug: "shivmurti", crop: { left: 327, top: 420, width: 1495, height: 1495 } },
  { file: "sujata.jpg", slug: "sujata" },
  { file: "udayan.jpg", slug: "udayan-vajpeyi" },
];

for (const p of PHOTOS) {
  let img = sharp(`public/authors/${p.file}`).rotate();
  if (p.crop) img = sharp(await img.extract(p.crop).toBuffer());
  const out = `public/authors/${p.slug}.webp`;
  const info = await img.resize(SIZE, SIZE, { fit: "cover", position: "attention", withoutEnlargement: true }).webp({ quality: 82 }).toFile(out);
  console.log(out, `${info.width}x${info.height}`, `${(info.size / 1024).toFixed(1)}KB`);
}
