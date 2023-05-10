const path = require('path');
const { bundleCSS } = require('./bundleCSS');

const srcDir = path.join(__dirname, 'styles');
bundleCSS(srcDir, 'bundle');