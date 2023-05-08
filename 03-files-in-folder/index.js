const { readdir, stat } = require('fs/promises');
const path = require('path');


const folder = path.join(__dirname, 'secret-folder');

async function main() {
  const content = await readdir(folder, { withFileTypes: true });

  content.forEach(async item => {
    if (!item.isFile()) return;
    const pathToFile = path.join(folder, item.name);
    const fileStats = await stat(pathToFile);
    const fileInfo = {
      name: item.name.split('.').slice(0, -1).join('.'),
      ext: path.extname(item.name).slice(1),
      size: fileStats.size,
      toString() { return `${this.name} - ${this.ext} - ${this.size / 1024}kb`; },
    };
    console.log(fileInfo.toString());
  });
}

main();


