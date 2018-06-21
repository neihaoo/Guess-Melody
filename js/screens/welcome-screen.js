import {changeScreen} from '../utils';
import getScreen from '../game/get-screen';
import {INITIAL_STATE} from '../data/game-data';
import WelcomeView from '../views/welcome-view';

export default () => {
  const screen = new WelcomeView();

  screen.onPlayClick = () => {
    changeScreen(getScreen(INITIAL_STATE));
  };

  return screen.element;
};
