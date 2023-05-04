const { createWriteStream } = require('fs');
const path = require('path');
const { createInterface } = require('readline');

const pathToFile = path.join(__dirname, 'text.txt');
const output = createWriteStream(pathToFile);
const readln = createInterface({
  input: process.stdin,
  output: process.stdout,
});
process.on('SIGINT', sayGoodbye);

lineByLine().then(sayGoodbye);

async function lineByLine() {  
  readln.question('Hi! Enter some text, please:\n', (text) => {
    output.write(`${text}\n`);
  });

  for await (const line of readln) {
    if (line === 'exit') return;
    output.write(`${line}\n`);
  }
}

function sayGoodbye() {
  console.log('Cheers!');
  readln.close();
  output.end();
}