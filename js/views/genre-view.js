import AbstractView from './abstract-view';
import getGamePlayer from '../game/game-player';
import getGameProgress from '../game/game-progress';

export default class GenreView extends AbstractView {
  constructor(gameState) {
    super();

    this.gameState = gameState;
    this.question = gameState.questions[gameState.currentQuestion];
  }

  get template() {
    return `
      <section class="main main--level main--level-genre">
        ${getGameProgress(this.gameState)}

        <div class="main-wrap">
          <h2 class="title">Выберите ${this.question.rightAnswer.genre} треки</h2>
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

  onAnswer() {}

  onReplayClick() {}

  bind() {
    const form = this.element.querySelector(`.genre`);
    const playButtons = this.element.querySelectorAll(`.player-control`);
    const answerInputs = this.element.querySelectorAll(`input[name="answer"]`);
    const sendButton = this.element.querySelector(`.genre-answer-send`);

    playButtons[0].classList.replace(`player-control--play`, `player-control--pause`);
    sendButton.disabled = true;

    const onAnswerInputChange = () => {
      for (let i = 0; i < answerInputs.length; i++) {
        if (answerInputs[i].checked && !sendButton.disabled) {
          break;
        } else if (answerInputs[i].checked && sendButton.disabled) {
          sendButton.disabled = false;
          break;
        } else if (!answerInputs[i].checked && !sendButton.disabled) {
          sendButton.disabled = true;
        }
      }
    };

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

        for (const i of playButtons) {
          if (!i.parentElement.firstElementChild.paused) {
            i.classList.replace(`player-control--pause`, `player-control--play`);
            i.parentElement.firstElementChild.pause();
          }
        }

        if (currentAudio.paused) {
          currentAudio.play();
          evt.target.classList.replace(`player-control--play`, `player-control--pause`);
        } else {
          evt.target.classList.replace(`player-control--pause`, `player-control--play`);
        }
      }
    });

    answerInputs.forEach((el) => {
      el.addEventListener(`change`, onAnswerInputChange);
    });

    sendButton.addEventListener(`click`, () => {
      this.onAnswer(answerInputs);
      clearAnswers();
    });

    this.element.addEventListener(`click`, (evt) => {
      if (evt.target.closest(`.play-again`)) {
        this.onReplayClick();
      }
    });
  }
}
