import {GameTime} from '../data/game-data';
import {questionsPreloadTemplate} from './components/preload-questions';
import {getSection} from '../utils';
import getGameProgress from './components/game-progress';
import getGamePlayer from './components/game-player';
import Application from '../application';
import AbstractView from './abstract-view';

export default class GenreView extends AbstractView {
  constructor(gameState, question) {
    super();

    this.gameState = gameState;
    this.question = question;
  }

  get template() {
    return `
      <section class="main main--level main--level-genre">
        ${getGameProgress(this.gameState)}

        <div class="main-wrap">
          <h2 class="title">${this.question.question}</h2>
          <form class="genre">
            ${this.question.answers.map((el, i) => `
              <div class="genre-answer">
                ${getGamePlayer(el)}
                <input type="checkbox" name="answer" value="${el.genre}" id="a-${i}">
                <label class="genre-answer-check" for="a-${i}"></label>
              </div>          
            `).join(``)}

            <button class="genre-answer-send" type="submit">Ответить</button>
          </form>
        </div>
        ${questionsPreloadTemplate}
      </section>
    `;
  }

  bind() {
    const form = this.element.querySelector(`.genre`);
    const playButtons = this.element.querySelectorAll(`.player-control`);
    const audios = Array.from(this.element.querySelectorAll(`audio`));
    const answersInputs = Array.from(this.element.querySelectorAll(`input[name="answer"]`));
    const answersLabels = this.element.querySelectorAll(`.genre-answer-check`);
    const sendButton = this.element.querySelector(`.genre-answer-send`);

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

    const clearAnswers = () => {
      sendButton.disabled = true;

      for (const answerInput of answersInputs) {
        answerInput.checked = false;
      }
    };

    sendButton.disabled = true;

    answersInputs.forEach((el, i) => {
      el.disabled = true;
      playButtons[i].disabled = true;
      answersLabels[i].classList.add(`genre-answer-check--disabled`);
    });

    audios.forEach((el, i) => {
      el.addEventListener(`error`, (error) => {
        Application.showError(error);
      });

      el.addEventListener(`loadeddata`, () => {
        if (audios.every((it) => it.buffered.length > 0)) {
          answersInputs.forEach((it, index) => {
            if (index === 0) {
              playAudio(el, playButtons[index]);
            }

            it.disabled = false;
            playButtons[index].disabled = false;
            answersLabels[index].classList.remove(`genre-answer-check--disabled`);

          });

          this._showQuestions();
        }
      });

      el.addEventListener(`ended`, () => {
        pauseAudio(el, playButtons[i]);
      });
    });

    form.addEventListener(`click`, (evt) => {
      if (evt.target.className.includes(`player-control`)) {
        evt.preventDefault();
        evt.stopPropagation();

        const currentAudio = evt.target.parentNode.querySelector(`audio`);

        for (const playButton of playButtons) {
          if (!playButton.parentElement.firstElementChild.paused) {
            pauseAudio(playButton.parentElement.firstElementChild, playButton);
          }
        }

        if (!currentAudio.paused) {
          pauseAudio(currentAudio, evt.target);
        } else {
          playAudio(currentAudio, evt.target);
        }
      }
    });

    form.addEventListener(`change`, () => {
      sendButton.disabled = !answersInputs.some((el) => el.checked);
    });

    sendButton.addEventListener(`click`, () => {
      const answer = answersInputs.filter((item) => item.checked).map((item) => item.value);

      this.onAnswer(answer);
      clearAnswers();
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

  showAnswer() {
    const answers = this.element.querySelectorAll(`input[name="answer"]`);

    this._showQuestions();

    for (const answer of answers) {
      if (answer.value === this.question.rightAnswer.genre) {
        answer.parentElement.setAttribute(`style`, `outline: 2px dashed red; outline-offset: 4px`);
      }
    }
  }

  _showQuestions() {
    this.element.querySelector(`.preload-question`).classList.add(`preload-question--hidden`);
  }

  onAnswer() {}

  onReplayClick() {}
}
