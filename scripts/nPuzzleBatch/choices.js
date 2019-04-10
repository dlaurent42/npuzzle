const inquirer = require('inquirer');
const fs = require('fs');

const getUserChoices = () => (
  new Promise((resolve, reject) => (
    inquirer
      .prompt([
        {
          type: 'checkbox',
          name: 'options',
          message: 'Please select an option.',
          choices: [
            'Manhattan', 'Manhattan + Greedy Search',
            'Manhattan + Linear Conflict', 'Manhattan + Linear Conflict + Greedy Search',
            'Manhattan + Mixed Level', 'Manhattan + Mixed Level + Greedy Search',
            'Euclidean', 'Euclidean + Greedy Search',
          ],
          pageSize: 75,
          validate: (answer) => {
            if (answer.length < 1) return 'You must choose at least one file.';
            return true;
          }
        },
        {
          type: 'checkbox',
          name: 'files',
          message: 'Please select a file or more.',
          choices: fs.readdirSync('./resources/'),
          pageSize: 75,
          validate: (answer) => {
            if (answer.length < 1) return 'You must choose at least one file.';
            return true;
          }
        }])
      .then(answer => resolve(answer))
      .catch(err => reject(err))
  ))
);

module.exports = getUserChoices;
