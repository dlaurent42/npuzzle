const { isEmpty, findIndex } = require('lodash');

// parseFile function takes file content as input and outputs puzzle structure
const parseFileContent = (fileContent) => {

  // puzzle contains problem data
  const puzzle = {
    error: true,
    size: undefined,
    taquins: [], // Taquin is an array of object containg { x, y, value }
  };

  // verify file content
  if (isEmpty(fileContent)) return puzzle;
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
      if (!/^\d+$/.test(block)) puzzle.error = true;

      // Check if block is puzzle size but with a value lesser than 3
      else if (!puzzle.size && value < 3) puzzle.error = true;

      // Check if there is another numeric block after puzzle size
      else if (puzzle.size && isPuzzleSize) puzzle.error = true;

      // Check dimensions of puzzle regarding puzzle size
      else if (puzzle.size && (y > puzzle.size || x >= puzzle.size)) puzzle.error = true;

      // Check values regarding puzzle size
      else if (puzzle.size && value >= puzzle.size * puzzle.size) puzzle.error = true;

      // Check if value is already in puzzle structure
      else if (puzzle.size && findIndex(puzzle.taquins, { value }) > -1) puzzle.error = true;

      // Get puzzle size
      else if (!puzzle.size) {
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

module.exports = parseFileContent;
