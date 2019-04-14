import React from 'react';
import PropTypes from 'prop-types';
import { ICONS } from '../../../config/constants';
import Icon from '../../UI/Icon/Icon';
import Form from '../../UI/Form/Form';
import Button from '../../UI/Button/Button';
import Heuristics from './Heuristics';
import Greedy from './Greedy';
import './Settings.css';

const settings = props => (
  <Form show={props.show} classNames={['Settings']}>
    <h1>Heuristics</h1>
    <Heuristics heuristic={props.heuristic} onHeuristicChange={props.onHeuristicChange} />
    <h1>Greedy Search</h1>
    <Greedy greedy={props.greedy} onGreedyChange={props.onGreedyChange} />
    <Button btnAttr="Validate" onClick={props.onValidate}>
      <Icon active icon={ICONS.VALIDATE} />
    </Button>
  </Form>
);

settings.propTypes = {
  show: PropTypes.bool.isRequired,
  heuristic: PropTypes.string.isRequired,
  greedy: PropTypes.bool.isRequired,
  onValidate: PropTypes.func.isRequired,
  onGreedyChange: PropTypes.func.isRequired,
  onHeuristicChange: PropTypes.func.isRequired,
};

export default settings;
