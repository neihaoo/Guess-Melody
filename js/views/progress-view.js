import {getTimerIndicator} from '../game/get-timer-indicator';
import {splitTime} from '../utils';
import {GAME_NOTES} from '../data/game-data';
import AbstractView from './abstract-view';

export default class ProgressView extends AbstractView {
  constructor(gameState) {
    super();

    const TIMER_INDICATOR_RADIUS = 370;
    const {minutes, seconds} = splitTime(gameState.time);
    const {stroke, offset} = getTimerIndicator(gameState.time, TIMER_INDICATOR_RADIUS);

    this.gameState = gameState;
    this.timerIndicatorRadius = TIMER_INDICATOR_RADIUS;

    this.timerIndicator = {
      stroke,
      offset
    };

    this.gameTime = {
      minutes,
      seconds
    };
  }

  get template() {
    return `
      <div>
        <a class="play-again play-again__wrap" href="#">
          <img class="play-again__img" src="img/melody-logo-ginger.png" alt="logo" width="177" height="76">
        </a>
        <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
          <circle
            stroke-dasharray="${this.timerIndicator.stroke}"
            stroke-dashoffset="${this.timerIndicator.offset}"
            cx="390" cy="390" r="${this.timerIndicatorRadius}"
            class="timer-line"
            style="filter: url(#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
  
          <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
            <span class="timer-value-mins">0${this.gameTime.minutes}</span><!--
            --><span class="timer-value-dots">:</span><!--
            --><span class="timer-value-secs">${this.gameTime.seconds}</span>
          </div>
        </svg>
        <div class="main-mistakes">
          ${new Array(GAME_NOTES - this.gameState.notes)
            .fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`)
            .join(``)}
        </div>
      </div>>
    `;
  }
}
