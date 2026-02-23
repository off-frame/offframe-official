import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";

const svg = readFileSync("C:/OffFrame/favicon.svg");

// favicon.png (32x32) → ico代わり
await sharp(svg).resize(32, 32).png().toFile("public/favicon-32.png");

// apple-touch-icon (180x180)
await sharp(svg).resize(180, 180).png().toFile("public/apple-touch-icon.png");

// OGP用 (512x512)
await sharp(svg).resize(512, 512).png().toFile("public/favicon-512.png");

console.log("✅ favicon生成完了");
