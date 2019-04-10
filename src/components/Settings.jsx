import React from 'react';

import HEURISTICS from '../config/constants';

import './Settings.css';

// https://freefrontend.com/css-select-boxes/
// https://codepen.io/Aoyue/pen/rLExYX?editors=1100

const settings = () => {

  const options = [];
  Object.values(HEURISTICS).forEach((heuristic) => {
    options.push(
      <label className="option" htmlFor="inp">
        <input type="radio" name="option" />
        <span className="title animated fadeIn">{heuristic}</span>
      </label>
    );
  });

  return (
    <div className="select animated zoomIn">
      <input type="radio" name="option" />
      <i className="toggle icon icon-arrow-down" />
      <i className="toggle icon icon-arrow-up" />
      <span className="placeholder">Choose...</span>
      {options}
    </div>
  );
};

export default settings;
