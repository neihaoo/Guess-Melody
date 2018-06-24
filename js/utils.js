const mainSection = document.querySelector(`.main`);

export const getSection = (template) => new DOMParser()
  .parseFromString(template.trim(), `text/html`).body.firstElementChild;

export const changeScreen = (screen) => {
  mainSection.textContent = ``;
  mainSection.appendChild(screen);
};

export const splitTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = `${Math.floor(time % 60) < 10 ? `0` : ``}${Math.floor(time % 60)}`;

  return {minutes, seconds};
};

export const getWordForm = (num, wordForm) => {
  if ((num > 10 && num <= 20) || num % 10 > 4 || num % 10 === 0) {
    return wordForm[0];
  }

  if (num % 10 === 1) {
    return wordForm[1];
  }

  return wordForm[2];
};
