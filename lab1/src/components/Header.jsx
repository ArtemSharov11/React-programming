import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

function Header({ companyName = "HOTELA", cartCount = 0 }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinkStyle = ({ isActive }) => ({
    textDecoration: 'none',
    color: isActive ? '#6aad00' : '#000000',
    fontWeight: isActive ? '700' : '500',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  });

  return (
    <>
      <header className="header">
        {}
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/img/Frame.svg" alt={companyName} className="logo heartbeat" />
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {}
          <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <NavLink to="/" style={navLinkStyle}>
              Главная
            </NavLink>
            <NavLink to="/catalog" style={navLinkStyle}>
              Каталог услуг
            </NavLink>
            <NavLink to="/cart" style={navLinkStyle}>
              Корзина
              <span className="interactive-counter">{cartCount}</span>
            </NavLink>
          </nav>

          {}
          <button 
            type="button" 
            className={`burger-menu blur-effect ${isOpen ? 'is-active' : ''}`} 
            id="burgerToggle"
            onClick={toggleMenu}
            aria-label="Открыть меню"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {}
      <div className={`side-menu ${isOpen ? 'is-open' : ''}`} id="sideMenu">
        <nav className="side-menu__nav">
          <NavLink to="/" style={navLinkStyle} onClick={toggleMenu}>
            Главная
          </NavLink>
          <NavLink to="/catalog" style={navLinkStyle} onClick={toggleMenu}>
            Каталог услуг
          </NavLink>
          <NavLink to="/cart" style={navLinkStyle} onClick={toggleMenu}>
            Корзина ({cartCount})
          </NavLink>
          <hr />
          <p className="side-menu__text">{companyName}</p>
        </nav>
      </div>

      {}
      <div 
        className={`overlay ${isOpen ? 'is-active' : ''}`} 
        id="overlay"
        onClick={toggleMenu}
      ></div>
    </>
  );
}

export default Header;