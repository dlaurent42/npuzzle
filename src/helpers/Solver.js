const {
  findIndex,
  find,
  cloneDeep,
} = require('lodash');
const moment = require('moment');

const PriorityQueue = require('./PriorityQueue');
const Puzzle = require('./Puzzle');

const MANHATTAN = 'Manhattan';
const EUCLIDEAN = 'Euclidean';
const LINEARCONFLICT = 'LinearConflict';

class Solver extends Puzzle {

  constructor(heuristic, greedySearch, uniformCost) {
    super();

    // Parameters
    this.heuristic = heuristic || MANHATTAN;
    this.greedySearch = greedySearch || false;
    this.uniformCost = uniformCost || false;

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
  reset(heuristic, greedySearch, uniformCost) {
    // Parameters
    this.heuristic = heuristic || MANHATTAN;
    this.greedySearch = greedySearch || false;
    this.uniformCost = uniformCost || false;

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
      if (this.heuristic === LINEARCONFLICT || this.heuristic === MANHATTAN) distance += dx + dy;
      else if (this.heuristic === EUCLIDEAN) {
        distance += (dx + dy + (Math.sqrt(2) - 2) * Math.min(dx, dy));
      }
    });
    if (distance === 0) return distance;
    if (distance && this.uniformCost) return 1;
    if (this.heuristic !== LINEARCONFLICT) return distance;
    return distance + this.getConflicts(puzzle);
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

module.exports = Solver;
