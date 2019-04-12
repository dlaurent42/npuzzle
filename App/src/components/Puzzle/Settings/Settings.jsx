import React from 'react';
import PropTypes from 'prop-types';
import { ICONS, HEURISTICS } from '../../../config/constants';
import Icon from '../../UI/Icon/Icon';
import Form from '../../UI/Form/Form';
import Button from '../../UI/Button/Button';
import RadioButton from '../../UI/Input/RadioInput';
import CheckboxButton from '../../UI/Input/CheckboxInput';
import './Settings.css';

const settings = (props) => {

  // Create heuristics array
  const heuristics = [];
  Object.entries(HEURISTICS).forEach((heuristic) => {

    // Check if option is checked
    const box = (props.heuristic === heuristic[1])
      ? <Icon icon={ICONS.CHECKBOX} active />
      : <Icon icon={ICONS.EMPTYCHECKBOX} active />;

    // Push heuristic to list
    heuristics.push(
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
  });

  // Get switch button
  const box = (props.greedy)
    ? <Icon icon={ICONS.CHECKBOX} active />
    : <Icon icon={ICONS.EMPTYCHECKBOX} active />;
  const greedy = (
    <div className="Greedy">
      <CheckboxButton
        value="greedy"
        name="greedy"
        onChange={props.onGreedyChange}
      >
        Greedy Search
        {box}
      </CheckboxButton>
    </div>
  );
  return (
    <Form show={props.show} classNames={['Settings']}>
      {heuristics}
      {greedy}
      <Button btnAttr="Validate" onClick={props.onValidate}>
        <Icon active icon={ICONS.VALIDATE} />
      </Button>
    </Form>
  );
};

settings.propTypes = {
  show: PropTypes.bool.isRequired,
  heuristic: PropTypes.string.isRequired,
  greedy: PropTypes.bool.isRequired,
  onValidate: PropTypes.func.isRequired,
  onGreedyChange: PropTypes.func.isRequired,
  onHeuristicChange: PropTypes.func.isRequired,
};

export default settings;
