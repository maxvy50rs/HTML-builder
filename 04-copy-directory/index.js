const { mkdir, readdir, copyFile, rm } = require('fs/promises');
const path = require('path');

async function copyDir(dir) {
  const dirCopy = `${dir}-copy`;
  await rm(dirCopy, { recursive:true, force:true });
  await mkdir(dirCopy, { recursive: true }, (err) => {
    if (err) throw err;
  });

  const content = await readdir(dir, { withFileTypes: true });
  content.forEach(async item => {
    const src = path.join(dir, item.name);
    const dest = path.join(dirCopy, item.name);
    if (item.isDirectory()) copyDir(item.name);
    await copyFile(src, dest);
  });
}

const dir = path.join(__dirname, 'files');
copyDir(dir);