import {calculateUserScore} from '../game/calculate-user-score';
import {showGameResult} from '../game/show-game-result';
import {GAME_NOTES, gameStats} from '../data/game-data';
import AbstractView from './abstract-view';

export default class WinView extends AbstractView {
  constructor(gameState) {
    super();

    const {userScore, fastScore} = calculateUserScore(gameState.userScore);

    this.userScore = userScore;
    this.fastScore = fastScore;
    this.userResult = {
      score: userScore,
      time: gameState.time,
      notes: gameState.notes
    };
  }

  get template() {
    return `
      <section class="main main--result">
        <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

        <h2 class="title">Вы настоящий меломан!</h2>
        <div class="main-stat">За&nbsp;3&nbsp;минуты и 25&nbsp;секунд
          <br>вы&nbsp;набрали ${this.userScore} баллов (${this.fastScore} быстрых)
          <br>совершив ${GAME_NOTES - this.userResult.notes} ошибки</div>
        <span class="main-comparison">${showGameResult(gameStats, this.userResult)}</span>
        <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
      </section>
    `;
  }

  onReplayClick() {}

  bind() {
    this.element.querySelector(`.main-replay`).addEventListener(`click`, () => {
      gameStats.push(this.userResult);
      this.onReplayClick();
    });
  }
}
