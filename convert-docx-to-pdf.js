import fs from 'fs';
import docxToPdf from 'docx-pdf';

async function convertDocxToPDF(sourcePath, destinationPath) {
  try {
    const sourceData = fs.readFileSync(sourcePath);
    await docxToPdf(sourceData, destinationPath);

    console.log(`Converted ${sourcePath} to ${destinationPath}.`);
  } catch (error) {
    console.error(error);
  }
}

const [sourcePath, destinationPath] = process.argv.slice(2);
convertDocxToPDF(sourcePath, destinationPath);
