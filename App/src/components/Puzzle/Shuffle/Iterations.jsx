import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../UI/Icon/Icon';
import RadioButton from '../../UI/Input/RadioInput';
import { ITERATIONS, ICONS } from '../../../config/constants';

const iterations = props => (
  ITERATIONS.map((iteration) => {

    // Check if current size is the selected one
    const box = (props.shuffleIterations === iteration)
      ? <Icon icon={ICONS.CHECKBOX} active />
      : <Icon icon={ICONS.EMPTYCHECKBOX} active />;

    // Push size to list
    return (
      <RadioButton
        key={iteration}
        value={iteration}
        name="iterations"
        onChange={props.onIterationsChange}
      >
        {iteration}
        {box}
      </RadioButton>
    );
  })
);

iterations.propTypes = {
  shuffleIterations: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  onIterationsChange: PropTypes.func.isRequired,
};

export default iterations;
