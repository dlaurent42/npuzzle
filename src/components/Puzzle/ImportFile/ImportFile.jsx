import React from 'react';
import PropTypes from 'prop-types';
import './ImportFile.css';

const importFile = (props) => {
  if (!props.show) return (<div />);
  return (
    <div />
  );
};

importFile.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default importFile;
