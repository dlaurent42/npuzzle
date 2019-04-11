import React from 'react';
import PropTypes from 'prop-types';
import './Shuffle.css';

const shuffle = (props) => {
  if (!props.show) return (<div />);
  return (
    <div />
  );
};

shuffle.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default shuffle;
