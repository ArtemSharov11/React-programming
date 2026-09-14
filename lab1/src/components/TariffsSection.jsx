function TariffsSection() {
  return (
    <>
      <section className="phones-header" aria-label="Заголовок секции">
        <section className="phones-header__title" aria-label="Заголовок">
          <h2 className="text-h2">Платите только за то, что вам нужно</h2>                
        </section>
      </section>

      <section className="pricing-section">
        <nav className="pricing-nav">
          <ul className="toggle-list">
            <li className="toggle-item text-pricing-nav">
              Раз в год
              <hr className="active-underline" />
            </li>
            <li className="toggle-item secondary text-pricing-nav" style={{ color: '#808080' }}>
              Каждый месяц
            </li>
          </ul>
        </nav>

        <aside className="pricing-info">
          <p className="text-pricing-descr">
            Единоразово оплачивается подключение и наполнение контентом вашего отеля — $900
          </p>
        </aside>
      </section>

      <section className="tariffs-section" aria-label="Тарифы">
        <div className="tariffs-slider-wrapper" style={{ position: 'relative' }}>
          <button id="tariffs-prev" className="real-arrow real-arrow-left"></button>
          <button id="tariffs-next" className="real-arrow real-arrow-right"></button>

          <section className="tariffs-grid" id="tariffs-track" aria-label="Сетка тарифов">
            <article className="tariff-card tariff-card--basic shake" aria-labelledby="tariff-basic-title">
              <header className="tariff-card__header">
                <h3 id="tariff-basic-title" className="tariff-card__title text-body-41">Тариф Basic</h3>
                <p className="tariff-card__subtitle text-body-gray-30">Электронная брошюра услуг</p>
              </header>
              <ul className="tariff-card__list" aria-label="Список услуг">
                <li className="tariff-card__item text-body-gray-30">Система управления веб-приложением</li>
                <li className="tariff-card__item text-body-gray-30">QR-код гостям для быстрого доступа</li>
                <li className="tariff-card__item text-body-gray-30">Брендинг приложения</li>
                <li className="tariff-card__item text-body-gray-30">Информационные страницы</li>
                <li className="tariff-card__item text-body-gray-30">Многоязычная поддержка</li>
                <li className="tariff-card__item text-body-gray-30">Меню ресторанов</li>
                <li className="tariff-card__item text-body-gray-30">Фотогалерея</li>
              </ul>
              <footer className="tariff-card__footer" aria-label="Цена">
                <section className="tariff-card__price-large">
                  <span className="tariff-card__price text-price-large">$85</span>
                </section>
                <section className="tariff-card__price-info">
                  <span className="tariff-card__price-old text-price-old">$99</span>
                  <span className="tariff-card__period text-body-gray-30">/месяц</span>
                </section>
              </footer>
            </article>

            <article className="tariff-card tariff-card--pro">
              <header className="tariff-card__header">  
                <h3 id="tariff-pro-title" className="tariff-card__title text-body-41">Тариф Pro</h3>
                <p className="tariff-card__subtitle text-body-gray-30">Приём заказов, персонализация, общение с гостем</p>
              </header>
              <p className="tariff-card__accent">Всё из тарифа Basic, а также:</p>
              <ul className="tariff-card__list" aria-label="Список услуг">
                <li className="tariff-card__item text-body-gray-30">Письмо гостю с QR-кодом</li>
                <li className="tariff-card__item text-body-gray-30">Заказ еды в номер</li>
                <li className="tariff-card__item text-body-gray-30">Бронирование ресторанов и спа</li>
                <li className="tariff-card__item text-body-gray-30">Заказ гостиничных услуг</li>
                <li className="tariff-card__item text-body-gray-30">Telegram-бот для персонала</li>
                <li className="tariff-card__item text-body-gray-30">Профиль гостя</li>
                <li className="tariff-card__item text-body-gray-30">Переписка с гостями</li>
                <li className="tariff-card__item text-body-gray-30">Просмотр счёта</li>
                <li className="tariff-card__item text-body-gray-30">Экспресс check-out</li>
                <li className="tariff-card__item text-body-gray-30">Обратная связь от гостей</li>
                <li className="tariff-card__item text-body-gray-30">Маркетинг-модуль</li>
                <li className="tariff-card__item text-body-gray-30">Модуль статистики</li>
              </ul>
              <footer className="tariff-card__footer" aria-label="Цена">
                <section className="tariff-card__price-large">
                  <span className="tariff-card__price text-price-large">$209</span>
                </section>
                <section className="tariff-card__price-info">
                  <span className="tariff-card__price-old text-price-old">$249</span>
                  <span className="tariff-card__period text-body-gray-30">/месяц</span>
                </section>
              </footer>
            </article>

            <article className="tariff-card tariff-card--addons">
              <header className="tariff-card__header tariff-card__header--inverse"> 
                <h3 id="tariff-addons-title" className="tariff-card__title tariff-card__title--inverse text-body-41">
                  Add-ons
                  <img src="img/lightning-icon.png" alt="" className="tariff-card__icon" />
                </h3>
                <p className="tariff-card__subtitle tariff-card__subtitle--inverse">Расширение возможностей Pro-версии за счёт дополнительных интеграций</p>
              </header>
              <ul className="tariff-card__list">
                <li className="tariff-card__item">Интеграция с PMS (рекомендуется)</li>
                <li className="tariff-card__item">Мобильный ТВ-пульт</li>
                <li className="tariff-card__item">Интеграция с POS и SOS системами</li>
                <li className="tariff-card__item">Интеграция с GRMS и управление оборудованием номера</li>
                <li className="tariff-card__item">Интеграция с платёжным шлюзом для приёма онлайн-оплат</li>
              </ul>
              <footer className="tariff-card__footer tariff-card__footer--inverse" aria-label="Цена">
                <section className="tariff-card__price-large">
                  <span className="tariff-card__price text-price-large-inverse">По запросу</span>
                </section>
              </footer>
            </article>
          </section>
        </div>
      </section>
    </>
  );
}

export default TariffsSection;