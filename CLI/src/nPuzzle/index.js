const getUserChoices = require('./choices');
const solvePuzzle = require('./solving');

getUserChoices()
  .then(answers => solvePuzzle(answers))
  .catch(err => console.error(err.message));
