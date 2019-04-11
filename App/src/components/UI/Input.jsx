import React from 'react';
import PropTypes from 'prop-types';
import './Input.css';

const input = props => (
  <label htmlFor="inp" className="Inp">
    <input type="text" id="inp" placeholder="&nbsp;" />
    <span className="Label">{props.label}</span>
    <span className="Border" />
  </label>
);

input.propTypes = {
  label: PropTypes.string,
};

input.defaultProps = {
  label: ''
};

export default input;
