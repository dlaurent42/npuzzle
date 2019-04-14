import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../UI/Icon/Icon';
import RadioButton from '../../UI/Input/RadioInput';
import { ICONS } from '../../../config/constants';

const greedy = props => (
  <div className="Greedy">
    <RadioButton
      key="yes"
      value="yes"
      name="greedy"
      onChange={props.onGreedyChange}
    >
      Yes
      {(props.greedy)
        ? <Icon icon={ICONS.CHECKBOX} active />
        : <Icon icon={ICONS.EMPTYCHECKBOX} active />}
    </RadioButton>
    <RadioButton
      key="no"
      value="no"
      name="greedy"
      onChange={props.onGreedyChange}
    >
      No
      {(props.greedy)
        ? <Icon icon={ICONS.EMPTYCHECKBOX} active />
        : <Icon icon={ICONS.CHECKBOX} active />}
    </RadioButton>
  </div>
);

greedy.propTypes = {
  greedy: PropTypes.bool.isRequired,
  onGreedyChange: PropTypes.func.isRequired,
};

export default greedy;
