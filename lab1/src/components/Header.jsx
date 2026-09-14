import { useState } from 'react';

function Header({ companyName }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="header">
        <img src="img/Frame.svg" alt={companyName} className="logo heartbeat" />
        
        <button 
          type="button" 
          className={`burger-menu blur-effect ${isOpen ? 'is-active' : ''}`} 
          id="burgerToggle"
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>

      <div className={`side-menu ${isOpen ? 'is-open' : ''}`} id="sideMenu">
        <nav className="side-menu__nav">
          <a href="#" onClick={toggleMenu}>О сервисе</a>
          <a href="#" onClick={toggleMenu}>Тарифы</a>
          <a href="#" onClick={toggleMenu}>Отзывы</a>
          <hr />
          <p className="side-menu__text">{companyName}</p>
        </nav>
      </div>

      <div 
        className={`overlay ${isOpen ? 'is-active' : ''}`} 
        id="overlay"
        onClick={toggleMenu}
      ></div>
    </>
  );
}

export default Header;