import {changeScreen} from './utils';
import WelcomeScreen from './screens/welcome-screen';
import GameScreen from './screens/game-screen';
import GameModel from './game-model';

export default class Application {

  static showWelcome() {
    const welcomeScreen = new WelcomeScreen();
    changeScreen(welcomeScreen.element);
  }

  static showGame() {
    const gameScreen = new GameScreen(new GameModel());
    changeScreen(gameScreen.element);
    gameScreen.startGame();
  }

  static showResult(result) {
    result.onReplayClick = () => {
      this.showGame();
    };
    changeScreen(result.element);
  }
}
