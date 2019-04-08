const { isEmpty, findIndex } = require('lodash');

// parseFile function takes file content as input and outputs puzzle structure
const parseFileContent = (fileContent) => {

  // puzzle contains problem data
  const npuzzle = {
    error: true,
    size: undefined,
    puzzle: [], // Taquin is an array of object containg { x, y, value }
  };

  // verify file content
  if (isEmpty(fileContent)) return npuzzle;
  npuzzle.error = false;

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
      if (!/^\d+$/.test(block)) npuzzle.error = true;

      // Check if block is puzzle size but with a value lesser than 3
      else if (!npuzzle.size && value < 3) npuzzle.error = true;

      // Check if there is another numeric block after puzzle size
      else if (npuzzle.size && isPuzzleSize) npuzzle.error = true;

      // Check dimensions of puzzle regarding puzzle size
      else if (npuzzle.size && (y > npuzzle.size || x >= npuzzle.size)) npuzzle.error = true;

      // Check values regarding puzzle size
      else if (npuzzle.size && value >= npuzzle.size * npuzzle.size) npuzzle.error = true;

      // Check if value is already in puzzle structure
      else if (npuzzle.size && findIndex(npuzzle.puzzle, { value }) > -1) npuzzle.error = true;

      // Get puzzle size
      else if (!npuzzle.size) {
        npuzzle.size = value;
        isPuzzleSize = true;

      // Push taquin to structure
      } else npuzzle.puzzle.push({ x, y: y - 1, value });

      // Increment x
      x += 1;
    });

    // Increment y
    y += 1;
  });

  // Check number of taquins
  if (!npuzzle.error && npuzzle.puzzle.length < npuzzle.size * npuzzle.size) npuzzle.error = true;

  // file content is parsed
  return npuzzle;
};

module.exports = parseFileContent;
