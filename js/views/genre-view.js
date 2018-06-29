import AbstractView from './abstract-view';
import getGamePlayer from '../data/game-player';
import getGameProgress from '../data/game-progress';
import {getSection} from '../utils';

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
                ${getGamePlayer(el, i === 0)}
                <input type="checkbox" name="answer" value="${el.genre}" id="a-${i}">
                <label class="genre-answer-check" for="a-${i}"></label>
              </div>          
            `).join(``)}

            <button class="genre-answer-send" type="submit">Ответить</button>
          </form>
        </div>
      </section>
    `;
  }

  updateProgress(gameState) {
    const progress = getSection(getGameProgress(gameState));
    this.element.replaceChild(progress, this.element.firstElementChild);
  }

  onAnswer() {}

  onReplayClick() {}

  bind() {
    const form = this.element.querySelector(`.genre`);
    const playButtons = this.element.querySelectorAll(`.player-control`);
    const answerInputs = Array.from(this.element.querySelectorAll(`input[name="answer"]`));
    const sendButton = this.element.querySelector(`.genre-answer-send`);

    playButtons[0].classList.replace(`player-control--play`, `player-control--pause`);
    sendButton.disabled = true;

    const clearAnswers = () => {
      sendButton.disabled = true;
      answerInputs.forEach((el) => {
        el.checked = false;
      });
    };

    form.addEventListener(`click`, (evt) => {
      if (evt.target.className.includes(`player-control`)) {
        evt.preventDefault();
        evt.stopPropagation();

        const currentAudio = evt.target.parentNode.querySelector(`audio`);

        playButtons.forEach((el) => {
          if (!el.parentElement.firstElementChild.paused) {
            el.parentElement.firstElementChild.pause();
            el.classList.replace(`player-control--pause`, `player-control--play`);
          }
        });

        if (currentAudio.paused) {
          currentAudio.play();
          evt.target.classList.replace(`player-control--play`, `player-control--pause`);
        } else {
          currentAudio.pause();
          evt.target.classList.replace(`player-control--pause`, `player-control--play`);
        }
      }
    });

    form.addEventListener(`change`, () => {
      sendButton.disabled = !answerInputs.some((el) => el.checked);
    });

    sendButton.addEventListener(`click`, () => {
      const answer = answerInputs.filter((item) => item.checked).map((item) => item.value);

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
}
