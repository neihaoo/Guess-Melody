import AbstractView from './abstract-view';

export default class ErrorView extends AbstractView {
  constructor(error) {
    super();

    this.error = error;
  }

  get template() {
    const errorMessage = this.error.message === undefined ? `` :
      `Статус: ${this.error.message}. `;

    return `
      <section class="modal-error modal-error__wrap">
        <div class="modal-error__inner">
          <h2 class="modal-error__title">Произошла ошибка!</h2>
          <p class="modal-error__text">${errorMessage}Пожалуйста, перезагрузите страницу.</p>
        </div>
      </section>
    `;
  }

  showModal() {
    document.querySelector(`body`).appendChild(this.element);
  }
}
