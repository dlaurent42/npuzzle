const fs = require('fs');
const { exec } = require('child_process');

const PuzzleSolver = require('../helpers/Puzzle');

const {
  MANHATTAN,
  LINEARCONFLICT,
  MIXED,
  EUCLIDEAN,
} = require('../config/constants').HEURISTICS;

const solveThis = (heuristic, greedy, fileContent, file) => {
  // Get puzzle from file content
  const Puzzle = new PuzzleSolver(heuristic, false, greedy);
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
    fs.appendFileSync(file, 'Puzzle is not solvable.\n', 'utf8');
    return;
  }

  // Display a warning following game situation
  if (Puzzle.uniformCost) fs.appendFileSync(file, 'Warning: you are trying to solve puzzle with brute-force method.\n', 'utf8');
  if (Puzzle.size > 4) fs.appendFileSync(file, 'Warning: puzzle is big so it can take time to solve.\n', 'utf8');

  // Solve puzzle
  const solved = Puzzle.solve();
  fs.appendFileSync(file, `\nHeuristic: ${Puzzle.heuristic}\n`, 'utf8');
  if (Puzzle.greedySearch) fs.appendFileSync(file, 'greedy activated\n', 'utf8');
  else fs.appendFileSync(file, 'greedy deactivated\n', 'utf8');
  if (solved) {

    // Print results
    fs.appendFileSync(file, `Number of swaps: ${Puzzle.numberOfSwaps}\n`, 'utf8');
    fs.appendFileSync(file, `Complexity in size: ${Puzzle.complexityInSize}\n`, 'utf8');
    fs.appendFileSync(file, `Complexity in time: ${Puzzle.complexityInTime}\n`, 'utf8');
    fs.appendFileSync(file, `Execution duration: ${Puzzle.duration}ms\n\n`, 'utf8');

  } else fs.appendFileSync(file, 'Execution stopped after 2 minutes.');
};

const solvePuzzle = ({ options, files }) => {

  // Prepare environment
  exec('rm -r ./logs/*');
  exec('mkdir -p ./logs/');

  // Open each file
  files.forEach((file) => {

    // Get file content based on filename
    let fileContent = '';
    try {
      fileContent = fs.readFileSync(`./resources/${file}`, 'utf8');
    } catch (e) {
      return;
    }

    // Solve puzzle for each selected option
    options.forEach((option) => {
      if (option === 'Manhattan') solveThis(MANHATTAN, false, fileContent, `logs/${file}`);
      if (option === 'Manhattan + Greedy Search') solveThis(MANHATTAN, true, fileContent, `logs/${file}`);
      if (option === 'Manhattan + Linear Conflict') solveThis(LINEARCONFLICT, false, fileContent, `logs/${file}`);
      if (option === 'Manhattan + Linear Conflict + Greedy Search') solveThis(LINEARCONFLICT, true, fileContent, `logs/${file}`);
      if (option === 'Manhattan + Mixed Level') solveThis(MIXED, false, fileContent, `logs/${file}`);
      if (option === 'Manhattan + Mixed Level + Greedy Search') solveThis(MIXED, true, fileContent, `logs/${file}`);
      if (option === 'Euclidean') solveThis(EUCLIDEAN, false, fileContent, `logs/${file}`);
      if (option === 'Euclidean + Greedy Search') solveThis(EUCLIDEAN, true, fileContent, `logs/${file}`);
    });

  });

};

module.exports = solvePuzzle;
