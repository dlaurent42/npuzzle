import React from 'react';
import PropTypes from 'prop-types';
import Form from '../../UI/Form/Form';
import getFormatedDuration from '../../../utils/getFormatedDuration';
import './Statistics.css';

const statistics = (props) => {
  const stats = (props.solved) ? (
    <>
      <div className="Statistics-el">
        <span>Number of swaps</span>
        <span>{props.numberOfSwaps}</span>
      </div>
      <div className="Statistics-el">
        <span>Complexity in size</span>
        <span>{props.complexityInSize}</span>
      </div>
      <div className="Statistics-el">
        <span>Complexity in time</span>
        <span>{props.complexityInTime}</span>
      </div>
      <div className="Statistics-el">
        <span>Execution duration</span>
        <span>{getFormatedDuration(props.duration)}</span>
      </div>
    </>
  ) : (
    <div className="No-statistics">
      Solve the puzzle to access information about calculation.
    </div>
  );
  return (
    <Form show={props.show} classNames={['Statistics']}>
      {stats}
    </Form>
  );
};

statistics.propTypes = {
  show: PropTypes.bool.isRequired,
  solved: PropTypes.bool.isRequired,
  numberOfSwaps: PropTypes.number,
  complexityInSize: PropTypes.number,
  complexityInTime: PropTypes.number,
  duration: PropTypes.number,
};

statistics.defaultProps = {
  numberOfSwaps: 0,
  complexityInSize: 0,
  complexityInTime: 0,
  duration: 0,
};

export default statistics;
