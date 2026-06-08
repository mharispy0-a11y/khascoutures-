const { Jimp } = require('jimp');

async function fixLogo() {
  const img = await Jimp.read('public/logo2.jpg');

  img.scan(0, 0, img.bitmap.width, img.bitmap.height, function(x, y, idx) {
    const r = this.bitmap.data[idx + 0];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];

    // Target: cream/white/off-white background (high brightness, low saturation)
    const brightness = (r + g + b) / 3;
    const maxC = Math.max(r, g, b);
    const minC = Math.min(r, g, b);
    const saturation = maxC === 0 ? 0 : (maxC - minC) / maxC;

    // Make light, low-saturation pixels (the background) transparent
    if (brightness > 180 && saturation < 0.25) {
      this.bitmap.data[idx + 3] = 0; // fully transparent
    } else if (brightness > 160 && saturation < 0.15) {
      this.bitmap.data[idx + 3] = 0; // also transparent
    }
  });

  await img.write('public/logo.png');
  console.log('Logo saved as public/logo.png with transparent background');
}

fixLogo();
