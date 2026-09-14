function ContentPromotion() {
  return (
    <>
      <section className="phones-info fade-out">
        <p className="phones-info__text text-h2">
          Услуги отеля, заказ еды в номер, бронирование спа и ресторанов, управление номером — всё это доступно гостю в браузере его смартфона
        </p>
      </section>

      <section className="phones-header" aria-label="Заголовок секции">
        <section className="phones-header__title" aria-label="Заголовок">
          <h2 className="text-h2">Поможем в продвижении приложения</h2>
        </section>
        <section className="phones-header__subtitle" aria-label="Подзаголовок">
          <p className="text-body-gray-30">
            Ваши гости могут получить доступ к веб‑приложению следующими способами
          </p>
        </section>
      </section>

      <section className="content-cards-section" aria-label="Карточки контента">
        <div className="content-slider-wrapper" style={{ position: 'relative', width: '100%' }}>
          <button id="content-prev" className="real-arrow real-arrow-left"></button>
          <button id="content-next" className="real-arrow real-arrow-right"></button>

          <section className="content-cards-grid" id="content-cards-grid" aria-label="Сетка контента">
            <article className="content-card slide-in-y">
              <figure className="content-card__image-wrapper">
                <img src="img/print-materials.png" alt="Печатные материалы" className="content-card__image" />
              </figure>
              <h3 className="content-card__title text-body-41">Печатные материалы</h3>
              <p className="content-card__text text-body-gray-30">
                QR-коды можно разместить на печатных и электронных носителях в любом месте отеля. Например, на стойке регистрации, в лифте, в номерах или на пластиковых ключах.
              </p>
            </article>

            <article className="content-card slide-in-y">
              <figure className="content-card__image-wrapper">
                <img src="img/guest-letter.png" alt="Письмо гостю" className="content-card__image" />
              </figure>
              <h3 className="content-card__title text-body-41">Письмо гостю</h3>
              <p className="content-card__text text-body-gray-30">
                Приветственное письмо с персональной ссылкой и приглашением. Гостю не придётся вводить номер комнаты и фамилию — вся информация о нём уже будет в системе.
              </p>
            </article>

            <article className="content-card slide-in-y">
              <figure className="content-card__image-wrapper">
                <img src="img/tv-in-room.png" alt="ТВ в номере" className="content-card__image" />
              </figure>
              <h3 className="content-card__title text-body-41">ТВ в номере</h3>
              <p className="content-card__text text-body-gray-30">
                Персональный QR-код появится на экране телевизора. На него нужно просто навести камеру телефона и гостю не придётся вводить номер комнаты и фамилию — вся информация о нём уже будет в системе.
              </p>
            </article>

            <article className="content-card slide-in-y">
              <figure className="content-card__image-wrapper">
                <img src="img/after-internet.png" alt="После подключения интернета" className="content-card__image" />
              </figure>
              <h3 className="content-card__title text-body-41">После подключения интернета</h3>
              <p className="content-card__text text-body-gray-30">
                После успешного подключения к Wi-Fi отеля гость увидит приглашение перейти в приложение.
              </p>
            </article>
          </section>
        </div>
      </section>

      <section className="info-banner color-gradient-cycle">
        <p className="info-banner__text text-banner">
          Мы поможем настроить каналы продвижения вашего
          веб-приложения, которые действительно работают!
          Подключим PMS, подготовим приветственный e-mail и
          печатные материалы, перенаправим гостей со
          страницы подключения Wi-Fi.
        </p>
      </section>
    </>
  );
}

export default ContentPromotion;