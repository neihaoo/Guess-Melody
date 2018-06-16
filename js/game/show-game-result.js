export const showGameResult = (otherPlayersTotalResults, userTotalResult) => {
  let userScore = userTotalResult.score;

  if (userTotalResult.time === 0) {
    return `Время вышло!<br>Вы не успели отгадать все мелодии`;
  }

  if (userTotalResult.notes <= 0) {
    return `У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!`;
  }

  const scores = otherPlayersTotalResults.map((el) => el.score);

  scores.push(userScore);
  scores.sort((a, b) => b - a);

  const playersCount = scores.length;
  const userPlace = scores.indexOf(userScore) + 1;
  const userPercentResult = (playersCount - userPlace) / playersCount * 100;

  return `Вы заняли ${userPlace} место из ${playersCount} игроков. Это лучше, чем у ${userPercentResult}% игроков`;
};
