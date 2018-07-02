import Application from '../application';
import WelcomeView from '../views/welcome-view';

export default class WelcomeScreen {
  constructor() {
    this.screen = new WelcomeView();
    this.screen.onPlayClick = () => {
      Application.showGame();
    };
  }

  get element() {
    return this.screen.element;
  }
}
