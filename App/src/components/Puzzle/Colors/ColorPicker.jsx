import React from 'react';
import PropTypes from 'prop-types';
import { COLORS } from '../../../config/constants';
import Form from '../../UI/Form/Form';
import RadioInput from '../../UI/Input/RadioInput';
import './ColorPicker.css';

const colorPicker = (props) => {

  // Get colors
  const colors = [];
  Object.entries(COLORS).forEach((color) => {
    colors.push(
      <RadioInput
        key={color[0]}
        value={color[0]}
        name="colorPicker"
        onChange={props.onChange}
      >
        <div id={color[0]} className="Color-gradient" />
      </RadioInput>
    );
  });

  // Display
  return (
    <Form show={props.show} classNames={['Color-picker']}>
      {colors}
    </Form>
  );
};

colorPicker.propTypes = {
  show: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default colorPicker;
