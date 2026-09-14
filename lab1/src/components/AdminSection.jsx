function AdminSection() {
  return (
    <>
      <section className="admin-section scale-up" aria-label="Админ панель">
        <section className="admin-texts" aria-label="Текст об админке">
          <h2 className="admin-title text-h2">
            Доступ ко всем заказам в ваших руках. Даже если вы не у ресепшн.
          </h2>
          <p className="admin-text text-body-gray-30">
            Единая админка позволяет управлять заказами гостей с компьютера и со смартфона. Новые уведомления приходят в Telegram-бот. Вы не пропустите их, даже если на ресепшн никого нет.
          </p>
        </section>
        <figure className="admin-image">
          <img src="img/admin-panel.png" alt="Панель администратора" className="admin-image__photo" />
        </figure>
      </section>

      <section className="phones-header">
        <section className="phones-header__title">
          <h2 className="text-h2">Адаптируется под фирменный стиль отеля</h2>
        </section>
        <section className="phones-header__subtitle">
          <p className="text-body-gray-30">
            Неограниченные возможности кастомизации и полное соответствие фирменному стилю бренда отеля
          </p>
        </section>
      </section>

      <section className="phones-showcase glow" aria-label="Витрина телефонов">
        <section className="phones-showcase__background" aria-label="Фон витрины">
          <article className="showcase-phone showcase-phone--left" aria-label="Holiday Inn">
            <img src="img/phone1.png" alt="Holiday Inn" className="showcase-phone__image" />
          </article>
          <article className="showcase-phone showcase-phone--center" aria-label="Park Inn">
            <img src="img/phone2.png" alt="Park Inn" className="showcase-phone__image" />
          </article>
          <article className="showcase-phone showcase-phone--right" aria-label="Mövenpick">
            <img src="img/phone3.png" alt="Mövenpick" className="showcase-phone__image" />
          </article>
        </section>
      </section>

      <section className="phones-header" aria-label="Заголовок секции">
        <section className="phones-header__title" aria-label="Заголовок">
          <h2 className="text-h2">Вы в компании лучших</h2>
        </section>
        <section className="phones-header__subtitle" aria-label="Подзаголовок">
          <p className="text-body-gray-30">
            Более 500 отелей по всему миру используют Hoteza
          </p>
        </section>
      </section>
      
      <section className="brands-section" aria-label="Бренды партнёры">
        <section className="brands-row brands-row--first" aria-label="Бренды ряд 1">
          <article className="brand-item shimmer"><img src="img/logo-kempinski.png" alt="Kempinski" className="brand-item__logo" /></article>
          <article className="brand-item shimmer"><img src="img/logo-rocco-forte.png" alt="Rocco Forte Hotels" className="brand-item__logo" /></article>
          <article className="brand-item shimmer"><img src="img/logo-hard-rock.png" alt="Hard Rock Hotel" className="brand-item__logo" /></article>
          <article className="brand-item shimmer"><img src="img/logo-corinthia.png" alt="Corinthia Hotels" className="brand-item__logo" /></article>
          <article className="brand-item shimmer"><img src="img/logo-ihg.png" alt="IHG" className="brand-item__logo" /></article>
        </section>
        
        <section className="brands-row brands-row--second" aria-label="Бренды ряд 2">
          <article className="brand-item shimmer"><img src="img/logo-langham.png" alt="The Langham" className="brand-item__logo" /></article>
          <article className="brand-item shimmer"><img src="img/logo-radisson.png" alt="Radisson Hotel Group" className="brand-item__logo" /></article>
          <article className="brand-item shimmer"><img src="img/logo-hilton.png" alt="Hilton" className="brand-item__logo" /></article>
          <article className="brand-item shimmer"><img src="img/logo-wyndham.png" alt="Wyndham Hotel Group" className="brand-item__logo" /></article>
          <article className="brand-item shimmer"><img src="img/logo-accor.png" alt="Accor" className="brand-item__logo" /></article>
        </section>
      </section>

      <section className="info-banner color-gradient-cycle" aria-label="Информационный баннер">
        <p className="info-banner__text text-banner">
          Легко подключим онлайн-оплату через 
          банковские карты, СБП, ApplePay и GooglePay. 
          Возможно использование существующего банковского счёта и системы фискализации.
        </p>
      </section>
    </>
  );
}

export default AdminSection;