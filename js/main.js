'use strict';

(() => {
  const KeyCode = {
    LEFT_ARROW: 37,
    RIGHT_ARROW: 39
  };

  const arrowsElements = `
  <div class="arrows__wrap">
    <style>
      .arrows__wrap {
        position: absolute;
        top: 135px;
        left: 50%;
        margin-left: -56px;
      }
      .arrows__btn {
        background: none;
        border: 2px solid black;
        padding: 5px 20px;
      }
    </style>
    <button class="arrows__btn"><-</button>
    <button class="arrows__btn">-></button>
  </div>
`;

  const mainSection = document.querySelector(`.main`);
  const templates = document.querySelector(`#templates`).content.children;

  const onArrowKeyPress = (evt) => {
    if (evt.keyCode === KeyCode.LEFT_ARROW || evt.target.textContent === `<-`) {
      changeScreen(getCurrentScreen() - 1);
    }

    if (evt.keyCode === KeyCode.RIGHT_ARROW || evt.target.textContent === `->`) {
      changeScreen(getCurrentScreen() + 1);
    }
  };

  const getCurrentScreen = () => {
    let currentScreen = 0;

    for (let i = 0; i < templates.length; i++) {
      if (mainSection.firstChild.isEqualNode(templates[i])) {
        currentScreen = i;

        break;
      }
    }

    return currentScreen;
  };

  const changeScreen = (screen) => {
    if (screen < 0) {
      screen = 0;
    }

    if (screen > templates.length - 1) {
      screen = templates.length - 1;
    }

    mainSection.textContent = ``;
    mainSection.appendChild(templates[screen].cloneNode(true));
    mainSection.insertAdjacentHTML(`beforeend`, arrowsElements);
  };

  const renderMainScreen = () => {
    mainSection.appendChild(templates[0].cloneNode(true));
    mainSection.insertAdjacentHTML(`beforeend`, arrowsElements);
  };

  document.addEventListener(`keydown`, onArrowKeyPress);
  document.addEventListener(`keydown`, onArrowKeyPress);
  mainSection.addEventListener(`click`, onArrowKeyPress);

  renderMainScreen();
})();
