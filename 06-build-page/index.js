const { open } = require('fs/promises');
const { copyDir } = require('../04-copy-directory/copyDir');
const { bundleCSS } = require('../05-merge-styles/bundleCSS');
const path = require('path');
const { createWriteStream } = require('fs');

build();

async function build() {
  const root = __dirname;
  const distPath = path.join(root, 'project-dist');
  await copyDir(path.join(root, 'assets'), path.join(distPath, 'assets'));
  await bundleCSS(path.join(root, 'styles'), 'style');

  const templateFile = await open(path.join(root, 'template.html'));
  let template = await templateFile.readFile('utf-8');
  const matches = template.matchAll(/\{\{[a-zA-Z]*\}\}/gm);

  for await (let match of matches) {
    const componentFile = await open(path.join(root, 'components', `${match[0].slice(2, -2)}.html`));
    const component = await componentFile.readFile('utf-8');
    template = template.replace(match[0], component);
  }

  const bundleFile = createWriteStream(path.join(root, 'project-dist', 'index.html'));
  bundleFile.write(template);
}





