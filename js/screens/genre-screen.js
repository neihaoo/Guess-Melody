import {getSection, changeScreen} from '../utils';
import welcomeScreen from './welcome-screen';
import getGameProgress from '../game/game-progress';
import getGamePlayer from '../game/game-player';
import getScreen from '../game/get-screen';

export default (data) => {
  const question = data.questions[data.currentQuestion];
  const template = `
    <section class="main main--level main--level-genre">
      ${getGameProgress(data)}

      <div class="main-wrap">
        <h2 class="title">Выберите ${question.rightAnswer.genre} треки</h2>
        <form class="genre">
          ${question.answers.map((el, i) => `
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

  const screen = getSection(template);

  const sendButton = screen.querySelector(`.genre-answer-send`);
  const answerInputs = screen.querySelectorAll(`input[name="answer"]`);
  const playButtons = screen.querySelectorAll(`.player-control`);
  const form = screen.querySelector(`.genre`);

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

  sendButton.disabled = true;
  playButtons[0].classList.replace(`player-control--play`, `player-control--pause`);

  form.addEventListener(`click`, (evt) => {
    if (evt.target.className.includes(`player-control`)) {
      const currentAudio = evt.target.parentNode.querySelector(`audio`);

      for (const i of playButtons) {
        if (i.parentElement.firstElementChild.played) {
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
    let userNotes;
    let swapScore = [];
    const score = data.userScore.slice();

    for (const i of answerInputs) {
      if (i.checked) {
        if (i.value === question.rightAnswer.genre) {
          swapScore.push({answerState: true, answerTime: 5});
          userNotes = data.notes;
        } else {
          swapScore.push({answerState: false, answerTime: 5});
          userNotes = data.notes - 1;
        }
      }

      if (!i.checked && i.value === question.rightAnswer.genre) {
        swapScore.push({answerState: false, answerTime: 5});
        userNotes = data.notes - 1;
      }
    }

    const isAnswerWrong = swapScore.find((el) => el.answerState === false);

    score.push(isAnswerWrong ? isAnswerWrong : swapScore.shift());

    const newGameState = Object.assign({}, data, {notes: userNotes, userScore: score, currentQuestion: data.currentQuestion + 1});

    changeScreen(getScreen(newGameState));
    clearAnswers();
  });

  screen.addEventListener(`click`, (evt) => {
    if (evt.target.closest(`.play-again`)) {
      changeScreen(welcomeScreen);
    }
  });

  return screen;
};
