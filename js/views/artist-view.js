import AbstractView from './abstract-view';
import getGamePlayer from '../data/game-player';
import getGameProgress from '../data/game-progress';
import getConfirmModal from '../screens/confirm-screen';
import {getSection} from '../utils';

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
        ${getConfirmModal()}
      </section>
    `;
  }

  updateProgress(gameState) {
    const progress = getSection(getGameProgress(gameState));
    this.element.replaceChild(progress, this.element.firstElementChild);
  }

  onAnswer() {}

  onConfirmClick() {}

  bind() {
    const form = this.element.querySelector(`.main-list`);
    const playButton = this.element.querySelector(`.player-control`);

    playButton.classList.replace(`player-control--play`, `player-control--pause`);

    form.addEventListener(`change`, (evt) => {
      const answer = evt.target.value;

      this.onAnswer(answer);
      evt.target.checked = false;
    });

    playButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      evt.stopPropagation();

      const audio = this.element.querySelector(`audio`);

      if (audio.paused) {
        audio.play();
        playButton.classList.replace(`player-control--play`, `player-control--pause`);
      } else {
        audio.pause();
        playButton.classList.replace(`player-control--pause`, `player-control--play`);
      }
    });

    this.element.addEventListener(`click`, (evt) => {
      if (evt.target.closest(`.play-again`)) {
        const modal = this.element.querySelector(`.modal-confirm`);

        const onModalButtonsClick = (evtModal) => {
          switch (evtModal.target.textContent) {
            case `Ок`:
              evtModal.preventDefault();
              evtModal.stopPropagation();

              this.onConfirmClick();

              break;
            case `Отмена`:
            case `Закрыть`:
              evtModal.preventDefault();
              evtModal.stopPropagation();

              modal.classList.add(`modal-confirm__wrap--hidden`);
              modal.removeEventListener(`click`, onModalButtonsClick);

              break;
            default:
              break;
          }
        };

        modal.classList.remove(`modal-confirm__wrap--hidden`);
        modal.addEventListener(`click`, onModalButtonsClick);
      }
    });
  }
}
