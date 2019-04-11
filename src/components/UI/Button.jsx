import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Button.css';

const button = (props) => {
  const classes = (props.active) ? [props.className, 'Active'] : [props.className];
  return <FontAwesomeIcon className={classes.join(' ')} icon={props.icon} onClick={props.onClick} />;
};

button.propTypes = {
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

button.defaultProps = {
  active: false,
};

export default button;
