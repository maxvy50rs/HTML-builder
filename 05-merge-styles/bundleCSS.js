const { createWriteStream, createReadStream } = require('fs');
const { readdir, rm } = require('fs/promises');
const path = require('path');

async function bundle(srcDir) {
  const dest = path.join(srcDir, '../project-dist', 'bundle.css');
  await rm(dest, { recursive: true, force: true });
  const output = createWriteStream(dest, { flags: 'a' });

  const content = await readdir(srcDir, { withFileTypes: true });
  content.forEach(item => {
    if (!item.isFile() || path.extname(item.name) !== '.css') return;
    const pathToSrc = path.join(srcDir, item.name);
    createReadStream(pathToSrc).pipe(output);
  });
}

exports.bundleCSS = bundle;