function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class GameBoard {
  constructor(options) {
    this.M = options.M;
    this.N = options.N;

    this.board = this.setInitialPositions();
    console.log(this.board);
  }

  setRandomPositions(M, N) {
    const board = [];

    for (let i = 0; i < N; i++) {
      board.push([]);
    }

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        board[i][j] = randomInteger(0, 1);
      }
    }

    return board.slice();

  }

  setInitialPositions(file) {
    if (file) {

    } else {
      return this.setRandomPositions(this.M, this.N);
    }
  }
}

const gameBoard = new GameBoard({
  M: 5,
  N: 4
});

module.exports = GameBoard;