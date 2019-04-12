import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Icon.css';

const icon = (props) => {
  const classes = (props.active) ? [props.className, 'Active'] : [props.className];
  return <FontAwesomeIcon className={classes.join(' ')} icon={props.icon} onClick={props.onClick} />;
};

icon.propTypes = {
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  active: PropTypes.bool,
};

icon.defaultProps = {
  onClick: () => {},
  className: '',
  active: false,
};

export default icon;
