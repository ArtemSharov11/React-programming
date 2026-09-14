function ReviewsSection() {
  return (
    <>
      <section className="reviews-section" aria-label="Отзывы отелей">
        <section className="reviews-section__header">
          <h2 className="reviews-section__title text-h2">Что говорят отели</h2>
        </section>
      </section>

      <section className="reviews-section" aria-label="Отзывы отелей">
        <div className="reviews-slider-wrapper" style={{ position: 'relative', width: '100%' }}>
          <button id="reviews-prev" className="real-arrow real-arrow-left"></button>
          <button id="reviews-next" className="real-arrow real-arrow-right"></button>

          <section id="reviews-track" style={{ display: 'flex', overflowX: 'auto', scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}>
            <article className="review-card" style={{ flex: '0 0 100%', scrollSnapAlign: 'center' }}>
              <figure className="review-card__photo">
                <img src="img/caroline-rowe.png" alt="Caroline Rowe" className="review-card__image" />
              </figure>
              <section className="review-card__content">
                <p className="review-card__text text-banner">
                  Мы очень рады внедрению Hoteza. Это решение даёт нам множество возможностей радовать наших гостей и дарить им незабываемые впечатления.
                </p>
                <section className="review-card__author">
                  <p className="review-card__name">Caroline Rowe</p>
                  <p className="review-card__position text-body-gray-30">Директор по маркетингу и коммуникациям, Media One Hotel Dubai</p>
                </section>
              </section>
            </article>

            <article className="review-card" style={{ flex: '0 0 100%', scrollSnapAlign: 'center' }}>
              <figure className="review-card__photo">
                <img src="img/vasja-cretnik.png" alt="Vasja Čretnik" className="review-card__image" />
              </figure>
              <section className="review-card__content">
                <p className="review-card__text text-banner">
                  Внедрение системы Hoteza позволило нам расширить границы внутреннего маркетинга — выросло число посещений мероприятий и объемы внутренних продаж.
                </p>
                <section className="review-card__author">
                  <p className="review-card__name">Vasja Čretnik</p>
                  <p className="review-card__position text-body-gray-30">Менеджер по маркетингу и продажам Terme Olimia & Terme Tuhelj</p>
                </section>
              </section>
            </article>

            <article className="review-card" style={{ flex: '0 0 100%', scrollSnapAlign: 'center' }}>
              <figure className="review-card__photo">
                <img src="img/elshan-babayev.png" alt="Эльшан Бабаев" className="review-card__image" />
              </figure>
              <section className="review-card__content">
                <p className="review-card__text text-banner">
                  Мы получили действительно высококлассную систему, которая позволяет оставаться в постоянном контакте с нашими гостями.
                </p>
                <section className="review-card__author">
                  <p className="review-card__name">Эльшан Бабаев</p>
                  <p className="review-card__position text-body-gray-30">Генеральный директор официальной гостиницы государственного музея «Эрмитаж»</p>
                </section>
              </section>
            </article>
          </section>
        </div>
      </section>

      <section className="phones-header" aria-label="Заголовок секции">
        <section className="phones-header__title" aria-label="Заголовок">
          <h2 className="text-h2">Что говорят гости отелей</h2>                
        </section>
      </section>

      <section className="reviews-grid-section" aria-label="Отзывы гостей">
        <div style={{ position: 'relative', width: '100%' }}>
          <button id="reviews2-prev" className="real-arrow real-arrow-left"></button>
          <button id="reviews2-next" className="real-arrow real-arrow-right"></button>

          <div id="reviews-track2">
            <article className="review-block review-block--emilly">
              <header className="review-block__header">
                <figure className="review-block__photo"><img src="img/emilly-barrett.png" alt="Emilly" className="review-block__image" /></figure>
                <section className="review-block__info"><p className="review-block__name">Emilly Barrett</p><img src="img/booking-logo.png" alt="Booking" className="review-block__source" /></section>
              </header>
              <p className="review-block__text text-body-30">Я вегетарианка. Мне понравилось, что можно ознакомиться и заказать всё через смартфон.</p>
            </article>

            <article className="review-block review-block--christopher">
              <header className="review-block__header">
                <figure className="review-block__photo"><img src="img/christopher-doyle.png" alt="Christopher" className="review-block__image" /></figure>
                <section className="review-block__info"><p className="review-block__name">Christopher Doyle</p><img src="img/tripadvisor-logo.png" alt="TripAdvisor" className="review-block__source" /></section>
              </header>
              <p className="review-block__text text-body-30">Спасибо, что теперь совсем не нужно общаться с людьми! Во время командировок это спасает.</p>
            </article>

            <article className="review-block review-block--margaret">
              <header className="review-block__header">
                <figure className="review-block__photo"><img src="img/margaret-sims.png" alt="Margaret" className="review-block__image" /></figure>
                <section className="review-block__info"><p className="review-block__name">Margaret Sims</p><img src="img/booking-logo.png" alt="Booking" className="review-block__source" /></section>
              </header>
              <p className="review-block__text text-body-30">Пользовалась услугами доставки в номер и оплачивала через ApplePay. Очень удобно.</p>
            </article>

            <article className="review-block review-block--clare">
              <header className="review-block__header">
                <figure className="review-block__photo"><img src="img/clare-hamilton.png" alt="Clare" className="review-block__image" /></figure>
                <section className="review-block__info"><p className="review-block__name">Clare Hamilton</p><img src="img/tripadvisor-logo.png" alt="TripAdvisor" className="review-block__source" /></section>
              </header>
              <p className="review-block__text text-body-30">Все мои прихоти выполняли как по велению волшебной палочки. Хочу ещё!</p>
            </article>

            <article className="review-block review-block--thomas">
              <header className="review-block__header">
                <figure className="review-block__photo"><img src="img/thomas-fletcher.png" alt="Thomas" className="review-block__image" /></figure>
                <section className="review-block__info"><p className="review-block__name">Thomas Fletcher</p><img src="img/tripadvisor-logo.png" alt="TripAdvisor" className="review-block__source" /></section>
              </header>
              <p className="review-block__text text-body-30">Очень классно, когда сайт удобный и не нужно никуда звонить, чтобы записаться в SPA.</p>
            </article>

            <article className="review-block review-block--benedict">
              <header className="review-block__header">
                <figure className="review-block__photo"><img src="img/benedict-french.png" alt="Benedict" className="review-block__image" /></figure>
                <section className="review-block__info"><p className="review-block__name">Benedict French</p><img src="img/booking-logo.png" alt="Booking" className="review-block__source" /></section>
              </header>
              <p className="review-block__text text-body-30">Отсканировал QR-код и заказывал еду прямо к бассейну. Супер сервис!</p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}

export default ReviewsSection;