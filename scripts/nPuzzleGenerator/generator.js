const { exec } = require('child_process');

const generatePuzzles = ({ sizes, iterations }) => (
  new Promise((resolve) => {
    // Prepare environment
    exec('rm -r ./resources/{in,}valid*');

    // Counter
    let puzzlesGeneratedCounter = 0;

    // Loop through sizes
    sizes.forEach((size) => {

      // For each size, loop through iterations
      iterations.forEach((iter) => {

        // For each size and each iteration, create an invalid puzzle
        exec(`./scripts/nPuzzleGenerator/puzzleGenerator.py ${size} -u -i ${iter} > ./resources/invalid_s${size}_i${iter}`);
        puzzlesGeneratedCounter += 1;

        // For each size and each iteration, create a valid puzzle
        exec(`./scripts/nPuzzleGenerator/puzzleGenerator.py ${size} -s -i ${iter} > ./resources/valid_s${size}_i${iter}`);
        puzzlesGeneratedCounter += 1;

      });

    });

    resolve(puzzlesGeneratedCounter);
  })
);

module.exports = generatePuzzles;
