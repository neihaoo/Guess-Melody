import {GameTime} from '../data/game-data';
import {getSection} from '../utils';
import getGameProgress from './game-progress';
import getGamePlayer from './game-player';
import Application from '../application';
import AbstractView from './abstract-view';

export default class ArtistView extends AbstractView {
  constructor(gameState, question) {
    super();

    this.gameState = gameState;
    this.question = question;
  }

  get template() {
    return `
      <section class="main main--level main--level-artist">
        ${getGameProgress(this.gameState)}
      
        <div class="main-wrap">
          <h2 class="title main-title">${this.question.question}</h2>
          ${getGamePlayer(this.question.rightAnswer, true)}
          <form class="main-list">
            ${this.question.answers.map((el, i) => `
              <div class="main-answer-wrapper">
                <input class="main-answer-r" type="radio" id="answer-${i}" name="answer" value="${el.artist}"/>
                <label class="main-answer" for="answer-${i}">
                  <img class="main-answer-preview" src="${el.image}"
                       alt="${el.artist}" width="134" height="134">
                  ${el.artist}
                </label>
              </div>
            `).join(``)}
         </form>
        </div>
      </section>
    `;
  }

  bind() {
    const form = this.element.querySelector(`.main-list`);
    const playButton = this.element.querySelector(`.player-control`);
    const answersInputs = this.element.querySelectorAll(`input[name="answer"]`);
    const answersLabels = this.element.querySelectorAll(`.main-answer`);
    const audio = this.element.querySelector(`audio`);

    const playAudio = (track, control) => {
      const playPromise = track.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => control.classList.replace(`player-control--play`, `player-control--pause`))
          .catch((error) => error.message);
      }
    };

    const pauseAudio = (track, control) => {
      const playPromise = track.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            track.pause();
            control.classList.replace(`player-control--pause`, `player-control--play`);
          })
          .catch((error) => error.message);
      }
    };

    playButton.disabled = true;

    answersInputs.forEach((el, i) => {
      el.disabled = true;
      answersLabels[i].classList.add(`main-answer--disabled`);
    });

    audio.addEventListener(`error`, (error) => {
      Application.showError(error);
    });

    audio.addEventListener(`loadeddata`, () => {
      playButton.disabled = false;

      answersInputs.forEach((el, i) => {
        el.disabled = false;
        answersLabels[i].classList.remove(`main-answer--disabled`);
      });

      playAudio(audio, playButton);
    });

    audio.addEventListener(`ended`, () => {
      pauseAudio(audio, playButton);
    });

    playButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      evt.stopPropagation();

      if (!audio.paused) {
        pauseAudio(audio, playButton);
      } else {
        playAudio(audio, playButton);
      }
    });

    form.addEventListener(`change`, (evt) => {
      const answer = evt.target.value;

      this.onAnswer(answer);
      evt.target.checked = false;
    });

    this.element.addEventListener(`click`, (evt) => {
      if (evt.target.closest(`.play-again`)) {
        evt.preventDefault();
        evt.stopPropagation();

        this.onReplayClick();
      }
    });
  }

  updateProgress(gameState) {
    const progress = getSection(getGameProgress(gameState));
    this.element.replaceChild(progress, this.element.firstElementChild);

    if (gameState.time < GameTime.WARNING) {
      document.querySelector(`.timer-value`).classList.add(`timer-value--finished`);
    }
  }

  onAnswer() {}

  onReplayClick() {}
}
