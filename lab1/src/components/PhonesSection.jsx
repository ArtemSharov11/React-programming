import PhoneCard from './PhoneCard';

function PhonesSection({ items }) {
  return (
    <section>
      <section className="phones-header">
        <section className="phones-header__title">
          <h2 className="text-h2">
            Работает прямо в браузере смартфона
          </h2>
        </section>
        <section className="phones-header__subtitle">
          <p className="text-body-gray-30">
            Все услуги отеля доступны сразу. Гостю не нужно ничего скачивать и устанавливать на свой смартфон.
          </p>
        </section>
      </section>

      <div className="phones-slider-wrapper" style={{ position: 'relative', width: '100%' }}>
        <button id="btn-prev" className="real-arrow real-arrow-left slide-horizontal-pulse"></button>
        <button id="btn-next" className="real-arrow real-arrow-right slide-horizontal-pulse"></button>

        <section className="phones-grid" id="phones-track" aria-label="Сетка функций">
          {items.map((card) => (
            <PhoneCard 
              key={card.id}
              image={card.image}
              title={card.title}
              text={card.text}
            />
          ))}
        </section>
      </div>       
    </section>
  );
}

export default PhonesSection;