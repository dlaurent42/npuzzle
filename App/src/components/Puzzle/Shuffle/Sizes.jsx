import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../UI/Icon/Icon';
import RadioButton from '../../UI/Input/RadioInput';
import { SIZES, ICONS } from '../../../config/constants';

const sizes = props => (
  SIZES.map((size) => {

    // Check if current size is the selected one
    const box = (props.shuffleSize === size)
      ? <Icon icon={ICONS.CHECKBOX} active />
      : <Icon icon={ICONS.EMPTYCHECKBOX} active />;

    // Push size to list
    return (
      <RadioButton
        key={size}
        value={size}
        name="sizes"
        onChange={props.onSizeChange}
      >
        {size}
        {box}
      </RadioButton>
    );
  })
);

sizes.propTypes = {
  shuffleSize: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  onSizeChange: PropTypes.func.isRequired,
};

export default sizes;
