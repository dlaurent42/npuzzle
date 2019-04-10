const fs = require('fs');

const PuzzleSolver = require('../../src/helpers/Puzzle');
const HEURISTICS = require('../../src/config/constants');

// Get parameters from script call
const heuristic = process.argv[2] || HEURISTICS.MANHATTAN;
const greedy = (process.argv[3] === 'greedy');

// Check if entered heuristic exists
let isHeuristic = false;
Object.values(HEURISTICS).forEach((h) => {
  if (h === heuristic) isHeuristic = true;
});

if (!isHeuristic) {
  console.error(`Entered heuristic ${heuristic}\n`);
  console.error('Available heuristics:');
  Object.values(HEURISTICS).forEach((h) => {
    console.error(`\t${h}`);
  });
}

// Welcoming message
console.log('Starting tests');

// Loop through puzzles stored in resources
fs.readdirSync('./resources/').forEach((file) => {

  // Get file content based on filename
  let fileContent = '';
  try {
    fileContent = fs.readFileSync(`./resources/${file}`, 'utf8');
  } catch (e) {
    console.error(`Error: cannot read file ${file}`);
    return;
  }

  // Message to warn which file is being processed
  console.log(`\nSolving ${file}...`);

  // Get puzzle from file content
  const Puzzle = new PuzzleSolver(heuristic, greedy);
  Puzzle.getPuzzle(fileContent);

  // Check errors
  if (Puzzle.errors.length) {
    Puzzle.printErrors();
    return;
  }

  // Get snail solution
  Puzzle.getSnailPuzzle();

  // Check if puzzle is solvable
  Puzzle.isPuzzleSolvable();
  if (!Puzzle.solvable) {
    console.log('unsolvable');
    return;
  }

  // Solve puzzle
  process.stdout.write('Solvable');
  Puzzle.solve();
  console.log(` in ${Puzzle.numberOfSwaps} swaps [${Puzzle.duration}ms]`);
});

console.log('\nEnd of tests.');
