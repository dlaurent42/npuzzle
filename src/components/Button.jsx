import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const button = props => (
  <FontAwesomeIcon className={props.className} icon={props.icon} onClick={props.onClick} />
);

button.propTypes = {
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default button;
