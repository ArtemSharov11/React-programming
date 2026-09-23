import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false); // Выпадающий список профиля

  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const toggleLang = (lang) => {
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  }, [location]);

  return (
    <>
      <header className="header">
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/img/Frame.svg" alt="Logo" className="logo" />
        </Link>

        <div className="header-controls">
          <div className="settings-bar">
            {/* Языки */}
            <div className="lang-switch">
              <button
                type="button"
                className={`lang-btn ${i18n.language === 'ru' ? 'active' : ''}`}
                onClick={() => toggleLang('ru')}
              >
                RU
              </button>
              <button
                type="button"
                className={`lang-btn ${i18n.language === 'en' ? 'active' : ''}`}
                onClick={() => toggleLang('en')}
              >
                EN
              </button>
            </div>

            {/* Навигация */}
            <nav style={{ display: 'flex', gap: '15px', alignItems: 'center', marginLeft: '10px' }}>
              <Link to="/catalog" style={{ textDecoration: 'none', color: '#000', fontWeight: '500' }}>
                Каталог
              </Link>
              <Link
                to="/cart"
                style={{ textDecoration: 'none', color: '#000', fontWeight: '500', display: 'flex', alignItems: 'center' }}
              >
                Корзина
                <span className="interactive-counter">{cartCount}</span>
              </Link>
              <Link to="/admin" className="cat-btn" style={{ fontSize: '0.85rem' }}>
                Админка
              </Link>
            </nav>

            {/* БЛОК ПРОФИЛЯ ПО ПУНКТУ 1.3 МЕТОДИЧКИ №2 */}
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                className="user-avatar-btn"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#f1f1f1',
                  border: '1px solid #ddd',
                  borderRadius: '20px',
                  padding: '6px 14px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                <span>👤</span> Гость (№101) ▾
              </button>

              {isProfileOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '120%',
                    right: 0,
                    background: '#fff',
                    borderRadius: '12px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                    padding: '12px',
                    minWidth: '200px',
                    zIndex: 2500,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}
                >
                  <p style={{ margin: 0, fontWeight: '600', fontSize: '0.95rem' }}>Шаров Артем</p>
                  <span style={{ fontSize: '0.8rem', color: '#777' }}>Номер: Deluxe 1</span>
                  <hr style={{ margin: '4px 0', border: 'none', borderTop: '1px solid #eee' }} />
                  <Link to="/cart" onClick={() => setIsProfileOpen(false)} style={{ textDecoration: 'none', color: '#000', fontSize: '0.9rem' }}>
                    📦 Мои заказы ({cartCount})
                  </Link>
                  <Link to="/admin" onClick={() => setIsProfileOpen(false)} style={{ textDecoration: 'none', color: '#000', fontSize: '0.9rem' }}>
                    ⚙️ Панель управления
                  </Link>
                  <button
                    type="button"
                    onClick={() => { alert('Вы вышли из профиля'); setIsProfileOpen(false); }}
                    className="btn-logout"
                    style={{
                      background: '#fff0f0',
                      color: '#d32020',
                      border: '1px solid #ffcccc',
                      borderRadius: '8px',
                      padding: '6px',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      marginTop: '4px'
                    }}
                  >
                    Выйти
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Бургер-кнопка */}
          <button
            type="button"
            className={`burger-menu blur-effect ${isMenuOpen ? 'is-active' : ''}`}
            id="burgerToggle"
            aria-label="Меню"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Выдвижное меню */}
      <div className={`side-menu ${isMenuOpen ? 'is-open' : ''}`} id="sideMenu">
        <nav className="side-menu__nav">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Главная</Link>
          <a href="/#tariffs" onClick={() => setIsMenuOpen(false)}>Тарифы</a>
          <a href="/#reviews" onClick={() => setIsMenuOpen(false)}>Отзывы</a>
          <Link to="/catalog" onClick={() => setIsMenuOpen(false)} style={{ color: '#6aad00' }}>Каталог услуг</Link>
          <Link to="/cart" onClick={() => setIsMenuOpen(false)}>Корзина ({cartCount})</Link>
          <Link to="/admin" onClick={() => setIsMenuOpen(false)}>Админ-панель</Link>
        </nav>
      </div>

      <div
        className={`overlay ${isMenuOpen ? 'is-active' : ''}`}
        id="overlay"
        onClick={() => setIsMenuOpen(false)}
      ></div>
    </>
  );
}