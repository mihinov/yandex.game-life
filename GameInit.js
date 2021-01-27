const readline = require('readline');

class GameInit {
  constructor(options) {

    const rl = this.readlineCreateInterface();

    this.consoleSelection(rl);
    // this.fileOrRandom({file: options?.file, rl: rl});
  }

  readlineCreateInterface() {
    return readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  questionSizeBoard(rl) {
    let M, N;
    return this.question('M = ', rl).then(res => {
      M = res;
      return this.question('N = ', rl);
    }).then(res => {
      N = res;
      return {M: +M, N: +N};
    });
  }

  question(theQuestion, rl) {
    return new Promise(resolve => rl.question(theQuestion, answ => resolve(answ)));
  }

  fileOrRandom(options) { // {file, rl}

    if (options.file) { // если есть файл
      console.log('Кинуть ссылку на файл');
    } else { // ран
      const rl = options.rl;
      this.questionSizeBoard(rl).then(res => {
        console.log(res);
        rl.close();
      });
    }
  }

  consoleSelection(rl) {
    console.log('Привет, привет!');
    console.log('Сейчас ты можешь посмотреть на игру жизнь!');
    console.log('От тебя нужно выбрать одно:');
    console.log('1. Позиции элементов ты задашь в текстовом файле и напишешь ссылку на файл');
    console.log('2. За тебя всё сгенерируется случайно! :) Нужно только задать размер доски');

    this.question('Выбери какой вариант(1 или 2): ', rl).then(num => {
      if (+num === 1) { // то укажите путь к файлу

      } else if (+num === 2) {

      }
    });
  }
}

const gameInit = new GameInit();

module.exports = GameInit;