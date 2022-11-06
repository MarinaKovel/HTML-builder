const fs = require('fs');
const path = require('path');

const pathCopyFromDir = path.resolve(__dirname, 'files');
const pathCopyToDir = path.resolve(__dirname, 'files-copy');
let filePath, dirPath;
let arrFiles = [];
let arrFileNames = [];

fs.mkdir(pathCopyToDir, { recursive: true }, (err) => {
    if (err) throw err;
});

fs.readdir(pathCopyToDir, { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  else {
    files.forEach(file => {
      let fileToDelete = path.resolve(__dirname, 'files-copy', file.name).toString();
      fs.unlink(fileToDelete, (err) => {
        if (err) throw err;
      })
    });
  };
})

fs.readdir(pathCopyFromDir, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    else {
      files.forEach(file => {
        if (file.isFile()) {
            filePath = path.resolve(__dirname, 'files', file.name).toString();
            arrFiles.push(filePath);
            arrFileNames.push(file.name);
        } else {
            dirPath = path.resolve(__dirname, 'files', file.name).toString();
        }
      });
    };
    for (let i = 0; i < arrFiles.length; i++) {
      destination = path.resolve(pathCopyToDir, arrFileNames[i]).toString();
      fs.copyFile(arrFiles[i], destination, (err) => {
        if (err) throw err;
      });
    }
})