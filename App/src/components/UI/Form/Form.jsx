import React from 'react';
import PropTypes from 'prop-types';

import './Form.css';

const form = (props) => {
  const classes = ['App-modal', 'App-form'];
  if (props.show) classes.push('App-modal-show');
  else classes.push('App-modal-hide');
  return (
    <form className={classes.join(' ')}>
      {props.children}
    </form>
  );
};

form.propTypes = {
  show: PropTypes.bool,
};

form.defaultProps = {
  show: false,
};

export default form;
