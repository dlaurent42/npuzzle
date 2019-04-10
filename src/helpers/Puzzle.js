const {
  cloneDeep,
  find,
  findIndex,
  isEmpty,
} = require('lodash');
const moment = require('moment');

const PriorityQueue = require('./PriorityQueue');
const {
  MANHATTAN,
  LINEARCONFLICT,
  EUCLIDEAN,
  MIXED,
  UNIFORMCOST,
} = require('../config/constants');

// This class handles all data and methods relative to the puzzle
class Puzzle {

  constructor() {
    // Variables relative to initialisation
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
      line.replace(/  +/g, ' ').trim().split('#')[0].trim().split(' ').forEach((block) => {
        const value = parseInt(block, 10);

        // Check if block contains only digits
        if (!/^\d+$/.test(block)) this.errors.push(`Line ${lineNumber}: [${block}] is not numeric.`);

        // Check if block is puzzle size but with a value lesser than 3
        else if (!this.size && value < 3) this.errors.push(`Line ${lineNumber}: puzzle size ${value} is lesser than 3.`);

        // Check if there is another numeric block after puzzle size
        else if (this.size && isPuzzleSize) this.errors.push(`Line ${lineNumber}: an argument has been provided after puzzle size (${block}).`);

        // Check dimensions of puzzle regarding puzzle size
        else if (this.size && (y > this.size || x >= this.size)) this.errors.push(`Line ${lineNumber}: an argument is outside the grid.`);

        // Check values regarding puzzle size
        else if (this.size && value >= this.size ** 2) this.errors.push(`Line ${lineNumber}: ${value} is greater or equal to ${this.size ** 2}.`);

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

    // Check number of tiles
    if (!isEmpty(this.errors) && this.puzzle.length !== this.size ** 2) this.errors.push(`Wrong number of tiles (${this.puzzle.length}).`);
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
        this.snail.push({ x, y, value: (counter + 1 < this.size ** 2) ? counter + 1 : 0 });
        counter += 1;
        col += 1;
      }

      // fill n-1 lines
      let line = 0;
      while (line < n - 1) {
        y += direction;
        this.snail.push({ x, y, value: (counter + 1 < this.size ** 2) ? counter + 1 : 0 });
        counter += 1;
        line += 1;
      }

      // change direction
      direction *= -1;

      // decrement n
      n -= 1;
    }
  }

  getMixedLevel(puzzle) {
    // Number of permutations
    let numberOfPermutations = 0;

    // Loop through all values
    let valueA = 1;
    while (valueA < (this.size ** 2) - 1) {
      let valueB = valueA + 1;
      while (valueB < this.size ** 2) {
        const objA = find(puzzle, { value: valueA });
        const objB = find(puzzle, { value: valueB });
        const retA = find(this.snail, { x: objA.x, y: objA.y });
        const retB = find(this.snail, { x: objB.x, y: objB.y });
        numberOfPermutations += (retB.value && (!retA.value || retA.value > retB.value));
        valueB += 1;
      }
      valueA += 1;
    }
    return numberOfPermutations;
  }

  isPuzzleSolvable() {
    // Number of permutations
    const numberOfPermutations = this.getMixedLevel(this.puzzle);

    // If N is odd, there is enough data to know if puzzle is solvable
    if (this.size % 2 === 1) this.solvable = numberOfPermutations % 2 === 0;

    // If N is even, position of 0 from bottom is needed
    else {
      const row = find(this.puzzle, { value: 0 });
      const snailRow = find(this.snail, { value: 0 });
      const numberOfRows = Math.abs(snailRow.y - row.y) + 1;
      console.log(`Number of permutations: ${numberOfPermutations}`);
      console.log(`Number of rows (from bottom): ${this.size - row.y}`);
      console.log(`Number of rows (diff)       : ${numberOfRows}`);
      this.solvable = (numberOfRows % 2 === 0 && numberOfPermutations % 2 === 1)
                   || (numberOfRows % 2 === 1 && numberOfPermutations % 2 === 0);
      if (this.solvable && this.size % 2 === 0) console.log('Normally solvable');
      if (this.size % 2 === 0) this.solvable = false;
    }
  }

