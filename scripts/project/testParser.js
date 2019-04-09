const fs = require('fs');
const { isEmpty } = require('lodash');
const Puzzle = require('../../src/helpers/Puzzle');

const runWithFile = (file) => {
  console.log(`Parsing ${file}`);
  const P = new Puzzle();
  P.getPuzzle(fs.readFileSync(file, 'utf8'));
  if (!isEmpty(P.errors)) P.printErrors();
  else {
    P.getSnailPuzzle();
    P.isPuzzleSolvable();
    // P.printSize();
    // P.printPuzzle();
    // P.printSnail();
    // P.printSolvable();
    P.solveAStarManhattan();
  }
};

// If files are specified then each file is tested
if (process.argv[2]) {
  let i = 2;
  while (process.argv[i]) {
    runWithFile(process.argv[i]);
    console.log('\n');
    i += 1;
  }

// If no file is specified, each file from resources is tested
} else {
  fs.readdirSync('../../resources').forEach((file) => {
    runWithFile(file);
    console.log('\n');
  });
}
