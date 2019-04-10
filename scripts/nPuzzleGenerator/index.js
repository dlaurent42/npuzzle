const getUserChoices = require('./choices');
const generatePuzzles = require('./generator');

getUserChoices()
  .then(answers => generatePuzzles(answers))
  .then(n => console.log(`${n} puzzles have been generated.`))
  .catch(err => console.error(err.message));
