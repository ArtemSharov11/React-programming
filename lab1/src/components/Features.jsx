function Features() {
  return (
    <section className="features-section" aria-label="Преимущества">
      <section className="features-grid features-grid--2-cols" aria-label="Список преимуществ">
        <article className="features-card slide-in-x">
          <img src="img/icon-covid.png" alt="" className="features-card__icon" />
          <h3 className="features-card__title text-h2">Действенная мера против COVID-19</h3>
          <p className="features-card__text text-body-gray-30">
            Hoteza Web делает пребывание в отеле безопаснее, минимизируя встречи персонала и гостей лицом к лицу. Все вопросы теперь можно решить в браузере смартфона.
          </p>
        </article>

        <article className="features-card slide-in-x">
          <img src="img/icon-integration.png" alt="" className="features-card__icon" />
          <h3 className="features-card__title text-h2">Интеграция с PMS, POS, SOS, GRMS</h3>
          <p className="features-card__text text-body-gray-30">
            Синхронизация с профилем гостя в PMS, персональные ссылки и постинг на счёт гостя, лёгкая интеграция с существующими процессами исполнения заказов, управление номером и другое.
          </p>
        </article>
      </section>
    </section>
  );
}

export default Features;