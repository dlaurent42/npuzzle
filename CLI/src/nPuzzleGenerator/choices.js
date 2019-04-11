const inquirer = require('inquirer');

const sizes = [
  { name: 3 },
  { name: 4 },
  { name: 5 },
  { name: 6 },
  { name: 7 },
];

const iterations = [
  { name: 1 },
  { name: 10 },
  { name: 100 },
  { name: 1000 },
  { name: 10000 },
];

const getUserChoices = () => (
  new Promise((resolve, reject) => (
    inquirer
      .prompt([
        {
          type: 'checkbox',
          message: 'Select sizes',
          name: 'sizes',
          choices: sizes,
          validate: (answer) => {
            if (answer.length < 1) return 'You must choose at least one size.';
            return true;
          },
        },
        {
          type: 'checkbox',
          message: 'Select number of iterations',
          name: 'iterations',
          choices: iterations,
          validate: (answer) => {
            if (answer.length < 1) return 'You must choose at least one number of iterations.';
            return true;
          },
        },
      ])
      .then(answers => resolve(answers))
      .catch(err => reject(err))
  ))
);

module.exports = getUserChoices;
