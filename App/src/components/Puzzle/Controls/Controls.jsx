import React from 'react';
import PropTypes from 'prop-types';
import { ICONS } from '../../../config/constants';
import Icon from '../../UI/Icon/Icon';
import './Controls.css';

const controls = (props) => {
  const controlsList = [];
  if (!props.puzzleSolved) {
    controlsList.push(<Icon key="run" icon={ICONS.RUN} onClick={props.handleSolve} classNames={['Control-run', 'Icon']} />);
  } else {
    if (props.currentStep !== 0) {
      controlsList.push(<Icon key="left" icon={ICONS.LEFT} onClick={props.handlePrevious} classNames={['Control-previous', 'Icon']} />);
    }
    if (props.currentStep < props.finalSet.length - 1) {
      controlsList.push(<Icon key="right" icon={ICONS.RIGHT} onClick={props.handleNext} classNames={['Control-next', 'Icon']} />);
    }
  }
  return (
    <div className="Controls">
      {controlsList}
    </div>
  );
};

controls.propTypes = {
  currentStep: PropTypes.number.isRequired,
  puzzleSolved: PropTypes.bool.isRequired,
  finalSet: PropTypes.arrayOf(PropTypes.any).isRequired,
  handleSolve: PropTypes.func.isRequired,
  handlePrevious: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
};

export default controls;
