const fs = require('fs');
const path = require('path');

const pathStyleSource = path.resolve(__dirname, 'styles');
let fileRes;
let arrCssContent = [];

fs.writeFile(path.resolve(__dirname, 'project-dist', 'bundle.css'), '', (err) => {
    if (err) throw err;
    });

fs.readdir(pathStyleSource, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    else {
      files.forEach(file => {
        fileRes = path.extname(file.name);
        if (file.isFile() && fileRes === '.css') {
            filePath = path.resolve(__dirname, 'styles', file.name).toString();

            fs.readFile(filePath, 'utf-8', (err, data) => {
                if (err) throw err;
                arrCssContent.push(data);

                fs.appendFile(path.resolve(__dirname, 'project-dist', 'bundle.css'), data, err => {
                    if (err) throw err;
                });
            });
        } 
      });
    };
});
