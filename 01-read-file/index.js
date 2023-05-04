const { createReadStream } = require('fs');
const path = require('path');

const pathToFile = path.join(__dirname, 'text.txt');
const input = createReadStream(pathToFile, { encoding: 'utf-8' });

input.on('readable', () => {
  console.log(input.read() ?? '');
});