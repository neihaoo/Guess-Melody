import AbstractView from './abstract-view';
import getGamePlayer from '../game/game-player';
import getGameProgress from '../game/game-progress';

export default class ArtistView extends AbstractView {
  constructor(gameState) {
    super();

    this.gameState = gameState;
    this.question = gameState.questions[gameState.currentQuestion];
  }

  get template() {
    return `
      <section class="main main--level main--level-artist">
        ${getGameProgress(this.gameState)}
      
        <div class="main-wrap">
          <h2 class="title main-title">Кто исполняет эту песню?</h2>
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

  onAnswer() {}

  onReplayClick() {}

  bind() {
    const form = this.element.querySelector(`.main-list`);
    const playButton = this.element.querySelector(`.player-control`);

    playButton.classList.replace(`player-control--play`, `player-control--pause`);

    form.addEventListener(`change`, (evt) => {
      this.onAnswer(evt.target.value);
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
        this.onReplayClick();
      }
    });
  }
}
