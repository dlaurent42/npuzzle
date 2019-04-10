const { exec } = require('child_process');

// Declare puzzle sizes and number of iterations regarding shuffle
const sizes = [3, 4]; // , 5, 6, 10, 17];
const iterations = [0, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000];

// Prepare environment
exec('rm -r ./resources/{in,}valid*');

// Counter
let puzzlesGeneratedCounter = 0;

// Loop through sizes
sizes.forEach((size) => {

  // For each size, loop through iterations
  iterations.forEach((iter) => {

    // For each size and each iteration, create an invalid puzzle
    exec(`./scripts/generator/puzzleGenerator.py ${size} -u -i ${iter} > ./resources/invalid_s${size}_i${iter}`);
    puzzlesGeneratedCounter += 1;

    // Depending on size and iterations, generate or not a valid puzzle
    if ((size > 3 && iter > 50) || size > 4) return;
    exec(`./scripts/generator/puzzleGenerator.py ${size} -s -i ${iter} > ./resources/valid_s${size}_i${iter}`);
    puzzlesGeneratedCounter += 1;

  });

});

console.log(`${puzzlesGeneratedCounter} puzzles have been generated.`);
