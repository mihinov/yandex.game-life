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

  questionFileOrRandom(rl) {

    return this.question('Выбери какой вариант(1 или 2): ', rl).then(num => {
      if (+num === 1) { // то укажите путь к файлу
        return this.question('Укажите путь к файлу: ', rl).then(path => {
          return {path: path};
        });
      } else if (+num === 2) { // Автоматическая генерация
        return this.questionSizeBoard(rl);
      }
    });
  }

  consoleSelection(rl) {
    console.log('Привет, привет!');
    console.log('Сейчас ты можешь посмотреть на игру жизнь!');
    console.log('От тебя нужно выбрать одно:');
    console.log('1. Позиции элементов ты задашь в текстовом файле и напишешь ссылку на файл');
    console.log('2. За тебя всё сгенерируется случайно! :) Нужно только задать размер доски');

    this.questionFileOrRandom(rl).then(res => {
      console.log(res);
      rl.close();
    });
  }
}

module.exports = GameInit;