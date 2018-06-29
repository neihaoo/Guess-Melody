import {GameTime} from '../data/game-data';

export const getTimerIndicator = (time, radius) => {
  const stroke = Math.trunc(2 * Math.PI * radius);
  const offset = stroke - Math.trunc(stroke * (time / GameTime.LIMIT));

  return {stroke, offset};
};
