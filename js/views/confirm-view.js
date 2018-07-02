import AbstractView from './abstract-view';

const body = document.querySelector(`body`);

export default class ConfirmView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
      <section class="modal-confirm modal-confirm__wrap">
        <form class="modal-confirm__inner">
          <button class="modal-confirm__close" type="button">Закрыть</button>
          <h2 class="modal-confirm__title">Подтверждение</h2>
          <p class="modal-confirm__text">Вы уверены что хотите начать игру заново?</p>
          <div class="modal-confirm__btn-wrap">
            <button class="modal-confirm__btn">Ок</button>
            <button class="modal-confirm__btn">Отмена</button>
          </div>
        </form>
      </section>
    `;
  }

  bind() {
    const modalButtons = Array.from(this.element.querySelectorAll(`.modal-confirm__btn`));
    const confirmButton = modalButtons.find((el) => el.textContent === `Ок`);
    const cancelButton = modalButtons.find((el) => el.textContent === `Отмена`);
    const closeButton = this.element.querySelector(`.modal-confirm__close`);

    confirmButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      evt.stopPropagation();

      this.onConfirmClick();
    });

    cancelButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      evt.stopPropagation();

      this.onCloseClick();
    });

    closeButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      evt.stopPropagation();

      this.onCloseClick();
    });
  }

  showModal() {
    body.appendChild(this.element);
  }

  onConfirmClick() {}

  onCloseClick() {}

  static closeModal() {
    body.removeChild(body.lastElementChild);
  }
}
