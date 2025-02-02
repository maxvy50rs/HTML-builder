const { mkdir, readdir, copyFile, rm } = require('fs/promises');
const path = require('path');

module.exports.copyDir = async function copyDir(dir, dirCopy) {
  await rm(dirCopy, { recursive: true, force: true });
  await mkdir(dirCopy, { recursive: true }, (err) => {
    if (err) throw err;
  });

  const content = await readdir(dir, { withFileTypes: true });
  content.forEach(async item => {
    const src = path.join(dir, item.name);
    const dest = path.join(dirCopy, item.name);
    if (item.isDirectory()) {
      copyDir(path.join(dir, item.name), path.join(dirCopy, item.name));
      return;
    }
    await copyFile(src, dest);
  });
};