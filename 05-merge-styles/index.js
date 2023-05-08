const { createWriteStream, createReadStream } = require('fs');
const { readdir, rm } = require('fs/promises');
const path = require('path');

const srcDir = path.join(__dirname, 'styles');
bundle(srcDir);

async function bundle(srcDir) {
  const dest = path.join(__dirname, 'project-dist', 'bundle.css');
  await rm(dest, { recursive: true, force: true });
  const output = createWriteStream(dest, { flags: 'a' });

  const content = await readdir(srcDir, { withFileTypes: true });
  content.forEach(item => {
    if (!item.isFile() || path.extname(item.name) !== '.css') return;
    const pathToSrc = path.join(srcDir, item.name);
    createReadStream(pathToSrc).pipe(output);
  });
}