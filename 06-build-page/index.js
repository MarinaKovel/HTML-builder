const fs = require('fs');
const path = require('path');

fs.mkdir(path.resolve(__dirname, 'project-dist'), { recursive: true }, (err) => {
    if (err) throw err;
});

//HTML

let fileRes, filePath, tagName, tagContent, html;
let arrTagNames = [];
let arrTagContents = [];

const streamTemplate = fs.createReadStream(path.resolve(__dirname, 'template.html'), 'utf-8');
let templ = '';
streamTemplate.on('data', chunk => templ += chunk);
streamTemplate.on('end', () => console.log(arrTagContents));
streamTemplate.on('error', error => console.log('Error', error.message));

const str = fs.readdir(path.resolve(__dirname, 'components'), { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    else {
      files.forEach(file => {
        fileRes = path.extname(file.name);
        if (file.isFile() && fileRes === '.html') {
            
            filePath = path.resolve(__dirname, 'components', file.name).toString();
            tagName = '{{' + path.basename(filePath, '.html') + '}}';
            arrTagNames.push(tagName);

            fs.readFile(filePath, 'utf-8', (err, data) => {
                if (err) throw err;
                tagContent = data;
                arrTagContents.push(tagContent);
 return arrTagContents;
                
                
                
                
                //    templ = templ.replace(tagName, tagContent);
                
/*
                fs.writeFile(path.resolve(__dirname, 'project-dist', 'index.html'),
                    templ, (err) => {
                        if (err) throw err;
                    });
                */
            });

        } 
      });
      //console.log(arrTagNames);
    };
});


/*

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

fs.mkdir(path.resolve(__dirname, 'project-dist'), { recursive: true }, (err) => {
    if (err) throw err;
});

fs.writeFile(path.resolve(__dirname, 'project-dist', 'index.html'), '', (err) => {
        if (err) throw err;
        let html = templ.replace('{{header}}', header).replace('{{articles}}', articles).replace('{{footer}}', footer);
        fs.appendFile(path.resolve(__dirname, 'project-dist', 'index.html'), html, err => {
            if (err) throw err;
        });
});
*/

// CSS
