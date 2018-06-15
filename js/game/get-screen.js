import genreScreen from '../screens/genre-screen';
import artistScreen from '../screens/artist-screen';
import loseScreen from '../screens/lose-screen';
import winScreen from '../screens/win-screen';

export default (gameState) => {
  const question = gameState.questions[gameState.currentQuestion];
  let screen;

  if (gameState.notes < 0 || gameState.time < 0) {
    screen = loseScreen(gameState);
  } else if (gameState.currentQuestion === gameState.questions.length) {
    screen = winScreen(gameState);
    return screen;
  } else if (question.type === `artist`) {
    screen = artistScreen(gameState);
  } else if (question.type === `genre`) {
    screen = genreScreen(gameState);
  }

  return screen;
};
