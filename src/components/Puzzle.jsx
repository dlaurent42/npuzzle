import React from 'react';
import PropTypes from 'prop-types';
import find from 'lodash';

import getDistanceRatio from '../utils/getDistanceRatio';
import './Puzzle.css';

const puzzle = (props) => {

  // Declare an array which will contains all tiles
  const puzzleTiles = [];

  // Loop through tiles by order of appearance
  let x = 0;
  while (x < props.size) {
    let y = 0;
    while (y < props.size) {

      // Find tile corresponding to (x, y)
      const obj = find(props.puzzle, { x, y });
      const distanceRatio = getDistanceRatio(obj, props);

      // Push tile to tiles array
      puzzleTiles.push(<div style={`background: rgb(${distanceRatio * 255}, ${(1 - distanceRatio) * 255}, 0)`}>{obj.value}</div>);

      // Increment counters
      y += 1;
    }
    x += 1;
  }
  return <div className="Grid" style={`grid-template-columns: repeat(auto-fill, ${Math.floor(100 / props.size)}%);`}>{puzzleTiles}</div>;
};

puzzle.propTypes = {
  size: PropTypes.number.isRequired,
  puzzle: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default puzzle;
