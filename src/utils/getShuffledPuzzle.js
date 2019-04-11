const puzzleToString = (puzzle, size) => {
  let str = `${size}\n`;
  puzzle.forEach((tile, idx) => {
    str += `${tile} `;
    if (idx && (idx + 1) % size === 0) str += '\n';
  });
  return str;
};

const makeGoal = (size) => {
  const ts = size ** 2;
  const puzzle = new Array(ts).fill(-1);
  let cur = 1;
  let x = 0;
  let ix = 1;
  let y = 0;
  let iy = 0;
  while (cur !== ts) {
    puzzle[x + y * size] = cur;
    cur += 1;
    if (x + ix === size || x + ix < 0 || (ix !== 0 && puzzle[x + ix + y * size] !== -1)) {
      iy = ix;
      ix = 0;
    } else if (y + iy === size || y + iy < 0 || (iy !== 0 && puzzle[x + (y + iy) * size] !== -1)) {
      ix = -iy;
      iy = 0;
    }
    x += ix;
    y += iy;
    if (cur === ts) puzzle[x + y * size] = 0;
  }
  return puzzle;
};

const getRandomIndex = (idx, size) => {
  const possibilities = [];
  if (idx % size > 0) possibilities.push(idx - 1);
  if (idx % size < size - 1) possibilities.push(idx + 1);
  if (idx / size > 0) possibilities.push(idx - size);
  if (idx / size < size - 1) possibilities.push(idx + size);
  return possibilities[Math.floor(Math.random() * possibilities.length)];
};

const getShuffledPuzzle = (size, iterations) => {
  let i = 0;
  const puzzle = makeGoal(size);
  while (i < iterations) {
    const idx = puzzle.findIndex(el => el === 0);
    let rdm = -1;
    while (rdm >= puzzle.length || rdm < 0) rdm = getRandomIndex(idx, size);
    puzzle[idx] = puzzle[rdm];
    puzzle[rdm] = 0;
    i += 1;
  }
  return puzzleToString(puzzle, size);
};

export default getShuffledPuzzle;
