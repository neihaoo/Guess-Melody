import {changeScreen} from '../utils';
import welcomeScreen from './welcome-screen';
import WinView from '../views/win-view';

export default (data) => {
  const screen = new WinView(data);

  screen.onReplayClick = () => {
    changeScreen(welcomeScreen());
  };

  return screen.element;
};
