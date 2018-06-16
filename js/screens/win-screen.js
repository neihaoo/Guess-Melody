import {getSection, changeScreen} from '../utils';
import {calculateUserScore} from '../game/calculate-user-score';
import {showGameResult} from '../game/show-game-result';
import {gameStats} from '../data/game-data';
import welcomeScreen from './welcome-screen';

export default (data) => {
  const {userScore, fastScore} = calculateUserScore(data.userScore);
  const userResult = {
    score: userScore,
    time: data.time,
    notes: data.notes
  };

  const template = `
  <section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">Вы настоящий меломан!</h2>
    <div class="main-stat">За&nbsp;3&nbsp;минуты и 25&nbsp;секунд
      <br>вы&nbsp;набрали ${userScore} баллов (${fastScore} быстрых)
      <br>совершив ${userResult.notes} ошибки</div>
    <span class="main-comparison">${showGameResult(gameStats, userResult)}</span>
    <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
  </section>
`;

  const screen = getSection(template);

  screen.querySelector(`.main-replay`).addEventListener(`click`, () => {
    changeScreen(welcomeScreen);
  });

  return screen;
};
