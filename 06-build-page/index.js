const fs = require('fs');
const path = require('path');

//HTML

const streamTemplate = fs.createReadStream(path.resolve(__dirname, 'template.html'), 'utf-8');
let templ = '';
streamTemplate.on('data', chunk => templ += chunk);
streamTemplate.on('end', () => {});
streamTemplate.on('error', error => console.log('Error', error.message));

const streamHeader = fs.createReadStream(path.resolve(__dirname, 'components', 'header.html'), 'utf-8');
let header = '';
streamHeader.on('data', chunk => header += chunk);
streamHeader.on('end', () => {});
streamHeader.on('error', error => console.log('Error', error.message));

const streamArticles = fs.createReadStream(path.resolve(__dirname, 'components', 'articles.html'), 'utf-8');
let articles = '';
streamArticles.on('data', chunk => articles += chunk);
streamArticles.on('end', () => {});
streamArticles.on('error', error => console.log('Error', error.message));

const streamFooter = fs.createReadStream(path.resolve(__dirname, 'components', 'footer.html'), 'utf-8');
let footer = '';
streamFooter.on('data', chunk => footer += chunk);
streamFooter.on('end', () => {});
streamFooter.on('error', error => console.log('Error', error.message));

const streamAbout = fs.createReadStream(path.resolve(__dirname, 'components', 'about.html'), 'utf-8');
let about = '';
streamAbout.on('data', chunk => about += chunk);
streamAbout.on('end', () => {});
streamAbout.on('error', error => {});

fs.mkdir(path.resolve(__dirname, 'project-dist'), { recursive: true }, (err) => {
    if (err) throw err;
});

fs.writeFile(path.resolve(__dirname, 'project-dist', 'index.html'), '', (err) => {
        if (err) throw err;
        let html = templ.replace('{{header}}', header).replace('{{articles}}', articles).replace('{{footer}}', footer);
        
        streamIndex = fs.createReadStream(path.resolve(__dirname, 'project-dist', 'index.html'), 'utf-8');
        let templ2 = html;
        streamIndex.on('data', chunk => templ2 += chunk);
        streamIndex.on('end', () => {});
        streamIndex.on('error', error => console.log('Error', error.message));

        html = templ2.replace('{{about}}', about);
        
        fs.appendFile(path.resolve(__dirname, 'project-dist', 'index.html'), html, err => {
            if (err) throw err;
        });
});


// CSS

const pathStyleSource = path.resolve(__dirname, 'styles');
let fileRes;
let arrCssContent = [];

fs.writeFile(path.resolve(__dirname, 'project-dist', 'style.css'), '', (err) => {
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

                fs.appendFile(path.resolve(__dirname, 'project-dist', 'style.css'), data, err => {
                    if (err) throw err;
                });
            });
        } 
      });
    };
});


// Assets

fs.mkdir(path.resolve(__dirname, 'assets'), { recursive: true }, (err) => {
    if (err) throw err;
});

const pathCopyFromDirFonts = path.resolve(__dirname, 'assets', 'fonts');
const pathCopyToDirFonts = path.resolve(__dirname, 'project-dist', 'assets', 'fonts');
let filePathF, dirPathF;
let arrFilesF = [];
let arrFileNamesF = [];

fs.mkdir(path.resolve(__dirname, 'project-dist', 'assets', 'fonts'), { recursive: true }, (err) => {
    if (err) throw err;

    fs.readdir(pathCopyToDirFonts, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    else {
        files.forEach(file => {
        let fileToDelete = path.resolve(__dirname, 'project-dist/assets/fonts', file.name).toString();
        fs.unlink(fileToDelete, (err) => {
            if (err) throw err;
        })
        });
    };
    })

    fs.readdir(pathCopyFromDirFonts, { withFileTypes: true }, (err, files) => {
        if (err) throw err;
        else {
        files.forEach(file => {
            if (file.isFile()) {
                filePathF = path.resolve(__dirname, 'assets', 'fonts', file.name).toString();
                arrFilesF.push(filePathF);
                arrFileNamesF.push(file.name);
            } else {
                dirPathF = path.resolve(__dirname, 'assets', 'fonts', file.name).toString();
            }
        });
        };
        for (let i = 0; i < arrFilesF.length; i++) {
        destination = path.resolve(pathCopyToDirFonts, arrFileNamesF[i]).toString();
        fs.copyFile(arrFilesF[i], destination, (err) => {
            if (err) throw err;
        });
        }
    })

});

const pathCopyFromDirImg = path.resolve(__dirname, 'assets', 'img');
const pathCopyToDirImg = path.resolve(__dirname, 'project-dist', 'assets', 'img');
let filePathI, dirPathI;
let arrFilesI = [];
let arrFileNamesI = [];

fs.mkdir(path.resolve(__dirname, 'project-dist', 'assets', 'img'), { recursive: true }, (err) => {
    if (err) throw err;

    fs.readdir(pathCopyToDirImg, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    else {
        files.forEach(file => {
        let fileToDelete = path.resolve(__dirname, 'project-dist/assets/img', file.name).toString();
        fs.unlink(fileToDelete, (err) => {
            if (err) throw err;
        })
        });
    };
    })

    fs.readdir(pathCopyFromDirImg, { withFileTypes: true }, (err, files) => {
        if (err) throw err;
        else {
        files.forEach(file => {
            if (file.isFile()) {
                filePathI = path.resolve(__dirname, 'assets', 'img', file.name).toString();
                arrFilesI.push(filePathI);
                arrFileNamesI.push(file.name);
                
            } else {
                dirPathI = path.resolve(__dirname, 'assets', 'img', file.name).toString();
            }
        });
        };
        for (let i = 0; i < arrFilesI.length; i++) {
        destination = path.resolve(pathCopyToDirImg, arrFileNamesI[i]).toString();
        fs.copyFile(arrFilesI[i], destination, (err) => {
            if (err) throw err;
        });
        }
    })

});


const pathCopyFromDirSvg = path.resolve(__dirname, 'assets', 'svg');
const pathCopyToDirSvg = path.resolve(__dirname, 'project-dist', 'assets', 'svg');
let filePathS, dirPathS;
let arrFilesS = [];
let arrFileNamesS = [];

fs.mkdir(path.resolve(__dirname, 'project-dist', 'assets', 'svg'), { recursive: true }, (err) => {
    if (err) throw err;

    fs.readdir(pathCopyToDirSvg, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    else {
        files.forEach(file => {
        let fileToDelete = path.resolve(__dirname, 'project-dist/assets/svg', file.name).toString();
        fs.unlink(fileToDelete, (err) => {
            if (err) throw err;
        })
        });
    };
    })

    fs.readdir(pathCopyFromDirSvg, { withFileTypes: true }, (err, files) => {
        if (err) throw err;
        else {
        files.forEach(file => {
            if (file.isFile()) {
                filePathS = path.resolve(__dirname, 'assets', 'svg', file.name).toString();
                arrFilesS.push(filePathS);
                arrFileNamesS.push(file.name);
                
            } else {
                dirPathS = path.resolve(__dirname, 'assets', 'svg', file.name).toString();
            }
        });
        };
        for (let i = 0; i < arrFilesS.length; i++) {
        destination = path.resolve(pathCopyToDirSvg, arrFileNamesS[i]).toString();
        fs.copyFile(arrFilesS[i], destination, (err) => {
            if (err) throw err;
        });
        }
    })

});