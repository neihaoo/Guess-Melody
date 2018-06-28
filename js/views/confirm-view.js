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

  showModal() {
    body.appendChild(this.element);
  }

  closeModal() {
    body.removeChild(body.lastElementChild);
  }

  onConfirmClick() {}

  onCloseClick() {}

  bind() {
    this.element.querySelector(`.modal-confirm__close`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        evt.stopPropagation();

        this.onCloseClick();
      });

    this.element.querySelector(`.modal-confirm__btn-wrap`).addEventListener(`click`, (evt) => {
      switch (evt.target.textContent) {
        case `Ок`:
          evt.preventDefault();
          evt.stopPropagation();

          this.onConfirmClick();

          break;
        case `Отмена`:
          evt.preventDefault();
          evt.stopPropagation();

          this.onCloseClick();

          break;
        default:
          break;
      }
    });
  }
}
