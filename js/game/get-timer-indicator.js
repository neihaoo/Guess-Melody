import {GameTime} from '../data/game-data';

export const getTimerIndicator = (time, radius) => {
  const stroke = Math.round(2 * Math.PI * radius);
  const offset = stroke - Math.round(stroke * (time / GameTime.LIMIT));
  return {
    stroke,
    offset
  };
};
