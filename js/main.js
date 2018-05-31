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

  const getCurrentScreenId = () => {
    let currentScreenId = 0;

    for (let i = 0; i < templates.length; i++) {
      if (mainSection.firstChild.isEqualNode(templates[i])) {
        currentScreenId = i;

        break;
      }
    }

    return currentScreenId;
  };

  const changeScreen = (screenId) => {
    if (screenId < 0) {
      screenId = 0;
    }

    if (screenId > templates.length - 1) {
      screenId = templates.length - 1;
    }

    mainSection.textContent = ``;
    mainSection.appendChild(templates[screenId].cloneNode(true));
    mainSection.insertAdjacentHTML(`beforeend`, arrowsElements);
  };

  const showPreviousScreen = () => {
    changeScreen(getCurrentScreenId() - 1);
  };

  const showNextScreen = () => {
    changeScreen(getCurrentScreenId() + 1);
  };

  const onArrowKeyPress = (evt) => {
    if (evt.keyCode === KeyCode.LEFT_ARROW || evt.target.textContent === `<-`) {
      showPreviousScreen();
    }

    if (evt.keyCode === KeyCode.RIGHT_ARROW || evt.target.textContent === `->`) {
      showNextScreen();
    }
  };

  const renderMainScreen = () => {
    mainSection.appendChild(templates[0].cloneNode(true));
    mainSection.insertAdjacentHTML(`beforeend`, arrowsElements);
  };

  document.addEventListener(`keydown`, onArrowKeyPress);
  mainSection.addEventListener(`click`, onArrowKeyPress);

  renderMainScreen();
})();
