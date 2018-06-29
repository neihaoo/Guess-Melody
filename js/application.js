import {changeScreen} from './utils';
import Loader from './loader';
import WelcomeScreen from './screens/welcome-screen';
import GameScreen from './screens/game-screen';
import GameModel from './data/game-model';
import ErrorView from './views/error-view';
import {INITIAL_STATE} from './data/game-data';

export default class Application {

  static launch() {
    Application.showWelcome();
    Loader.loadData()
      .then((data) => Application.startGame(data))
      .catch(Application.showError);
  }

  static showWelcome() {
    const welcomeScreen = new WelcomeScreen();
    changeScreen(welcomeScreen.element);

    return welcomeScreen;
  }

  static showGame() {
    const gameScreen = new GameScreen(new GameModel());
    changeScreen(gameScreen.element);
    gameScreen.startGame();
  }

  static showResult(result) {
    result.onReplayClick = () => {
      Application.showGame();
    };

    if (result.userResult.notes > 0 && result.userResult.time > 0) {
      Loader.loadResults()
        .then(changeScreen(result.element))
        .then((data) => result.showStats(data))
        .then(Loader.saveResults(result.userResult))
        .catch(Application.showError);
    } else {
      changeScreen(result.element);
    }
  }

  static showError(error) {
    const errorView = new ErrorView(error);
    errorView.showModal();
  }

  static startGame(data) {
    INITIAL_STATE.questions.length = 0;
    data.forEach((el) => INITIAL_STATE.questions.push(el));
    Application.showWelcome().screen.play();
  }
}
