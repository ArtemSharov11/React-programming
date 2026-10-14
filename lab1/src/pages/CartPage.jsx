import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { updateQuantity, removeFromCart, clearCart } from '../store/cartSlice';

const API_URL = "http://localhost:3000";

export default function CartPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, error } = useSelector((state) => state.cart);
  const [localItems, setLocalItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchServerCart = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_URL}/cart`);
      if (res.ok) {
        const data = await res.json();
        setLocalItems(data);
      } else {
        setLocalItems(items);
      }
    } catch {
      setLocalItems(items);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServerCart();
  }, [items]);

  const displayItems = localItems.length ? localItems : items;
  const totalPrice = displayItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  const handleUpdateQty = async (id, newQty) => {
    if (newQty < 1) return;

    dispatch(updateQuantity({ id, quantity: newQty }));

    try {
      await fetch(`${API_URL}/cart/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQty })
      });
      fetchServerCart();
    } catch (err) {
      console.log('Работаем в локальном режиме без json-server:', err);
    }
  };

  const handleRemoveItem = async (id) => {
    const confirmed = window.confirm("Удалить услугу из корзины?");
    if (!confirmed) return;

    dispatch(removeFromCart(id));

    try {
      await fetch(`${API_URL}/cart/${id}`, { method: 'DELETE' });
      fetchServerCart();
    } catch (err) {
      console.log('Локальное удаление без сервера:', err);
    }
  };

  const handleCheckout = async () => {
    if (displayItems.length === 0) {
      alert(t('cart-empty'));
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    
    if (!currentUser) {
      const confirmAuth = window.confirm("Для оформления заказа рекомендуется войти в систему. Перейти к авторизации?");
      if (confirmAuth) {
        navigate('/auth');
        return;
      }
    }

    const newOrder = {
      userId: currentUser ? currentUser.id : "guest",
      items: displayItems,
      totalPrice: totalPrice,
      date: new Date().toLocaleString('ru-RU')
    };

    try {
      const orderResponse = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder)
      });

      if (orderResponse.ok) {
        for (const item of displayItems) {
          await fetch(`${API_URL}/cart/${item.id}`, { method: 'DELETE' });
        }
      }
    } catch (err) {
      console.log('Сервер заказов недоступен, очищаем локально:', err);
    }

    dispatch(clearCart());
    setLocalItems([]);
    
    alert(t('order-success')); 
  };

  return (
    <main className="container" style={{ minHeight: '75vh' }}>
      <section className="catalog-intro fade-in">
        <h1 className="text-h2">{t('cart-title')}</h1>
        <p className="text-body-gray-30">Управляйте вашими заказами и услугами</p>
      </section>

      {error && (
        <div style={{ backgroundColor: '#ffebee', color: '#c62828', padding: '1rem', borderRadius: '1rem', margin: '1rem 0' }}>
          {error}
        </div>
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
        {displayItems.length === 0 ? (
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
          displayItems.map((item) => (
            <article key={item.id} className="service-card pop-in">
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
            </article>
          ))
        )}
      </div>
    </main>
  );
}