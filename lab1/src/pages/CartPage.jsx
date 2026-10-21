import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { updateQuantity, removeFromCart, clearCart, clearCartError } from '../store/cartSlice';

import Card from '@mui/material/Card';
import Alert from '@mui/material/Alert';

export default function CartPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Берем корзину и ошибку НАПРЯМУЮ из Redux (никаких внешних серверов!)
  const { items, error } = useSelector((state) => state.cart);

  const totalPrice = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  const handleUpdateQty = (id, newQty) => {
    // Отправляем новое количество. Если оно < 1, Redux запишет ошибку в state.error
    dispatch(updateQuantity({ id, quantity: newQty }));
  };

  const handleRemoveItem = (id) => {
    if (window.confirm("Удалить услугу из корзины?")) {
      dispatch(removeFromCart(id));
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      alert(t('cart-empty'));
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    
    // Если обязательно нужна авторизация:
    if (!currentUser) {
      const confirmAuth = window.confirm("Для оформления заказа необходимо войти в систему. Перейти к авторизации?");
      if (confirmAuth) {
        navigate('/auth');
      }
      return; // <-- ВАЖНО: останавливаем выполнение, не оформляем заказ без входа!
    }

    dispatch(clearCart());
    alert(t('order-success')); 
  };

  return (
    <main className="container" style={{ minHeight: '75vh', paddingBottom: '3rem' }}>
      <section className="catalog-intro fade-in">
        <h1 className="text-h2">{t('cart-title')}</h1>
        <p className="text-body-gray-30">Управляйте вашими заказами и услугами</p>
      </section>

      {/* ОШИБКА ИЗ REDUX (например: "Количество не может быть меньше 1!") */}
      {error && (
        <Alert 
          severity="error" 
          onClose={() => dispatch(clearCartError())} 
          sx={{ my: 2, borderRadius: '12px' }}
        >
          {error}
        </Alert>
      )}

      <div className="cart-summary container" style={{ marginBottom: '3rem' }}>
        <div 
          id="cart-total-block" 
          style={{ 
            background: '#F1F1F1', 
            padding: '2.5rem', 
            borderRadius: '1.25rem', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            flexWrap: 'wrap', 
            gap: '20px' 
          }}
        >
          <div>
            <p className="text-body-gray-30">{t('cart-total')}</p>
            <span id="total-price" className="text-banner" style={{ fontSize: '3rem', color: '#000' }}>
              ${totalPrice}
            </span>
          </div>

          <button 
            id="checkout-btn" 
            type="button"
            onClick={handleCheckout}
            className="footer-cta__button" 
            style={{ padding: '1rem 3rem', fontSize: '1.2rem', cursor: 'pointer', border: 'none' }}
          >
            {t('cart-checkout')}
          </button>
        </div>
      </div>

      <div id="catalog-container" className="catalog-grid container">
        {items.length === 0 ? (
          <div style={{ width: '100%', textAlign: 'center', padding: '3rem 0', gridColumn: '1 / -1' }}>
            <h2 className="text-h2">{t('cart-empty')}</h2>
            <Link 
              to="/catalog" 
              className="cat-btn active" 
              style={{ marginTop: '1.5rem', display: 'inline-block', textDecoration: 'none' }}
            >
              {t('nav-catalog')}
            </Link>
          </div>
        ) : (
          items.map((item) => (
            <Card key={item.id} className="service-card pop-in">
              <div className="service-card__image-container">
                <img src={item.image} alt={item.name} className="service-card__image" />
              </div>
              <div className="service-card__content">
                <h3 className="service-card__title text-body-34">{item.name}</h3>
                <p className="text-body-gray-30">Цена: ${item.price}</p>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '1rem 0' }}>
                  <button 
                    type="button"
                    onClick={() => handleUpdateQty(item.id, (item.quantity || 1) - 1)} 
                    className="cat-btn"
                  >
                    -
                  </button>
                  <span className="text-body-34">{item.quantity || 1}</span>
                  <button 
                    type="button"
                    onClick={() => handleUpdateQty(item.id, (item.quantity || 1) + 1)} 
                    className="cat-btn"
                  >
                    +
                  </button>
                </div>

                <button 
                  type="button"
                  onClick={() => handleRemoveItem(item.id)} 
                  className="cat-btn" 
                  style={{ background: '#ff4d4d', color: '#fff', border: 'none' }}
                >
                  {t('delete')}
                </button>
              </div>
            </Card>
          ))
        )}
      </div>
    </main>
  );
}