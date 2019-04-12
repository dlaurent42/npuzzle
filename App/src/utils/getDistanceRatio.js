import { find } from 'lodash';
import { HEURISTICS } from '../config/constants';

const getDistanceRatio = (obj, props) => {

  // Declare variable used to assess distance
  const snail = find(props.snail, { value: obj.value });
  const dx = Math.abs(snail.x - obj.x);
  const dy = Math.abs(snail.y - obj.y);
  const dMax = Math.abs(props.size - 1);

  // Assess distance of tile following heuristic
  const distance = (props.heuristic === HEURISTICS.EUCLIDEAN)
    ? (dx + dy + (Math.sqrt(2) - 2) * Math.min(dx, dy))
    : dx + dy;

  // Assess maximum distance of tile following heuristic
  const maxDistance = (props.heuristic === HEURISTICS.EUCLIDEAN)
    ? (2 + (Math.sqrt(2) - 2)) * dMax
    : 2 * dMax;

  // Return distance ratio
  return distance / maxDistance;
};

export default getDistanceRatio;
