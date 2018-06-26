import WelcomeView from '../views/welcome-view';
import Application from '../application';

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
