class GameBoard {
  constructor(options) {
    this.M = options.M;
    this.N = options.N;
    this.rl = options.readLine;

    // this.board = this.setInitialPositions(this.M, this.N, options.arr);
    this.board = options.arr;

    console.table(this.board);
    this.stepGame(this.board);
  }
  
  stepGame(board) {
    const boardNext = board.slice();
    const arrNeighbours = board.slice();

    for (let i = 0; i < board.length; i++) { // ось Y
      const itemY = board[i] // массив по оси Y
      for (let j = 0; j < itemY.length; j++) {
        const itemX = itemY[j];
        const neighbours = this.calcNeighbours(board, i, j, 0, 1);
        // arrNeighbours[i][j] = neighbours;
      }
    }
    
    console.table(arrNeighbours);
  }

  calcNeighbours(board, i, j, dead, live) {
    // функция будет возвращать количество соседей у клетки, а также, где они находятся

    const findElem = (board, i, j, dead, live) => {
      const returnObj = {
        dead: false,
        live: false,
        undefined: false
      };

      // написать проверку, если i и j выходят за пределы массива

      console.log(board[i][j]);
      if (board[i][j] === dead) {
        returnObj.dead = true
      } else if (board[i][j] === live) {
        returnObj.live = true
      } else {
        returnObj.undefined = true;
      }

      return returnObj;
    };

    const objInfo = {
      positions: {
        center: findElem(board, i, j, dead, live),
        top: findElem(board, i + 1, j, dead, live),
        rightTop: findElem(board, i + 1, j + 1, dead, live),
        right: findElem(board, i, j + 1, dead, live),
        rightBottom: findElem(board, i - 1, j + 1, dead, live),
        bottom: findElem(board, i - 1, j, dead, live),
        leftBottom: findElem(board, i - 1, j - 1, dead, live),
        left: findElem(board, i, j - 1, dead, live),
        leftTop: findElem(board, i + 1, j - 1, dead, live)
      },
      counter: {
        dead: 0,
        live: 0
      },
      schedule: {
        dead: null,
        live: null
      }
    };

    for (const positionProp of objInfo.positions) { // посчитать количество мертвых/живых клеток вокруг
      if (positionProp.dead === true) {
        objInfo.counter.dead++;
      } else if (positionProp.live === true) {
        objInfo.counter.live++;
      }
    }

    let currentCell;
    if (board[i][j] === live) {
      currentCell = 'live';
    } else if (board[i][j] === dead) {
      currentCell = 'dead';
    }

    if (currentCell === 'live') {

      if (objInfo.counter.live < 2) {
        objInfo.schedule.dead = true;
      } else if (objInfo.counter.live === 2 || objInfo.counter.live === 3) {
        objInfo.schedule.live = true;
      } else if (objInfo.counter.live > 3) {
        objInfo.schedule.dead = true;
      }

    } else if (currentCell === 'dead') {

      if (objInfo.counter.live === 3) {
        objInfo.schedule.live = true;
      }

    }
  }

  setInitialPositions(M, N, arr) {
    if (arr !== undefined) { // если arr передали
      return arr;
    }

    return this.setRandomPositions(M, N);
  }

  setRandomPositions(M, N) {
    const board = [];
    const arrSymbols = [0, 1];

    for (let i = 0; i < N; i++) {
      board[i] = [];
      for (let j = 0; j < M; j++) {
        const randomInteger = generateRandomInteger(0, arrSymbols.length - 1);
        board[i][j] = arrSymbols[randomInteger];
      }
    }

    return board;

  }
}

function generateRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = GameBoard;