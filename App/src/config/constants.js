const HEURISTICS = {
  MANHATTAN: 'Manhattan',
  LINEARCONFLICT: 'Linear Conflict',
  MIXED: 'Mixing Level',
  EUCLIDEAN: 'Euclidean',
};

const ICONS = {
  IMPORT: 'upload',
  RUN: 'play',
  RANDOM: 'random',
  CONFIG: 'sliders-h',
  COLORPICKER: 'palette',
  LEFT: 'arrow-circle-left',
  RIGHT: 'arrow-circle-right',
  VALIDATE: 'check',
  CANCEL: 'times',
  CHECKBOX: 'check-square',
  EMPTYCHECKBOX: 'square',
  STATS: 'chart-bar',
};

const COLORS = {
  BASIC: 'Red Green Berk',
  BLUE: '50 Shades Of Blue',
  GAME: '2048 game',
  BLOODY: 'Bloody Mary',
};

const SIZES = [3, 4];
const ITERATIONS = [1, 10, 100, 1000];

module.exports = {
  HEURISTICS,
  ICONS,
  COLORS,
  SIZES,
  ITERATIONS,
};
