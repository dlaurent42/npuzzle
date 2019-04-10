const inquirer = require('inquirer');
const fs = require('fs');

const HEURISTICS = require('../../src/config/constants');

const getUserChoices = () => (
  new Promise((resolve, reject) => (
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'heuristic',
          message: 'Please select a heuristic.',
          choices: Object.values(HEURISTICS),
        },
        {
          type: 'list',
          name: 'greedy',
          message: 'Do you want to activate Greedy ?',
          choices: ['Yes', 'No'],
        },
        {
          type: 'list',
          name: 'filename',
          message: 'Please select a file.',
          choices: fs.readdirSync('./resources/'),
        }
      ])
      .then(answers => resolve(answers))
      .catch(err => reject(err))
  ))
);

module.exports = getUserChoices;
