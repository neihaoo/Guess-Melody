const mainSection = document.querySelector(`.main`);

export const getSection = (template) => new DOMParser()
  .parseFromString(template.trim(), `text/html`).body.firstElementChild;

export const changeScreen = (screen) => {
  mainSection.textContent = ``;
  mainSection.appendChild(screen);
};
