import {GAME_NOTES, TIMER_INDICATOR_RADIUS} from './game-data';
import {getTimerIndicator} from '../game/get-timer-indicator';
import {splitTime} from '../utils';

export default (data) => `
  <a class="play-again play-again__wrap" href="#">
    <img class="play-again__img" src="img/melody-logo-ginger.png" alt="logo" width="177" height="76">
  </a>
  <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
    <circle
      stroke-dasharray="${getTimerIndicator(data.time, TIMER_INDICATOR_RADIUS).stroke}"
      stroke-dashoffset="${getTimerIndicator(data.time, TIMER_INDICATOR_RADIUS).offset}"
      cx="390" cy="390" r="${TIMER_INDICATOR_RADIUS}"
      class="timer-line"
      style="filter: url(#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

    <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
      <span class="timer-value-mins">0${splitTime(data.time).minutes}</span><!--
      --><span class="timer-value-dots">:</span><!--
      --><span class="timer-value-secs">${splitTime(data.time).seconds}</span>
    </div>
  </svg>
  <div class="main-mistakes">
    ${new Array(GAME_NOTES - data.notes)
      .fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`)
      .join(``)}
  </div>
`;
