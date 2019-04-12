import React from 'react';
import PropTypes from 'prop-types';
import { ICONS } from '../../../config/constants';
import Icon from '../../UI/Icon/Icon';
import './Header.css';

const header = props => (
  <div className="App-header">
    <div className="App-title">N-Puzzle</div>
    <div className="App-menu">
      <Icon className="Icon" icon={ICONS.RANDOM} onClick={props.showShuffleOptions} active={props.displayShuffle} />
      <Icon className="Icon" icon={ICONS.CONFIG} onClick={props.showSettings} active={props.displaySettings} />
      <Icon className="Icon" icon={ICONS.COLORPICKER} onClick={props.showColorPicker} active={props.displayColorPicker} />
    </div>
  </div>
);

header.propTypes = {
  displaySettings: PropTypes.bool.isRequired,
  displayShuffle: PropTypes.bool.isRequired,
  displayColorPicker: PropTypes.bool.isRequired,
  showShuffleOptions: PropTypes.func.isRequired,
  showSettings: PropTypes.func.isRequired,
  showColorPicker: PropTypes.func.isRequired,
};

export default header;
