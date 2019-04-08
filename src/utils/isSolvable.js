const { find } = require('lodash');

/*

If N is odd, then puzzle instance is solvable if number of inversions is even in the input state.

If N is even, puzzle instance is solvable if:
  - the blank is on an even row counting from the bottom (second-last, fourth-last, etc.)
  and number of inversions is odd.
  - the blank is on an odd row counting from the bottom (last, third-last, fifth-last, etc.)
  and number of inversions is even.

For all other cases, the puzzle instance is not solvable.

*/
const getNumberOfPermutations = (initial, final, size) => {

  // Number of permutations
  let permutations = 0;

  // Loop through all values
  let valueA = 1;
  while (valueA < size * size - 1) {
    let valueB = valueA + 1;
    while (valueB < size * size) {
      const objA = find(initial, { value: valueA });
      const objB = find(initial, { value: valueB });
      const retA = find(final, { x: objA.x, y: objA.y });
      const retB = find(final, { x: objB.x, y: objB.y });
      permutations += (retB.value && (!retA.value || retA.value > retB.value));
      valueB += 1;
    }
    valueA += 1;
  }
  return permutations;
};

const isSolvable = (initial, final, size) => {

  const numberOfPermutations = getNumberOfPermutations(initial, final, size);

  // If N is odd, there is enough data to know if puzzle is solvable
  if (size % 2 === 1) {
    console.log(`N is odd and number of permutations % 2 = ${numberOfPermutations} % 2 = ${numberOfPermutations % 2}`);
    return numberOfPermutations % 2 === 0;
  }

  // If N is even, position of 0 from bottom is needed
  const row = find(initial, { value: 0 });
  const numberOfRows = size - row.y;
  return (numberOfRows % 2 === 0 && numberOfPermutations % 2 === 1)
  || (numberOfRows % 2 === 1 && numberOfPermutations % 2 === 0);
};

module.exports = isSolvable;
