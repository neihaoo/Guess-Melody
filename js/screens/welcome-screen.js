import {getSection, changeScreen} from '../utils';
import {INITIAL_STATE} from '../data/game-data';
import getScreen from '../game/get-screen';

const template = `
  <section class="main main--welcome">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <button class="main-play">Начать игру</button>
    <h2 class="title main-title">Правила игры</h2>
    <p class="text main-text">
      Правила просты&nbsp;— за&nbsp;5 минут ответить на все вопросы.<br>
      Ошибиться можно 3 раза.<br>
      Удачи!
    </p>
  </section>
`;

const screen = getSection(template);

screen.querySelector(`.main-play`).addEventListener(`click`, () => {
  changeScreen(getScreen(INITIAL_STATE));
});

export default screen;
