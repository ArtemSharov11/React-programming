import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Page404() {
  const navigate = useNavigate();

  return (
    <main 
      className="container" 
      style={{ 
        minHeight: '70vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        textAlign: 'center',
        padding: '2rem 1rem'
      }}
    >
      <h1 
        style={{ 
          fontSize: '7rem', 
          fontWeight: '800', 
          margin: 0, 
          color: '#000',
          lineHeight: 1
        }}
      >
        404
      </h1>

      <h2 className="text-h2" style={{ margin: '1rem 0 0.5rem' }}>
        Страница не найдена
      </h2>
      
      <p className="text-body-gray-30" style={{ maxWidth: '420px', marginBottom: '2rem' }}>
        К сожалению, запрашиваемая страница не существует или была перемещена по другому адресу.
      </p>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button 
          type="button" 
          onClick={() => navigate(-1)} 
          className="cat-btn"
          style={{ padding: '0.75rem 1.75rem', cursor: 'pointer' }}
        >
          ← Вернуться назад
        </button>

        <Link 
          to="/" 
          className="cat-btn active"
          style={{ 
            padding: '0.75rem 1.75rem', 
            textDecoration: 'none', 
            fontWeight: '600' 
          }}
        >
          🏠 На главную
        </Link>
      </div>
    </main>
  );
}