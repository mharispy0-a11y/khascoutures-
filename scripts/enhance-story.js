const sharp = require("sharp");
const path = require("path");

const src = path.join(__dirname, "../public/story-model.jpg");
const tmp = src + ".tmp.jpg";

async function enhance() {
  const meta = await sharp(src).metadata();
  console.log(`Input: ${meta.width}x${meta.height}`);

  await sharp(src)
    // 2× upscale with Lanczos — recovers perceived detail lost to Instagram compression
    .resize(meta.width * 2, null, { kernel: sharp.kernel.lanczos3 })
    // Gentle unsharp mask — brings back edge crispness without halos
    .sharpen({ sigma: 0.6, m1: 0.4, m2: 1.2 })
    // Lift saturation just enough to make yellows and skin tones vivid
    .modulate({ saturation: 1.18 })
    // Very mild contrast: multiply 1.04, pull shadows down by 5
    .linear(1.04, -5)
    .jpeg({ quality: 94, progressive: true, mozjpeg: true })
    .toFile(tmp);

  const fs = require("fs");
  fs.renameSync(tmp, src);

  const out = await sharp(src).metadata();
  console.log(`Output: ${out.width}x${out.height}, ${fs.statSync(src).size} bytes`);
  console.log("Done.");
}

enhance().catch(console.error);
