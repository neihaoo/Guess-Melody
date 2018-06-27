import {changeScreen} from './utils';
import {adaptServerData} from './data/data-adapter';
import WelcomeScreen from './screens/welcome-screen';
import GameScreen from './screens/game-screen';
import GameModel from './data/game-model';
import ErrorView from './views/error-view';

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

let questions;

export default class Application {

  static launch() {
    Application.showWelcome();
    window.fetch(`https://es.dump.academy/guess-melody/questions`)
      .then(checkStatus)
      .then((response) => response.json())
      .then((data) => adaptServerData(data))
      .then((data) => Application.startGame(data))
      .catch(Application.showError);
  }

  static showWelcome() {
    const welcomeScreen = new WelcomeScreen();
    changeScreen(welcomeScreen.element);

    return welcomeScreen;
  }

  static showGame() {
    const gameScreen = new GameScreen(new GameModel(questions));
    changeScreen(gameScreen.element);
    gameScreen.startGame();
  }

  static showResult(result) {
    result.onReplayClick = () => {
      this.showGame();
    };
    changeScreen(result.element);
  }

  static showError(error) {
    const errorView = new ErrorView(error);
    changeScreen(errorView.element);
  }

  static startGame(data) {
    questions = data;
    Application.showWelcome().screen.play();
  }
}
