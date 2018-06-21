import {changeScreen} from '../utils';
import getScreen from '../game/get-screen';
import welcomeScreen from './welcome-screen';
import GenreView from '../views/genre-view';

export default (data) => {
  const screen = new GenreView(data);

  screen.onAnswer = (answers) => {
    let userNotes = 0;
    let swapScore = [];
    const score = screen.gameState.userScore.slice();

    answers.forEach((el) => {
      if (el.checked) {
        if (el.value === screen.question.rightAnswer.genre) {
          swapScore.push({answerState: true, answerTime: 5});
          userNotes = screen.gameState.notes;
        } else {
          swapScore.push({answerState: false, answerTime: 5});
          userNotes = screen.gameState.notes - 1;
        }
      }

      if (!el.checked && el.value === screen.question.rightAnswer.genre) {
        swapScore.push({answerState: false, answerTime: 5});
        userNotes = screen.gameState.notes - 1;
      }
    });

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
