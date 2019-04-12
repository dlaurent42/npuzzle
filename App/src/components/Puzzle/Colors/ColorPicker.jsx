import React from 'react';
import PropTypes from 'prop-types';
import { COLORS } from '../../../config/constants';
import Form from '../../UI/Form/Form';
import './ColorPicker.css';

const colorPicker = (props) => {

  // Get colors
  const colors = [];
  let currColor = '';
  Object.entries(COLORS).forEach((color) => {
    if (props.color === color[1]) [currColor] = color;
    colors.push(
      <option key={color[0]} value={color[0]} id={color[0]} label={color[1]} className="Color-gradient" />
    );
  });

  // Display
  return (
    <Form show={props.show}>
      <select onChange={props.onClick} value={currColor} className="Color-picker">
        {colors}
      </select>
    </Form>
  );
};

colorPicker.propTypes = {
  show: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default colorPicker;
