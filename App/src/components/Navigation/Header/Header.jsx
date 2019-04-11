import React from 'react';
import PropTypes from 'prop-types';
import { ICONS } from '../../../config/constants';
import Button from '../../UI/Button';
import './Header.css';

const header = props => (
  <div className="App-header">
    <div className="App-title">N-Puzzle</div>
    <div className="App-menu">
      <Button className="MenuButton" icon={ICONS.RANDOM} onClick={props.showShuffleOptions} active={props.displayShuffle} />
      <Button className="MenuButton" icon={ICONS.CONFIG} onClick={props.showSettings} active={props.displaySettings} />
      <Button className="MenuButton" icon={ICONS.IMPORT} onClick={props.showImportOptions} active={props.displayImport} />
      <Button className="MenuButton" icon={ICONS.COLORPICKER} onClick={props.showColorPicker} active={props.displayColorPicker} />
    </div>
  </div>
);

header.propTypes = {
  displayImport: PropTypes.bool.isRequired,
  displaySettings: PropTypes.bool.isRequired,
  displayShuffle: PropTypes.bool.isRequired,
  displayColorPicker: PropTypes.bool.isRequired,
  showShuffleOptions: PropTypes.func.isRequired,
  showImportOptions: PropTypes.func.isRequired,
  showSettings: PropTypes.func.isRequired,
  showColorPicker: PropTypes.func.isRequired,
};

export default header;
