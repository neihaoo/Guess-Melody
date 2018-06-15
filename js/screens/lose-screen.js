import {getSection, changeScreen} from '../utils';
import {calculateUserScore} from '../game/calculate-user-score';
import {showGameResult} from '../game/show-game-result';
import {gameStats} from '../data/game-data';
import welcomeScreen from '../screens/welcome-screen';

export default (data) => {
  const {userScore} = calculateUserScore(data.userScore);
  const userResult = {
    score: userScore,
    time: data.time,
    notes: data.notes
  };

  const templateTitle = data.notes > 0 ? `Какая жалость!` : `Увы и ах!`;

  const template = `
  <section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">${templateTitle}</h2>
    <div class="main-stat">${showGameResult(gameStats, userResult)}</div>
    <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
  </section>
`;

  const screen = getSection(template);

  screen.querySelector(`.main-replay`).addEventListener(`click`, () => {
    changeScreen(welcomeScreen);
  });

  return screen;
};

