const fs = require('fs');
const { isEmpty } = require('lodash');
const Solver = require('../../src/helpers/Solver');

const printSolution = (P) => {
  console.log('');
  console.log(`Heuristic ${P.heuristic} (greedy: ${P.greedySearch}, uniform: ${P.uniformCost})`);
  console.log(`Complexity in size: ${P.complexityInSize}`);
  console.log(`Complexity in time: ${P.complexityInTime}`);
  console.log(`Number of swaps: ${P.numberOfSwaps}`);
  console.log(`Execution duration: ${P.duration}ms`);
};

// Function to run all heuristics with given file
const runWithFile = (file) => {

  // Echo filename
  console.log(`${file}`);

  // Declare a new puzzle and parse file
  // By default, simple Manhattan will be considered
  const P = new Solver();
  P.getPuzzle(fs.readFileSync(file, 'utf8'));

  // Print errors in case of error
  if (!isEmpty(P.errors)) P.printErrors();
  else {

    // Assess snail solution
    P.getSnailPuzzle();

    // Check if puzzle is solvable
    P.isPuzzleSolvable();

    // Solve it
    P.solve();
    printSolution(P);

    // Lauch Manhattan, greedySearch
    P.reset('Manhattan', true, false);
    P.solve();
    printSolution(P);

    // Lauch Manhattan, uniformCost
    P.reset('Manhattan', false, true);
    P.solve();
    printSolution(P);

    // Lauch Euclidean
    P.reset('Euclidean', false, false);
    P.solve();
    printSolution(P);

    // Lauch Euclidean, greedySearch
    P.reset('Euclidean', true, false);
    P.solve();
    printSolution(P);

    // Lauch Euclidean, uniformCost
    P.reset('Euclidean', false, true);
    P.solve();
    printSolution(P);

    // Lauch LinearConflict
    P.reset('LinearConflict', false, false);
    P.solve();
    printSolution(P);

    // Lauch LinearConflict, greedySearch
    P.reset('LinearConflict', true, false);
    P.solve();
    printSolution(P);

    // Lauch LinearConflict, uniformCost
    P.reset('LinearConflict', false, true);
    P.solve();
    printSolution(P);
  }
};

// If files are specified then each file is tested
if (process.argv[2]) {

  let i = 2;
  while (process.argv[i]) {
    runWithFile(process.argv[i]);
    i += 1;
  }

// If no file is specified, each file from resources is tested
} else {
  fs.readdirSync('../../resources').forEach((file) => {
    runWithFile(file);
    console.log('\n');
  });
}
