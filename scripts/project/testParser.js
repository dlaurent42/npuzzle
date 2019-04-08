const fs = require('fs');

const parseFile = require('../../src/utils/parse');
const finalPuzzle = require('../../src/utils/finalPuzzle');
const isSolvable = require('../../src/utils/isSolvable');

if (process.argv[2]) {
  let i = 2;
  while (process.argv[i]) {
    console.log(`Parsing argv[${i}]: ${process.argv[i]}`);
    const res = parseFile(fs.readFileSync(process.argv[i], 'utf8'));
    if (res.error) console.error('An error occured while parsing.');
    else {
      const final = finalPuzzle(res.size);
      const solvable = isSolvable(res.puzzle, final, res.size);
      console.log('Parsed puzzle:');
      console.log(res);
      console.log('Snail solution:');
      console.log(final);
      console.log(`Is solvable: ${solvable}`);
    }
    if (process.argv[i + 1]) console.log('\n');
    i += 1;
  }
} else console.error('Please provide a file as input.');
