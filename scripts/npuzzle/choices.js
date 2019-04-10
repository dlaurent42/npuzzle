const inquirer = require('inquirer');
const fs = require('fs');

const HEURISTICS = require('../../src/config/constants');

const selectFile = userChoice => (
  new Promise((resolve, reject) => (
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'file',
          message: 'Please select a file.',
          choices: fs.readdirSync('./resources/'),
          pageSize: 75,
        },
      ])
      .then(answer => resolve(Object.assign(userChoice, { filename: answer.file })))
      .catch(err => reject(err))
  ))
);

const selectHeuristic = userChoice => (
  new Promise((resolve, reject) => (
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'algo',
          message: 'Please select a heuristic.',
          choices: Object.values(HEURISTICS),
        },
      ])
      .then(answer => resolve(selectFile(Object.assign(userChoice, { heuristic: answer.algo }))))
      .catch(err => reject(err))
  ))
);

const getUserChoices = () => (
  new Promise((resolve, reject) => {
    const userChoice = {};
    return inquirer
      .prompt([
        {
          type: 'list',
          name: 'choice',
          message: 'Please select an option.',
          choices: ['A*', 'Greedy Search', 'Uniform Cost'],
        }])
      .then((answer) => {
        if (answer.choice === 'Greedy Search') userChoice.greedy = true;
        if (answer.choice === 'Uniform Cost') {
          userChoice.uniformCost = true;
          return selectFile(userChoice);
        }
        return selectHeuristic(userChoice);
      })
      .then(answer => resolve(answer))
      .catch(err => reject(err));
  })
);

module.exports = getUserChoices;
