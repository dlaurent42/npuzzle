import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../UI/Icon/Icon';
import RadioButton from '../../UI/Input/RadioInput';
import { ICONS, HEURISTICS } from '../../../config/constants';

const heuristics = props => (
  Object.entries(HEURISTICS).map((heuristic) => {

    // Check if option is checked
    const box = (props.heuristic === heuristic[1])
      ? <Icon icon={ICONS.CHECKBOX} active />
      : <Icon icon={ICONS.EMPTYCHECKBOX} active />;

    // Push heuristic to list
    return (
      <RadioButton
        key={heuristic[0]}
        value={heuristic[0]}
        name="heuristics"
        onChange={props.onHeuristicChange}
      >
        {heuristic[1]}
        {box}
      </RadioButton>
    );
  })
);

heuristics.propTypes = {
  heuristic: PropTypes.string.isRequired,
  onHeuristicChange: PropTypes.func.isRequired,
};

export default heuristics;
