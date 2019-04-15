import React from 'react';
import PropTypes from 'prop-types';
import './EasterEgg.scss';

const easterEgg = (props) => {
  const egg = (props.show)
    ? (
      <div className="EasterEgg">
        <div className="Rabbit" />
        <div className="Clouds" />
      </div>
    ) : null;
  return egg;
};

easterEgg.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default easterEgg;
