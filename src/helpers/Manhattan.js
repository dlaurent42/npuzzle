const {
  isEmpty,
  findIndex,
  find,
  cloneDeep,
} = require('lodash');

const Puzzle = require('./Puzzle');

// This class handles all data and methods relative to Manhattan resolution
class Manhattan extends Puzzle {

  constructor() {
    super();

    // Variables relative to solving
    this.steps = [];
  }

  getDistance(direction) {

    // Get map index following direction and coordinates
    const puzzle = cloneDeep(this.steps[this.steps.length - 1].puzzle);
    const zeroIdx = findIndex(puzzle, { value: 0 });
    let swappedIdx = -1;

    if (direction === 'down') swappedIdx = findIndex(puzzle, { x: puzzle[zeroIdx].x, y: puzzle[zeroIdx].y + 1 });
    else if (direction === 'up') swappedIdx = findIndex(puzzle, { x: puzzle[zeroIdx].x, y: puzzle[zeroIdx].y - 1 });
    else if (direction === 'left') swappedIdx = findIndex(puzzle, { x: puzzle[zeroIdx].x - 1, y: puzzle[zeroIdx].y });
    else if (direction === 'right') swappedIdx = findIndex(puzzle, { x: puzzle[zeroIdx].x + 1, y: puzzle[zeroIdx].y });

    // Swap values
    if (direction === 'left' || direction === 'right') [puzzle[zeroIdx].x, puzzle[swappedIdx].x] = [puzzle[swappedIdx].x, puzzle[zeroIdx].x];
    else [puzzle[zeroIdx].y, puzzle[swappedIdx].y] = [puzzle[swappedIdx].y, puzzle[zeroIdx].y];

    // Assess manhattan distance
    let distance = 0;
    puzzle.forEach((el) => {
      const snail = find(this.snail, { value: el.value });
      distance += Math.abs(snail.x - el.x) + Math.abs(snail.y - el.y);
    });
    console.log(`... Testing direction ${direction} -> ${distance}`);
    this.printPuzzle(puzzle);
    console.log('');
    // Return object containing all necessary information to proceed
    return { direction, distance, puzzle };
  }

  solve() {

    // Verify input
    if (!this.solvable) return;

    // Declare variable
    let lastStep = {
      direction: 'none',
      distance: -1,
      puzzle: cloneDeep(this.puzzle)
    };
    this.steps.push(lastStep);

    console.log('Initial situation');
    this.printPuzzle(lastStep.puzzle);
    console.log('');

    while (lastStep.distance) {

      // possibilities contains manhattan distances of each possible move
      const possibilities = [];

      // Get possible swaps
      const zeroPosition = find(lastStep.puzzle, { value: 0 });
      if (lastStep.direction !== 'up' && zeroPosition.y + 1 < this.size) possibilities.push(this.getDistance('down'));
      if (lastStep.direction !== 'down' && zeroPosition.y) possibilities.push(this.getDistance('up'));
      if (lastStep.direction !== 'left' && zeroPosition.x + 1 < this.size) possibilities.push(this.getDistance('right'));
      if (lastStep.direction !== 'right' && zeroPosition.x) possibilities.push(this.getDistance('left'));

      // Find best solution
      let solution = { ...possibilities[0] };
      possibilities.forEach((el) => {
        if (solution.distance > el.distance) solution = { ...el };
      });

      // Reset params following best solution
      this.steps.push(solution);
      lastStep = { ...solution };
      console.log(`Step ${this.steps.length - 1}: ${lastStep.direction} [${lastStep.distance}]`);
      this.printPuzzle(lastStep.puzzle);
      console.log('');
    }
  }
}

module.exports = Manhattan;
