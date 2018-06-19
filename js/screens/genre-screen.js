import {changeScreen} from '../utils';
import getScreen from '../game/get-screen';
import welcomeScreen from './welcome-screen';
import GenreView from '../views/genre-view';

export default (data) => {
  const screen = new GenreView(data);

  screen.onAnswer = (answers) => {
    let userNotes;
    let swapScore = [];
    const score = screen.gameState.userScore.slice();

    for (const i of answers) {
      if (i.checked) {
        if (i.value === screen.question.rightAnswer.genre) {
          swapScore.push({answerState: true, answerTime: 5});
          userNotes = screen.gameState.notes;
        } else {
          swapScore.push({answerState: false, answerTime: 5});
          userNotes = screen.gameState.notes - 1;
        }
      }

      if (!i.checked && i.value === screen.question.rightAnswer.genre) {
        swapScore.push({answerState: false, answerTime: 5});
        userNotes = screen.gameState.notes - 1;
      }
    }

    const isAnswerWrong = swapScore.find((el) => el.answerState === false);

    score.push(isAnswerWrong ? isAnswerWrong : swapScore.shift());

    const newGameState = Object.assign({}, screen.gameState, {
      notes: userNotes,
      userScore: score,
      currentQuestion: screen.gameState.currentQuestion + 1
    });

    changeScreen(getScreen(newGameState));
  };

  screen.onReplayClick = () => {
    changeScreen(welcomeScreen());
  };

  return screen.element;
};
