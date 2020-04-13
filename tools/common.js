const fs = require('fs');

module.exports = {
    writeFile: (path, data) => fs.writeFileSync(path, data),
    readFile: (path) => fs.readFileSync(path, 'utf8')
};
