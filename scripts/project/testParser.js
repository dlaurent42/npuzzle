const fs = require('fs');
const { isEmpty } = require('lodash');
const LinearConflict = require('../../src/helpers/LinearConflict');

const runWithFile = (file) => {
  console.log(`Parsing ${file}`);
  const P = new LinearConflict();
  P.getPuzzle(fs.readFileSync(file, 'utf8'));
  if (!isEmpty(P.errors)) P.printErrors();
  else {
    P.getSnailPuzzle();
    P.isPuzzleSolvable();
    // P.printSize();
    // P.printPuzzle(P.puzzle);
    // P.printSnail();
    // P.printSolvable();
    P.solve();
    console.log(`Complexity in size: ${P.complexityInSize}`);
    console.log(`Complexity in time: ${P.complexityInTime}`);
    console.log(`Number of swaps: ${P.numberOfSwaps}`);
    P.finalSet.forEach((el, idx) => {
      if (idx) {
        console.log(`\nMove ${el.move}`);
        console.log(`Distance: ${el.distance}`);
        console.log(`Cost: ${el.cost}`);
      } else console.log('\nInitial situation');
      P.printPuzzle(el.puzzle);
    });
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
