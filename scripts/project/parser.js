const _ = require('lodash');

// parseFile function takes file content as input and outputs puzzle structure
const parseFile = (fileContent) => {

  // puzzle contains problem data
  const puzzle = {
    error: true,
    size: undefined,
    taquins: [], // Taquin is an array of object containg { x, y, value }
  };

  // verify file content
  if (_.isEmpty(fileContent)) return puzzle;
  puzzle.error = false;

  // parse file content
  let y = 0;

  // Loop through lines
  fileContent.trim().split('\n').forEach((line) => {
    let x = 0;

    // Skip comments
    if (line.trim().startsWith('#')) return;

    // Split line into blocks
    let isPuzzleSize = false;
    line.split('#')[0].trim().split(' ').forEach((block) => {
      const value = parseInt(block, 10);

      // Check if block contains only digits
      if (!/^\d+$/.test(block)) {
        puzzle.error = true;
        console.error(`Error number 1:\n\tline is [${line}]\n\tblock is [${block}]\n`);
      // Check if block is puzzle size but with a value lesser than 3
      } else if (!puzzle.size && value < 3) {
        puzzle.error = true;
        console.error(`Error number 2:\n\tline is [${line}]\n\tblock is [${block}]\n`);
      // Check if there is another numeric block after puzzle size
      } else if (puzzle.size && isPuzzleSize) {
        puzzle.error = true;
        console.error(`Error number 3:\n\tline is [${line}]\n\tblock is [${block}]\n`);
      // Check dimensions of puzzle regarding puzzle size
      } else if (puzzle.size && (y > puzzle.size || x >= puzzle.size)) {
        puzzle.error = true;
        console.error(`Error number 4:\n\tline is [${line}]\n\tblock is [${block}]\n`);
      // Check values regarding puzzle size
      } else if (puzzle.size && value >= puzzle.size * puzzle.size) {
        puzzle.error = true;
        console.error(`Error number 5:\n\tline is [${line}]\n\tblock is [${block}]\n`);
      // Check if value is already in puzzle structure
      } else if (puzzle.size && _.findIndex(puzzle.taquins, { value }) > -1) {
        puzzle.error = true;
        console.error(`Error number 6:\n\tline is [${line}]\n\tblock is [${block}]\n`);
      // Get puzzle size
      } else if (!puzzle.size) {
        puzzle.size = value;
        isPuzzleSize = true;

      // Push taquin to structure
      } else puzzle.taquins.push({ x, y: y - 1, value });

      // Increment x
      x += 1;
    });

    // Increment y
    y += 1;
  });

  // Check number of taquins
  if (!puzzle.error && puzzle.taquins.length < puzzle.size * puzzle.size) puzzle.error = true;

  // file content is parsed
  return puzzle;
};

// export default parseFile;
const fs = require('fs');

if (process.argv[2]) {
  const res = parseFile(fs.readFileSync(process.argv[2], 'utf8'));
  console.log(res);
} else console.error('Please provide a file as input.');
