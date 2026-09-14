function Hero({ title }) {
  return (
    <section className="core-section">
      <section className="core-section__content">
        <section className="hero-text fade-in">
          <h1 className="hero-text__title">
            {title}
          </h1>
        </section>
        
        <aside className="qr-code">
          <img src="img/qr-code.png" alt="QR-код" className="qr-code__image" />
          <section className="qr-code__text">
            <p className="qr-code__title">Попробуйте демо</p>
            <p className="qr-code__description">
              Наведите камеру <br />смартфона на QR-код
            </p>
            <img src="img/smile-icon.png" alt="Смайлик" className="qr-code__smile bounce" />
          </section>
        </aside>
      </section>
    </section>
  );
}

export default Hero;