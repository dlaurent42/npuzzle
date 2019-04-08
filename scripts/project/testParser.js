const fs = require('fs');
const { isEmpty } = require('lodash');
const Puzzle = require('../../src/helpers/Puzzle');

if (process.argv[2]) {
  let i = 2;
  while (process.argv[i]) {
    console.log(`Parsing argv[${i}]: ${process.argv[i]}`);
    const P = new Puzzle();
    P.getPuzzle(fs.readFileSync(process.argv[i], 'utf8'));
    if (!isEmpty(P.errors)) P.printErrors();
    else {
      P.getSnailPuzzle();
      P.isPuzzleSolvable();
      P.printSize();
      P.printPuzzle();
      P.printSnail();
      P.printSolvable();
    }
    if (process.argv[i + 1]) console.log('\n');
    i += 1;
  }
} else console.error('Please provide a file as input.');
