import React from 'react';
import PropTypes from 'prop-types';
import { ICONS, HEURISTICS } from '../../../config/constants';
import Icon from '../../UI/Icon/Icon';
import Form from '../../UI/Form/Form';
import Button from '../../UI/Button/Button';
import RadioButton from '../../UI/Input/RadioInput';
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
  const yesBox = (props.greedy)
    ? <Icon icon={ICONS.CHECKBOX} active />
    : <Icon icon={ICONS.EMPTYCHECKBOX} active />;
  const noBox = (props.greedy)
    ? <Icon icon={ICONS.EMPTYCHECKBOX} active />
    : <Icon icon={ICONS.CHECKBOX} active />;
  const greedy = (
    <div className="Greedy">
      <RadioButton
        key="yes"
        value="yes"
        name="greedy"
        onChange={props.onGreedyChange}
      >
        Yes
        {yesBox}
      </RadioButton>
      <RadioButton
        key="no"
        value="no"
        name="greedy"
        onChange={props.onGreedyChange}
      >
        No
        {noBox}
      </RadioButton>
    </div>
  );
  return (
    <Form show={props.show} classNames={['Settings']}>
      <h1>Heuristics</h1>
      {heuristics}
      <h1>Greedy Search</h1>
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
