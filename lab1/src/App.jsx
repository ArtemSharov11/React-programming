import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import './animation.css';
import './index3.css';
import './tablet.css';
import './phone.css';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';

import initialServices from './data/services.json';

function App() {
  const companyName = "Hoteza Web";

  const [services, setServices] = useState(initialServices);
  const [cart, setCart] = useState([]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
      <Header companyName={companyName} cartCount={cartCount} />

      <Routes>
        {}
        <Route path="/" element={<HomePage />} />

        {}
        <Route path="/catalog" element={<div className="container" style={{ padding: '4rem 1rem' }}><h2>Каталог в разработке...</h2></div>} />
        <Route path="/cart" element={<div className="container" style={{ padding: '4rem 1rem' }}><h2>Корзина в разработке...</h2></div>} />
      </Routes>

      <Footer companyName={companyName} />
    </div>
  );
}

export default App;