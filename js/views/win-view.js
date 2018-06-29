import {calculateUserScore} from '../game/calculate-user-score';
import {showGameResult} from '../game/show-game-result';
import {getSection, getWordForm, splitTime} from '../utils';
import {GAME_NOTES, GameTime} from '../data/game-data';
import AbstractView from './abstract-view';

export default class WinView extends AbstractView {
  constructor(gameState) {
    super();

    const {userScore, fastScore} = calculateUserScore(gameState.userScore);
    const {minutes, seconds} = splitTime(GameTime.LIMIT - gameState.time);

    this.userScore = userScore;
    this.fastScore = fastScore;

    this.userResult = {
      score: userScore,
      time: gameState.time,
      notes: gameState.notes
    };

    this.userTime = {
      minutes,
      seconds
    };

    this.Word = {
      minutes: getWordForm(minutes, [`минут`, `минуту`, `минуты`]),
      seconds: getWordForm(seconds, [`секунд`, `секунду`, `секунды`]),
      points: getWordForm(userScore, [`баллов`, `балл`, `балла`]),
      fastPoints: getWordForm(fastScore, [`быстрых`, `быстрый`, `быстрых`]),
      errors: getWordForm(GAME_NOTES - gameState.notes, [`ошибок`, `ошибку`, `ошибки`])
    };
  }

  get template() {
    return `
      <section class="main main--result">
        <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

        <h2 class="title">Вы настоящий меломан!</h2>
        <div class="main-stat">Идет подсчет результата игры...</div>
        <span class="main-comparison"></span>
        <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
      </section>
    `;
  }

  get _statTemplate() {
    return `
      <div class="main-stat">За&nbsp;${this.userTime.minutes}&nbsp;${this.Word.minutes} и ${this.userTime.seconds}&nbsp;${this.Word.seconds}
          <br>вы&nbsp;набрали ${this.userScore} ${this.Word.points} (${this.fastScore} ${this.Word.fastPoints})
          <br>совершив ${GAME_NOTES - this.userResult.notes} ${this.Word.errors}</div>
    `;
  }

  onReplayClick() {}

  showStats(gameStats) {
    const comparisonStats = this.element.querySelector(`.main-comparison`);
    comparisonStats.textContent = showGameResult(gameStats, this.userResult);
    this.element.replaceChild(getSection(this._statTemplate), comparisonStats.previousElementSibling);
  }

  bind() {
    this.element.querySelector(`.main-replay`).addEventListener(`click`, () => {
      this.onReplayClick();
    });
  }
}
