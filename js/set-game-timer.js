export const setGameTimer = (time) => {
  if (typeof time !== `number`) {
    throw new Error(`Time must be of type number`);
  }

  if (time < 0) {
    throw new Error(`Time must be >= 0`);
  }

  return {
    time,
    tick() {
      return setGameTimer(time - 1);
    }
  };
};
