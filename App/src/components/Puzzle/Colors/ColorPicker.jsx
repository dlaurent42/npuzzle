import React from 'react';
import PropTypes from 'prop-types';
import './ColorPicker.css';

const colorPicker = (props) => {
  if (!props.show) return (<div />);
  return (
    <div />
  );
};

colorPicker.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default colorPicker;
