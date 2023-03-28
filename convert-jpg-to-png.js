const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

async function convertJPGtoPNG(sourcePath, destinationPath) {
  try {
    const img = await loadImage(sourcePath);
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const pngBuffer = canvas.toBuffer('image/png');
    fs.writeFileSync(destinationPath, pngBuffer);

    console.log(`Converted ${sourcePath} to ${destinationPath}.`);
  } catch (error) {
    console.error(error);
  }
}

const [sourcePath, destinationPath] = process.argv.slice(2);
convertJPGtoPNG(sourcePath, destinationPath);
