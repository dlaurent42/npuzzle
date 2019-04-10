const fs = require('fs');
const PuzzleSolver = require('../../src/helpers/Puzzle');
const { UNIFORMCOST } = require('../../src/config/constants');

const solvePuzzle = ({ heuristic, greedy, filename }) => (

  new Promise((resolve, reject) => {

    // Get file content based on filename
    let fileContent = '';
    try {
      fileContent = fs.readFileSync(`./resources/${filename}`, 'utf8');
    } catch (e) {
      return reject(e);
    }

    // Get puzzle from file content
    const Puzzle = new PuzzleSolver(heuristic, (greedy === 'Yes'));
    Puzzle.getPuzzle(fileContent);

    // Check errors
    if (Puzzle.errors.length) {
      Puzzle.printErrors();
      return resolve();
    }

    // Get snail solution
    Puzzle.getSnailPuzzle();

    // Check if puzzle is solvable
    Puzzle.isPuzzleSolvable();
    if (!Puzzle.solvable) {
      console.log('Puzzle is not solvable...');
      return resolve();
    }

    // Display a warning following game situation
    if (heuristic === UNIFORMCOST) console.log('Warning: you are trying to solve puzzle with brute-force method.');
    if (Puzzle.size > 4) console.log('Warning: puzzle is big so it can take time to solve.');

    // Solve puzzle
    Puzzle.solve();

    // Print results
    console.log(`\nHeuristic :${Puzzle.heuristic}`);
    if (Puzzle.greedySearch) console.log('greedy activated\n');
    else console.log('greedy deactivated\n');
    console.log(`Number of swaps: ${Puzzle.numberOfSwaps}`);
    console.log(`Complexity in size: ${Puzzle.complexityInSize}`);
    console.log(`Complexity in time: ${Puzzle.complexityInTime}`);
    console.log(`Execution duration: ${Puzzle.duration}ms\n`);
    Puzzle.finalSet.forEach((step, idx) => {
      if (idx) console.log(`\nMove: ${step.move}\n`);
      Puzzle.printPuzzle(step.puzzle);
    });

    return resolve();
  })
);

module.exports = solvePuzzle;
