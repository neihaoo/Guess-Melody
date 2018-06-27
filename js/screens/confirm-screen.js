export default () => `
  <section class="modal-confirm modal-confirm__wrap modal-confirm__wrap--hidden">
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
