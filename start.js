import inquirer from 'inquirer';
import { execSync } from 'child_process';

const microservices = [
  {
    name: 'Merge PDFs',
    command: 'node merge-pdf.js',
    inputs: [
      { type: 'input', name: 'source', message: 'Source folder path:' },
      { type: 'input', name: 'destination', message: 'Destination folder path:' },
    ],
  },
  {
    name: 'Convert DOCX to PDF',
    command: 'node convert-docx-to-pdf.js',
    inputs: [
      { type: 'input', name: 'source', message: 'Source file path:' },
      { type: 'input', name: 'destination', message: 'Destination file path:' },
    ],
  },
  {
    name: 'Convert JPG to PNG',
    command: 'node convert-jpg-to-png.js',
    inputs: [
      { type: 'input', name: 'source', message: 'Source file path:' },
      { type: 'input', name: 'destination', message: 'Destination file path:' },
    ],
  },
  {
    name: 'Remove background from PNG',
    command: 'node remove-background-from-png.js',
    inputs: [
      { type: 'input', name: 'source', message: 'Source file path:' },
      { type: 'input', name: 'destination', message: 'Destination file path:' },
    ],
  },
];

inquirer
  .prompt([
    {
      type: 'list',
      name: 'microservice',
      message: 'Which microservice do you want to run?',
      choices: microservices.map((m) => m.name),
    },
  ])
  .then((answers) => {
    const microservice = microservices.find((m) => m.name === answers.microservice);
    inquirer.prompt(microservice.inputs).then((inputs) => {
      const command = `${microservice.command} ${Object.values(inputs).join(' ')}`;
      execSync(command, { stdio: 'inherit' });
    });
  })
  .catch((error) => {
    console.error(error);
  });