  // nb = count_inversions(puzzle.tab, size)
  // if size & 1:
  //     if nb & 1 == 0:
  //         return True
  // else:
  //     final_puzzle = create_final(size)
  //     if nb & 1 and (size - puzzle.y) & 1 == 0:
  //         return False if final_puzzle.y & 1 else True
  //     elif nb & 1 == 0 and (size - puzzle.y) & 1:
  //         return False if final_puzzle.y & 1 else True
  //     else:
  //         return True if final_puzzle.y & 1 else False
  // return False

  printErrors() {
    if (this.errors.length === 0) console.log('No error occured during parsing.');
    else this.errors.forEach((err, idx) => { console.log(`[Parsing error ${idx + 1}]: ${err}`); });
  }

  printPuzzlePaddedValue(value) {
    let str = value.toString();
    const aimedSize = ((this.size ** 2) - 1).toString().length;
    while (str.length < aimedSize) {
      str = ` ${str}`;
    }
    return str;
  }

  printPuzzle(puzzle) {
    let y = 0;
    while (y < this.size) {
      let x = 0;
      while (x < this.size) {
        const obj = find(puzzle, { x, y });
        process.stdout.write(`${this.printPuzzlePaddedValue(obj.value)}`);
        x += 1;
        if (x < this.size) process.stdout.write(' ');
      }
      console.log('');
      y += 1;
    }
  }
}

class PuzzleSolver extends Puzzle {

  constructor(heuristic, greedySearch) {
    super();

    // Parameters
    this.heuristic = heuristic || MANHATTAN;
    this.greedySearch = greedySearch || false;

    // Indicators
    this.numberOfSwaps = 0;
    this.complexityInSize = 1;
    this.complexityInTime = 1;
    this.duration = 0;

    // Sets used to solve puzzle
    this.finalSet = [];
    this.closedSet = [];
    this.OpenSet = new PriorityQueue();
  }

  // Function to reset solver (used to starts a new resolution)
  reset(heuristic, greedySearch) {
    // Parameters
    this.heuristic = heuristic || MANHATTAN;
    this.greedySearch = greedySearch || false;

    // Indicators
    this.numberOfSwaps = 0;
    this.complexityInSize = 1;
    this.complexityInTime = 1;

    // Sets used to solve puzzle
    this.finalSet = [];
    this.closedSet = [];
    this.OpenSet = new PriorityQueue();
  }

  // Function to convert a puzzle structure into a string used as index
  puzzleToIndex(puzzle) {
    let y = 0;
    let str = '';

    // Loop through columns of puzzle
    while (y < this.size) {
      let x = 0;

      // Loop through rows of puzzle
      while (x < this.size) {
        const obj = find(puzzle, { x, y });
        str += `${obj.value}`;
        x += 1;
      }
      y += 1;
    }
    return str;
  }

  // Function used to build steps to be displayed
  getFinalSet() {
    this.finalSet.push(this.closedSet[this.closedSet.length - 1]);
    while (this.finalSet[0].parent) {
      this.finalSet.splice(0, 0, find(this.closedSet, { index: this.finalSet[0].parent }));
    }
  }

  // Function used only for LinearConflict heuristic
  getConflicts(puzzle) {
    let conflicts = 0;
    let i = 1;

    // Lets look to all combinations of digits
    while (i < (this.size ** 2) - 1) {
      let j = i + 1;
      while (j < this.size ** 2) {
        const objI = find(puzzle, { value: i });
        const objJ = find(puzzle, { value: j });
        const snailObjI = find(this.snail, { value: i });
        const snailObjJ = find(this.snail, { value: j });

        // For a better understanding and maintainability, if structure has been decomposed

        // If both tiles are currently on the same line and so do their final location
        if (objI.x === objJ.x && snailObjI.x === snailObjJ.x) {

          // If tiles are reversed regarding their final location then there is a conflict
          if ((objI.y > objJ.y && snailObjI.y < snailObjJ.y)
          || (objI.y < objJ.y && snailObjI.y > snailObjJ.y)) conflicts += 1;

        }

        // Same regarding columns (but inline)
        if (objI.y === objJ.y && snailObjI.y === snailObjJ.y
        && ((objI.x > objJ.x && snailObjI.x < snailObjJ.x)
        || (objI.x < objJ.x && snailObjI.x > snailObjJ.x))) conflicts += 1;

        j += 1;
      }
      i += 1;
    }
    return conflicts;
  }

