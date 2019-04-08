const { isEmpty, findIndex, find } = require('lodash');

// This class handles all data and methods relative to the puzzle
class Puzzle {

  constructor() {
    this.size = undefined;
    this.errors = [];
    this.snail = [];
    this.puzzle = [];
    this.solvable = false;
  }

  getPuzzle(fileContent) {

    // verify if file content is empty
    if (isEmpty(fileContent)) {
      this.errors.push('File is empty.');
      return;
    }

    // parse file content
    let lineNumber = 1;
    let y = 0;

    // Loop through lines
    fileContent.trim().split('\n').forEach((line) => {
      let x = 0;

      // Skip comments
      if (line.trim().startsWith('#')) return;

      // Split line into blocks
      let isPuzzleSize = false;
      line.split('#')[0].trim().split(' ').forEach((block) => {
        const value = parseInt(block, 10);

        // Check if block contains only digits
        if (!/^\d+$/.test(block)) this.errors.push(`Line ${lineNumber}: ${block} is not numeric.`);

        // Check if block is puzzle size but with a value lesser than 3
        else if (!this.size && value < 3) this.errors.push(`Line ${lineNumber}: puzzle size ${value} is lesser than 3.`);

        // Check if there is another numeric block after puzzle size
        else if (this.size && isPuzzleSize) this.errors.push(`Line ${lineNumber}: an argument has been provided after puzzle size (${block}).`);

        // Check dimensions of puzzle regarding puzzle size
        else if (this.size && (y > this.size || x >= this.size)) this.errors.push(`Line ${lineNumber}: an argument is outside the grid.`);

        // Check values regarding puzzle size
        else if (this.size && value >= this.size * this.size) this.errors.push(`Line ${lineNumber}: ${value} is greater or equal to ${this.size * this.size}.`);

        // Check if value is already in puzzle structure
        else if (this.size && findIndex(this.puzzle, { value }) > -1) this.errors.push(`Line ${lineNumber}: ${value} is a dupplicate.`);

        // Get puzzle size
        else if (!this.size) {
          this.size = value;
          isPuzzleSize = true;

        // Push taquin to structure
        } else this.puzzle.push({ x, y: y - 1, value });

        // Increment x
        x += 1;
      });

      // Increment y
      y += 1;
      lineNumber += 1;
    });

    // Check number of taquins
    if (!isEmpty(this.errors) && this.puzzle.length !== this.size * this.size) this.errors.push(`Wrong number of taquins (${this.puzzle.length} vs ${this.size * this.size}).`);
  }

  getSnailPuzzle() {
    // Check size
    if (!this.size || this.size < 3) return;

    // Declare used variables
    let n = this.size;
    let direction = 1; // direction: right, bottom = 1; left, top = -1
    let counter = 0; // counter value
    let y = 0;
    let x = -1;

    // for n in [n ... 0]
    while (n) {

      // fill n columns
      let col = 0;
      while (col < n) {
        x += direction;
        this.snail.push({ x, y, value: (counter + 1 < this.size * this.size) ? counter + 1 : 0 });
        counter += 1;
        col += 1;
      }

      // fill n-1 lines
      let line = 0;
      while (line < n - 1) {
        y += direction;
        this.snail.push({ x, y, value: (counter + 1 < this.size * this.size) ? counter + 1 : 0 });
        counter += 1;
        line += 1;
      }

      // change direction
      direction *= -1;

      // decrement n
      n -= 1;
    }
  }

  isPuzzleSolvable() {
    // Number of permutations
    let numberOfPermutations = 0;

    // Loop through all values
    let valueA = 1;
    while (valueA < this.size * this.size - 1) {
      let valueB = valueA + 1;
      while (valueB < this.size * this.size) {
        const objA = find(this.puzzle, { value: valueA });
        const objB = find(this.puzzle, { value: valueB });
        const retA = find(this.snail, { x: objA.x, y: objA.y });
        const retB = find(this.snail, { x: objB.x, y: objB.y });
        numberOfPermutations += (retB.value && (!retA.value || retA.value > retB.value));
        valueB += 1;
      }
      valueA += 1;
    }

    // If N is odd, there is enough data to know if puzzle is solvable
    if (this.size % 2 === 1) this.solvable = numberOfPermutations % 2 === 0;

    // If N is even, position of 0 from bottom is needed
    else {
      const row = find(this.puzzle, { value: 0 });
      const numberOfRows = this.size - row.y;
      this.solvable = (numberOfRows % 2 === 0 && numberOfPermutations % 2 === 1)
                   || (numberOfRows % 2 === 1 && numberOfPermutations % 2 === 0);
    }
  }

  printSize() {
    console.log(`Size of puzzle: ${this.size}`);
  }

  printErrors() {
    if (this.errors.length === 0) console.log('No error occured during parsing.');
    else this.errors.forEach((err, idx) => { console.log(`[ERROR ${idx + 1}]: ${err}`); });
  }

  printSnail() {
    console.log('Snail solution is :');
    console.log(this.snail);
  }

  printPuzzle() {
    console.log('Puzzle is :');
    console.log(this.puzzle);
  }

  printSolvable() {
    if (this.solvable) console.log('Puzzle is solvable.');
    else console.log('Puzzle is not solvable.');
  }
}

module.exports = Puzzle;
