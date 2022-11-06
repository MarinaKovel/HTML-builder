const fs = require('fs');
const path = require('path');

const { stdin, stdout } = process;

const filePath = path.resolve(__dirname, 'text.txt');
const stream = fs.createWriteStream(filePath);

stdout.write('Привет! Почему шоколад не считается овощем, если его производят из какао-бобов?\n');

stdin.on('data', data => {
    const answer = data.toString();
    if (answer.trim() === 'exit') {
        stdout.write('Серьезно?? Спасибо. До свидания.')
        process.exit();
    } else {
        stream.write(answer);
    }
  });
  process.on('SIGINT', () => {
    console.log('Серьезно?? Спасибо. До свидания.');
    process.exit();
  });




