const finalPuzzle = (size) => {

  // Check size
  if (size < 3) return [];

  // Declare used variables
  let n = size;
  let direction = 1; // direction: right, bottom = 1; left, top = -1
  let counter = 0; // counter value
  let y = 0;
  let x = -1;
  const matrix = [];

  // for n in [n ... 0]
  while (n) {

    // fill n columns
    let col = 0;
    while (col < n) {
      x += direction;
      matrix.push({ x, y, value: (counter + 1 < size * size) ? counter + 1 : 0 });
      counter += 1;
      col += 1;
    }

    // fill n-1 lines
    let line = 0;
    while (line < n - 1) {
      y += direction;
      matrix.push({ x, y, value: (counter + 1 < size * size) ? counter + 1 : 0 });
      counter += 1;
      line += 1;
    }

    // change direction
    direction *= -1;

    // decrement n
    n -= 1;
  }

  return matrix;
};

module.exports = finalPuzzle;
