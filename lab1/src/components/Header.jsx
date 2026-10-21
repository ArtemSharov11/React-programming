import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';

export default function Header() {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

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

            <nav style={{ display: 'flex', gap: '15px', alignItems: 'center', marginLeft: '10px' }}>
              <Link to="/catalog" style={{ textDecoration: 'none', color: '#000', fontWeight: '500' }}>
                {t('nav-catalog')}
              </Link>
              <Link
                to="/cart"
                style={{ textDecoration: 'none', color: '#000', fontWeight: '500', display: 'flex', alignItems: 'center' }}
              >
                <Badge 
                  badgeContent={cartCount} 
                  color="success" 
                  showZero
                  sx={{
                    '& .MuiBadge-badge': {
                      right: -4,
                      top: 7      
                    }
                  }}
                >
                  <span style={{ paddingRight: '8px' }}>{t('nav-cart')}</span>
                </Badge>
              </Link>
              <Link to="/admin" className="cat-btn" style={{ fontSize: '0.85rem' }}>
                {t('nav-admin')}
              </Link>
            </nav>

            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Tooltip title="Личный кабинет гостя" arrow placement="bottom">
                <span style={{ display: 'inline-flex' }}>
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
                    <Avatar sx={{ width: 24, height: 24, fontSize: '0.8rem', bgcolor: '#6aad00' }}>
                      Г
                    </Avatar>
                    Гость (№101) ▾
                  </button>
                </span>
              </Tooltip>

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
                    Мои заказы ({cartCount})
                  </Link>
                  <Link to="/admin" onClick={() => setIsProfileOpen(false)} style={{ textDecoration: 'none', color: '#000', fontSize: '0.9rem' }}>
                    Панель управления
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

          <button
            type="button"
            className="burger-menu blur-effect"
            id="burgerToggle"
            aria-label="Меню"
            onClick={() => setIsMenuOpen(true)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <Drawer
        anchor="right"
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: '460px !important',
            maxWidth: '90vw',
            boxSizing: 'border-box',
            padding: '32px 28px',
            backgroundColor: '#ffffff'
          }
        }}
        slotProps={{
          backdrop: {
            sx: {
              backdropFilter: 'blur(5px)',
              backgroundColor: 'rgba(0,0,0,0.45)'
            }
          }
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <span style={{ fontWeight: 800, fontSize: '1.5rem', color: '#111' }}>Меню отеля</span>
          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            style={{
              width: '40px',
              height: '40px',
              border: 'none',
              borderRadius: '50%',
              backgroundColor: '#f5f5f5',
              cursor: 'pointer',
              fontSize: '1.3rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#e0e0e0'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#f5f5f5'}
          >
            ✕
          </button>
        </div>

        <Divider sx={{ mb: 3 }} />

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Link 
            to="/" 
            onClick={() => setIsMenuOpen(false)} 
            style={{ textDecoration: 'none', color: '#222', fontWeight: 500, padding: '12px 16px', borderRadius: '12px', fontSize: '1.15rem', transition: 'background-color 0.2s' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            🏠 Главная
          </Link>
          <a 
            href="/#tariffs" 
            onClick={() => setIsMenuOpen(false)} 
            style={{ textDecoration: 'none', color: '#222', fontWeight: 500, padding: '12px 16px', borderRadius: '12px', fontSize: '1.15rem', transition: 'background-color 0.2s' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            🏷️ {t('nav-tariffs')}
          </a>
          <a 
            href="/#reviews" 
            onClick={() => setIsMenuOpen(false)} 
            style={{ textDecoration: 'none', color: '#222', fontWeight: 500, padding: '12px 16px', borderRadius: '12px', fontSize: '1.15rem', transition: 'background-color 0.2s' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            ⭐ {t('nav-reviews')}
          </a>
          <Link 
            to="/catalog" 
            onClick={() => setIsMenuOpen(false)} 
            style={{ textDecoration: 'none', color: '#6aad00', fontWeight: 700, padding: '12px 16px', borderRadius: '12px', backgroundColor: '#f4fce8', fontSize: '1.15rem' }}
          >
            📋 {t('nav-catalog')}
          </Link>
          <Link 
            to="/cart" 
            onClick={() => setIsMenuOpen(false)} 
            style={{ textDecoration: 'none', color: '#222', fontWeight: 500, padding: '12px 16px', borderRadius: '12px', fontSize: '1.15rem', transition: 'background-color 0.2s' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            🛒 {t('nav-cart')} ({cartCount})
          </Link>
          <Link 
            to="/admin" 
            onClick={() => setIsMenuOpen(false)} 
            style={{ textDecoration: 'none', color: '#222', fontWeight: 500, padding: '12px 16px', borderRadius: '12px', fontSize: '1.15rem', transition: 'background-color 0.2s' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            ⚙️ {t('nav-admin')}
          </Link>
        </nav>
      </Drawer>
    </>
  );
}