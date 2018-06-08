export const setGameTimer = (time) => {
  const gameTimer = {
    time,
    tick() {
      this.time--;

      if (this.time > 0) {
        return this.time;
      } else {
        return false;
      }
    }
  };

  return gameTimer;
};
