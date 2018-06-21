import {changeScreen} from '../utils';
import welcomeScreen from '../screens/welcome-screen';
import LoseView from '../views/lose-view';

export default (data) => {
  const screen = new LoseView(data);

  screen.onReplayClick = () => {
    changeScreen(welcomeScreen());
  };

  return screen.element;
};

