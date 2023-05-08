const path = require('path');
const { copyDir } = require('./copyDir');

const dir = path.join(__dirname, 'files');
copyDir(dir, `${dir}-copy`);