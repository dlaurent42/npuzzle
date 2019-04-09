const {
  findIndex,
  find,
  cloneDeep,
} = require('lodash');

const PriorityQueue = require('./PriorityQueue');
const Puzzle = require('./Puzzle');

// This class handles all data and methods relative to Euclidean resolution
class Euclidean extends Puzzle {

  constructor() {
    super();

    // Indicators
    this.numberOfSwaps = 0;
    this.complexityInSize = 1;
    this.complexityInTime = 1;

    // Sets used to solve puzzle
    this.finalSet = [];
    this.closedSet = [];
    this.OpenSet = new PriorityQueue();
  }

  puzzleToIndex(puzzle) {
    let y = 0;
    let str = '';
    while (y < this.size) {
      let x = 0;
      while (x < this.size) {
        const obj = find(puzzle, { x, y });
        str += `${obj.value}`;
        x += 1;
      }
      y += 1;
    }
    return str;
  }

  getDistance(puzzle) {
    let distance = 0;
    puzzle.forEach((el) => {
      const snail = find(this.snail, { value: el.value });
      distance += Math.sqrt(((snail.x - el.x) ** 2) + ((snail.y - el.y) ** 2));
    });
    return distance;
  }

  swapPieces(element, move) {

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
    const inClosedSet = find(this.closedSet, { index });
    if (inClosedSet && inClosedSet.cost <= element.cost + 1 && inClosedSet.move === move) return;

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

  getFinalSet() {
    this.finalSet.push(this.closedSet[this.closedSet.length - 1]);
    while (this.finalSet[0].parent) {
      this.finalSet.splice(0, 0, find(this.closedSet, { index: this.finalSet[0].parent }));
    }
  }

  solve() {
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
        this.getFinalSet();
        return;
      }

      // Find data relative to element 0
      const zero = find(element.puzzle, { value: 0 });

      // Handle moves
      if (element.move !== 'up' && zero.y + 1 < this.size) this.swapPieces(element, 'down');
      if (element.move !== 'down' && zero.y) this.swapPieces(element, 'up');
      if (element.move !== 'left' && zero.x + 1 < this.size) this.swapPieces(element, 'right');
      if (element.move !== 'right' && zero.x) this.swapPieces(element, 'left');
    }
  }
}

module.exports = Euclidean;
