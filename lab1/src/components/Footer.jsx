function Footer({ companyName = "HOTELA" }) {
  return (
    <footer className="container">    
      <section className="footer-cta">
        <section className="footer-cta__content">
          {}
          <img 
            src="/img/lightning-icon.png" 
            alt="" 
            className="footer-cta__icon rotate" 
            aria-hidden="true" 
          />
              
          <h2 className="footer-cta__title">
            Начните <br />
            эффективно продавать <br />
            услуги отеля онлайн
          </h2>
              
          <p className="footer-cta__description text-body-gray-30">
            {companyName} поможет оптимизировать работу ресепшн, увеличить средний чек и подарить вашим гостям ещё больше комфорта.
          </p>
              
          <button 
            type="button" 
            className="footer-cta__button pulse-scale"
            onClick={() => alert("Спасибо за интерес! Скоро мы свяжемся с вами.")}
          >
            Подключиться сейчас
          </button>
        </section>
      </section>
      
      <p className="site-footer__copyright">
        © 2026 {companyName}. Все права защищены.
      </p>
    </footer> 
  );
}

export default Footer;