  // Function used to get distance following heuristic
  getDistance(puzzle) {
    let distance = 0;
    puzzle.forEach((el) => {
      const snail = find(this.snail, { value: el.value });
      const dx = Math.abs(snail.x - el.x);
      const dy = Math.abs(snail.y - el.y);
      distance += (this.heuristic === EUCLIDEAN)
        ? (dx + dy + (Math.sqrt(2) - 2) * Math.min(dx, dy))
        : dx + dy;
    });
    if (distance === 0) return distance;
    if (this.heuristic === UNIFORMCOST && distance) return 1;
    if (this.heuristic === LINEARCONFLICT) return distance + this.getConflicts(puzzle);
    if (this.heuristic === MIXED) return distance + this.getMixedLevel(puzzle);
    return distance;
  }

  // Function used to swap two tiles
  swapTiles(element, move) {

    // Get map index following move and coordinates
    const puzzle = cloneDeep(element.puzzle);
    const zeroIdx = findIndex(puzzle, { value: 0 });
    let swappedIdx = -1;

    if (move === 'down') swappedIdx = findIndex(puzzle, { x: puzzle[zeroIdx].x, y: puzzle[zeroIdx].y + 1 });
    else if (move === 'up') swappedIdx = findIndex(puzzle, { x: puzzle[zeroIdx].x, y: puzzle[zeroIdx].y - 1 });
    else if (move === 'left') swappedIdx = findIndex(puzzle, { x: puzzle[zeroIdx].x - 1, y: puzzle[zeroIdx].y });
    else if (move === 'right') swappedIdx = findIndex(puzzle, { x: puzzle[zeroIdx].x + 1, y: puzzle[zeroIdx].y });

    // Swap values
    if (move === 'left' || move === 'right') [puzzle[zeroIdx].x, puzzle[swappedIdx].x] = [puzzle[swappedIdx].x, puzzle[zeroIdx].x];
    else [puzzle[zeroIdx].y, puzzle[swappedIdx].y] = [puzzle[swappedIdx].y, puzzle[zeroIdx].y];

    // Get distance
    const distance = this.getDistance(puzzle);

    // Get index from puzzle
    const index = this.puzzleToIndex(puzzle);

    // Check in closeSet if a solution drives us to this puzzle with a lower cost
    if (!this.greedySearch) {
      const inClosedSet = find(this.closedSet, { index });
      if (inClosedSet && inClosedSet.cost <= element.cost + 1 && inClosedSet.move === move) return;
    }

    // Enqueue element
    this.OpenSet.enqueue({
      parent: element.index,
      index,
      move,
      puzzle,
      cost: element.cost + 1,
      distance,
    }, distance + element.cost + 1);
  }

  // Main solving function
  solve() {
    // Variable used to assess execution duration
    const timestamp = moment();

    // Initialize solver
    this.OpenSet.enqueue({
      parent: null,
      index: this.puzzleToIndex(this.puzzle),
      move: null,
      puzzle: cloneDeep(this.puzzle),
      cost: 0,
      distance: this.getDistance(this.puzzle),
    }, 0);

    // Define a variable to determine wheter to continue or not
    let solutionFound = false;

    // Main loop
    while (!solutionFound) {

      // Assess complexity in size
      this.complexityInSize = Math.max(this.complexityInSize, this.OpenSet.items.length);

      // Pop first element from openSet
      const { element } = this.OpenSet.dequeue();

      // Move element to closeSet
      this.closedSet.push(element);

      // Stop condition
      if (element.distance === 0) {
        solutionFound = true;
        this.numberOfSwaps = element.cost;
        this.complexityInTime = this.closedSet.length;
        this.duration = Math.abs(timestamp.diff(moment()));
        this.getFinalSet();
        return;
      }

      // Find data relative to element 0
      const zero = find(element.puzzle, { value: 0 });

      // Handle moves
      if (element.move !== 'up' && zero.y + 1 < this.size) this.swapTiles(element, 'down');
      if (element.move !== 'down' && zero.y) this.swapTiles(element, 'up');
      if (element.move !== 'left' && zero.x + 1 < this.size) this.swapTiles(element, 'right');
      if (element.move !== 'right' && zero.x) this.swapTiles(element, 'left');
    }
  }
}

module.exports = PuzzleSolver;
