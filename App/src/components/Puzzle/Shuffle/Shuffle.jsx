import React from 'react';
import PropTypes from 'prop-types';

import Input from '../../UI/Input';
import './Shuffle.css';

const shuffle = (props) => {
  const classes = ['Suffle', 'App-modal'];
  if (props.show) classes.push('App-modal-show');
  else classes.push('App-modal-hide');
  return (
    <div className={classes.join(' ')}>
      <Input label="Size" />
      <Input label="Iterations" />
    </div>
  );
};

shuffle.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default shuffle;
