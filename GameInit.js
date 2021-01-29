const readline = require('readline');
const fs = require('fs');

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
    // M - это по оси X
    // N - это по оси Y
    let M, N;
    return this.question('Минимальный размер игрового поля - 3*3\nM(ось X) = ', rl).then(res => {
      M = res;
      return this.question('N(ось Y) = ', rl);
    }).then(res => {
      N = res;

      if (isNaN(+M) && isNaN(+N)) {
        return {err: true, msg: 'M и N не являются числами'};
      } else if (isNaN(+M)) {
        return {err: true, msg: 'M не является числом'};
      } else if (isNaN(+N)) {
        return {err: true, msg: 'N не является числом'};
      } else if (M < 3) {
        return {err: true, msg: 'Разрешается задавать только 3*3 поле минимум, M меньше 3'};
      } else if (N < 3) {
        return {err: true, msg: 'Разрешается задавать только 3*3 поле минимум, N меньше 3'};
      }
      
      return {data: {M: +M, N: +N}, err: false, msg: 'Ошибок нет'};
    });
  }

  question(theQuestion, rl) {
    return new Promise(resolve => rl.question(theQuestion, answ => resolve(answ)));
  }

  questionFileOrRandom(rl) {

    return this.question('Выбери какой вариант(1 или 2): ', rl).then(num => {
      if (+num === 1) { // то укажите путь к файлу
        return this.question('Количество элементов по оси X(M) должно быть одинаковым\n1 - это живая клетка, 0 - неживая\nМинимальный размер игрового поля - 3*3\nЕсли что, пример файла (positions.txt) есть в папке с проектом\nУкажите путь к файлу: ', rl).then(path => {
          return {path: path};
        });
      } else if (+num === 2) { // Автоматическая генерация
        return this.questionSizeBoard(rl);
      } else {
        return {err: true, msg: 'Вы не выбрали 1 или 2'};
      }
    });
  }

  async consoleSelection(rl) {
    console.log('Привет, привет!');
    console.log('Сейчас ты можешь посмотреть на игру жизнь!');
    console.log('От тебя нужно выбрать одно:');
    console.log('1. Позиции элементов ты задашь в текстовом файле и напишешь ссылку на файл');
    console.log('2. За тебя всё сгенерируется случайно! :) Нужно только задать размер доски');

    const questionFileOrRandomFunctionResponse = res => {
      if (res.err) {
        console.error(res.msg);
        rl.close();
        return res;
      }

      if (res.path) { // если передали файл
        const valid = this.validFile(res.path);
        if (valid.err) { // ошибка с файлом
          console.error(valid.msg);
        } else { // ошибки с файлом нет
          return valid;
        }
      }
      rl.close();
      return res;
    };

    const fileOrRandom = await this.questionFileOrRandom(rl).then(questionFileOrRandomFunctionResponse);
    console.log(fileOrRandom);
  }

  validFile(file) {

    if (!checkFileExistsSync(file)) {
      return {err: true, msg: 'Файл невозможно прочитать'};
    }

    const fileContent = fs.readFileSync(file, 'utf8');
    const fileContentArr = fileContent.toString().split('\r\n');

    let M; // это по оси X
    let N = fileContentArr.length; // это по оси Y

    for (const elem of fileContentArr) {
      const elemsLine = elem.split(' ').map(item => !isNaN(+item) ? +item : item);

      if (!M) { // если переменная пустая
        M = elemsLine.length;
      } else if (M !== elemsLine.length) {
        return {err: true, msg: 'по оси X(M) не одинаковое количество элементов в вашем файле'}
      }

      for (const elemLine of elemsLine) {
        if (elemLine !== 0 && elemLine !== 1) {
          return {err: true, msg: 'Какой-то элемент не является 1 или 0'};
        }
      }
    }

    const returnArr = fileContentArr.map(item => item.split(' '));

    return {err: false, msg: 'Ошибок нет', data: {M, N, arr: returnArr}};
  }
}

function checkFileExistsSync(filepath){
  let flag = true;
  try{
    fs.accessSync(filepath, fs.constants.F_OK);
  } catch(e) {
    flag = false;
  }
  return flag;
}

module.exports = GameInit;