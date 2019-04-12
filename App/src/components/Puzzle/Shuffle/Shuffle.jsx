import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../UI/Button/Button';
import Form from '../../UI/Form/Form';
import Icon from '../../UI/Icon/Icon';
import TextInput from '../../UI/Input/TextInput';
import { ICONS } from '../../../config/constants';
import './Shuffle.css';

const shuffle = props => (
  <Form show={props.show}>
    <TextInput label="Size [3, 4, 5]" value={props.shuffleSize} onChange={props.onSizeChange} />
    <TextInput label="Iterations [0...10000]" value={props.shuffleIterations} onChange={props.onIterationsChange} />
    <Button btnAttr="Validate" onClick={props.onValidate}>
      <Icon active icon={ICONS.VALIDATE} />
    </Button>
  </Form>
);

shuffle.propTypes = {
  show: PropTypes.bool.isRequired,
  shuffleSize: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  shuffleIterations: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  onSizeChange: PropTypes.func.isRequired,
  onIterationsChange: PropTypes.func.isRequired,
  onValidate: PropTypes.func.isRequired,
};

export default shuffle;
