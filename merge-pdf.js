import fs from 'fs';
import { PDFDocument, StandardFonts } from 'pdf-lib';

async function mergePDFs(sourceFolder, destinationPath) {
  try {
    const pdfDoc = await PDFDocument.create();

    const sourceFiles = fs.readdirSync(sourceFolder).filter((file) => file.endsWith('.pdf'));

    for (const sourceFile of sourceFiles) {
      const sourcePath = `${sourceFolder}/${sourceFile}`;
      const sourceBytes = fs.readFileSync(sourcePath);

      const sourcePDF = await PDFDocument.load(sourceBytes);
      const sourcePages = await pdfDoc.copyPages(sourcePDF, sourcePDF.getPageIndices());

      for (const sourcePage of sourcePages) {
        pdfDoc.addPage(sourcePage);
      }
    }

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(destinationPath, pdfBytes);

    console.log(`Merged ${sourceFiles.length} PDF files into ${destinationPath}.`);
  } catch (error) {
    console.error(error);
  }
}

const [sourceFolder, destinationPath] = process.argv.slice(2);
mergePDFs(sourceFolder, destinationPath);
