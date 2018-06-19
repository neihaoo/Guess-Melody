import {changeScreen} from '../utils';
import getScreen from '../game/get-screen';
import welcomeScreen from './welcome-screen';
import ArtistView from '../views/artist-view';

export default (data) => {
  const screen = new ArtistView(data);

  screen.onAnswer = (answer) => {
    let userNotes;
    const score = screen.gameState.userScore.slice();

    if (answer === screen.question.rightAnswer.artist) {
      score.push({answerState: true, answerTime: 5});
      userNotes = screen.gameState.notes;
    } else {
      score.push({answerState: false, answerTime: 5});
      userNotes = screen.gameState.notes - 1;
    }

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
