class GameBoard {
  constructor(options) {
    this.M = options.M;
    this.N = options.N;
    this.rl = options.readLine;

    // this.board = this.setInitialPositions(this.M, this.N, options.arr);
    this.board = options.arr;
  }
  
  stepGame(board) {
    const boardNext = board.slice();

    for (let i = 0; i < board.length; i++) { // ось Y
      const itemY = board[i] // массив по оси Y
      for (let j = 0; j < itemY.length; j++) {
        const itemX = itemY[j];
        const quantityNeighbors = calcNeighbors(board, i, j);
      }
    }
  }

  calcNeighbors(board, i, j) {
    // функция будет возвращать количество соседей у клетки, а также, где они находятся
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