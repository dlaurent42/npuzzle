import React from 'react';
import PropTypes from 'prop-types';

const statistics = props => (
  <div className="Statistics">
    <div>{`Number of swaps: ${props.numberOfSwaps}`}</div>
    <div>{`Complexity in size: ${props.complexityInSize}`}</div>
    <div>{`Complexity in time: ${props.complexityInTime}`}</div>
    <div>{`Execution duration: ${props.duration} ms`}</div>
  </div>
);

statistics.propTypes = {
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
