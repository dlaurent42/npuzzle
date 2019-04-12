import React from 'react';
import PropTypes from 'prop-types';

const input = props => (
  <label htmlFor="inp" className="Radio-input">
    <input type="radio" id="inp" value={props.value} onChange={props.onChange} name={props.name} />
    {props.children}
  </label>
);

input.propTypes = {
  checked: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

input.defaultProps = {
  checked: false,
};

export default input;
