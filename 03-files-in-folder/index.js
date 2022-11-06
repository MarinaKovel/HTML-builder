const fs = require('fs');
const path = require('path');

const secretPath = path.resolve(__dirname, 'secret-folder');

fs.readdir(secretPath, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    else {
      files.forEach(file => {
        if (file.isFile()) {
            let filePath = path.resolve(__dirname, 'secret-folder', file.name).toString();
            let fileResWithPoint = path.extname(file.name);
            let fileRes = path.extname(file.name).substring(1);
            
            fs.stat(filePath, (err, stats) => {
            if (err) throw err;
            console.log(path.basename(filePath, fileResWithPoint) + ' - ' + fileRes + ' - ' + stats.size + 'b');
            });
        };
      });
    };
  })