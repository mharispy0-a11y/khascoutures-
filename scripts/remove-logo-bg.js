const sharp = require("sharp");
const path = require("path");

const inputPath = path.join(__dirname, "../public/logo2.jpg");
const outputPath = path.join(__dirname, "../public/logo.png");

async function removeBg() {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const buf = Buffer.from(data);

  for (let i = 0; i < width * height; i++) {
    const off = i * channels;
    const r = buf[off], g = buf[off + 1], b = buf[off + 2];
    if (r > 200 && g > 190 && b > 170) {
      buf[off + 3] = 0;
    }
  }

  await sharp(buf, { raw: { width, height, channels } }).png().toFile(outputPath);
  console.log("logo.png written to public/");
}

removeBg().catch(console.error);
