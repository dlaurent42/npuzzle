import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../UI/Button/Button';
import Form from '../../UI/Form/Form';
import Icon from '../../UI/Icon/Icon';
import Iterations from './Iterations';
import Sizes from './Sizes';
import { ICONS } from '../../../config/constants';
import './Shuffle.css';

const shuffle = props => (
  <Form show={props.show} classNames={['Shuffle']}>
    <h1>Puzzle size</h1>
    <Sizes shuffleSize={props.shuffleSize} onSizeChange={props.onSizeChange} />
    <h1>Mixing level level</h1>
    <Iterations
      shuffleIterations={props.shuffleIterations}
      onIterationsChange={props.onIterationsChange}
    />
    <div className="Buttons">
      <Button btnAttr="Cancel" onClick={props.close}>
        <Icon active icon={ICONS.CANCEL} />
      </Button>
      <Button btnAttr="Validate" onClick={props.onValidate}>
        <Icon active icon={ICONS.VALIDATE} />
      </Button>
    </div>
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
  close: PropTypes.func.isRequired,
  onSizeChange: PropTypes.func.isRequired,
  onIterationsChange: PropTypes.func.isRequired,
  onValidate: PropTypes.func.isRequired,
};

export default shuffle;
