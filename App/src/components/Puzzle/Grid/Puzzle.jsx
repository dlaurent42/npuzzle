import React from 'react';
import PropTypes from 'prop-types';
import { find } from 'lodash';
import { COLORS, ICONS } from '../../../config/constants';
import Icon from '../../UI/Icon/Icon';
import getDistanceRatio from '../../../utils/getDistanceRatio';
import './Puzzle.css';

const puzzle = (props) => {

  // Check size
  if (props.size === 0) return <div className="Grid" />;

  // Declare an array which will contains all tiles
  const puzzleTiles = [];

  // Loop through tiles by order of appearance
  let y = 0;
  while (y < props.size) {
    let x = 0;
    while (x < props.size) {

      // Find tile corresponding to (x, y)
      const obj = find(props.puzzle, { x, y });
      const r = getDistanceRatio(obj, props);

      // Select color set
      const rgb = [];
      if (props.color === COLORS.BASIC) rgb.push(r * 255, (1 - r) * 255, 0);
      else if (props.color === COLORS.BLUE) rgb.push(25 + r * 230, 84 + r * 132, 123 + r * 32);
      else if (props.color === COLORS.GAME) rgb.push(255, 94 + (1 - r) * 59, 98 + (1 - r) * 4);
      else rgb.push(221 + (1 - r) * 34, 34 + (1 - r) * 45, 118 + (r - 1) * 71);

      // Push tile to tiles array
      if (obj.value === 0) puzzleTiles.push(<div key={`${obj.value}_${x}_${y}`} style={{ background: `rgb(${rgb.join(',')})` }}><Icon active classNames={['EasterEgg']} onClick={props.toggleEasterEgg} icon={ICONS.EGG} /></div>);
      else puzzleTiles.push(<div key={`${obj.value}_${x}_${y}`} style={{ background: `rgb(${rgb.join(',')})` }}>{obj.value}</div>);

      // Increment counters
      x += 1;
    }
    y += 1;
  }

  // Render tiles
  return (
    <div
      className="Grid"
      style={{ gridTemplateColumns: `repeat(auto-fill, ${Math.floor(100 / props.size)}%)` }}
    >
      {puzzleTiles}
    </div>
  );
};

puzzle.propTypes = {
  size: PropTypes.number,
  puzzle: PropTypes.arrayOf(PropTypes.any),
  color: PropTypes.string,
  toggleEasterEgg: PropTypes.func.isRequired,
};

puzzle.defaultProps = {
  size: 0,
  puzzle: [],
  color: COLORS.BLUE,
};

export default puzzle;
