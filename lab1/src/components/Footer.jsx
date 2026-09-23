import React from 'react';
import { Link } from 'react-router-dom';

function Footer({ companyName = "Hoteza Web" }) {
  return (
    <footer className="container" style={{ marginTop: '4rem', paddingBottom: '2.5rem' }}>    
      <section className="footer-cta">
        <section className="footer-cta__content">
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

      {/* БЛОК ПО ТРЕБОВАНИЮ МЕТОДИЧКИ №2 (Контакты, О нас, Соцсети) */}
      <section 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2.5rem',
          padding: '3rem 1rem 1.5rem',
          borderBottom: '1px solid #eaeaea',
          marginTop: '2rem'
        }}
      >
        {/* О нас */}
        <div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.8rem' }}>О сервисе</h3>
          <p className="text-body-gray-30" style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>
            HOTELA — цифровая платформа гостеприимства. Полный спектр услуг отеля, заказ рум-сервиса и онлайн-оплата прямо в смартфоне гостя.
          </p>
        </div>

        {/* Быстрая навигация */}
        <div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.8rem' }}>Разделы</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li><Link to="/" style={{ textDecoration: 'none', color: '#555' }}>Главная</Link></li>
            <li><Link to="/catalog" style={{ textDecoration: 'none', color: '#555' }}>Каталог услуг</Link></li>
            <li><Link to="/cart" style={{ textDecoration: 'none', color: '#555' }}>Корзина</Link></li>
            <li><Link to="/admin" style={{ textDecoration: 'none', color: '#555' }}>Администратору</Link></li>
          </ul>
        </div>

        {/* Контакты */}
        <div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.8rem' }}>Контакты</h3>
          <p style={{ margin: '0 0 6px', color: '#555', fontSize: '0.95rem' }}>📞 +375 (29) 123-45-67</p>
          <p style={{ margin: '0 0 6px', color: '#555', fontSize: '0.95rem' }}>✉️ info@hotela.app</p>
          <p style={{ margin: 0, color: '#555', fontSize: '0.95rem' }}>📍 г. Минск, пр-т Независимости, 4</p>
        </div>

        {/* Социальные сети */}
        <div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.8rem' }}>Мы в соцсетях</h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a href="https://t.me" target="_blank" rel="noreferrer" className="cat-btn" style={{ fontSize: '0.85rem' }}>Telegram</a>
            <a href="https://vk.com" target="_blank" rel="noreferrer" className="cat-btn" style={{ fontSize: '0.85rem' }}>VKontakte</a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="cat-btn" style={{ fontSize: '0.85rem' }}>YouTube</a>
          </div>
        </div>
      </section>
      
      <p className="site-footer__copyright">
        © 2026 {companyName}. Все права защищены.
      </p>
    </footer> 
  );
}

export default Footer;