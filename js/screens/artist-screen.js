import {getSection, changeScreen} from '../utils';
import welcomeScreen from './welcome-screen';
import getGameProgress from '../game/game-progress';
import getGamePlayer from '../game/game-player';
import getScreen from '../game/get-screen';

export default (data) => {
  const question = data.questions[data.currentQuestion];
  const template = `
    <section class="main main--level main--level-artist">
      ${getGameProgress(data)}
    
      <div class="main-wrap">
        <h2 class="title main-title">Кто исполняет эту песню?</h2>
        ${getGamePlayer(question.rightAnswer, true)}
        <form class="main-list">
          ${question.answers.map((el, i) => `
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

  const screen = getSection(template);
  const playButton = screen.querySelector(`.player-control`);

  playButton.classList.replace(`player-control--play`, `player-control--pause`);

  screen.querySelector(`.main-list`).addEventListener(`change`, (evt) => {
    let userNotes;
    const score = data.userScore.slice();

    if (evt.target.value === question.rightAnswer.artist) {
      score.push({answerState: true, answerTime: 5});
      userNotes = data.notes;
    } else {
      score.push({answerState: false, answerTime: 5});
      userNotes = data.notes - 1;
    }

    const newGameState = Object.assign({}, data, {notes: userNotes, userScore: score, currentQuestion: data.currentQuestion + 1});

    changeScreen(getScreen(newGameState));
    evt.target.checked = false;
  });

  playButton.addEventListener(`click`, () => {
    const audio = screen.querySelector(`audio`);
    if (audio.paused) {
      audio.play();
      playButton.classList.replace(`player-control--play`, `player-control--pause`);
    } else {
      audio.pause();
      playButton.classList.replace(`player-control--pause`, `player-control--play`);
    }
  });

  screen.addEventListener(`click`, (evt) => {
    if (evt.target.closest(`.play-again`)) {
      changeScreen(welcomeScreen);
    }
  });

  return screen;
};
