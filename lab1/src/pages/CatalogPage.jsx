import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  setSearchQuery,
  setSelectedCategory,
  setSortBy,
  setPriceRange
} from '../store/servicesSlice';
import { addToCart } from '../store/cartSlice';

const ITEMS_PER_PAGE = 6;

export default function CatalogPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { items, searchQuery, selectedCategory, sortBy, minPrice, maxPrice } = useSelector(
    (state) => state.services
  );

  const [localMin, setLocalMin] = useState(minPrice);
  const [localMax, setLocalMax] = useState(maxPrice);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedService, setSelectedService] = useState(null);
    React.useEffect(() => {
    if (selectedService) {
      document.body.classList.add('interactive-modal-open');
    } else {
      document.body.classList.remove('interactive-modal-open');
    }
    return () => document.body.classList.remove('interactive-modal-open');
  }, [selectedService]);

  const [selectedIds, setSelectedIds] = useState([]);

  const [activeMethod, setActiveMethod] = useState('');
  const [methodMsg, setMethodMsg] = useState('');
  const [customList, setCustomList] = useState(null);

  const categories = useMemo(() => {
    return ['all', ...new Set(items.map((s) => s.category))];
  }, [items]);

  const formatPrice = (price) => (price === 0 ? 'Бесплатно' : `$${price}`);

  const handleApplyPrice = () => {
    setCurrentPage(1);
    setCustomList(null);
    setActiveMethod('');
    setMethodMsg('');
    dispatch(setPriceRange({ min: localMin, max: localMax }));
  };

  // Переключение выбора конкретной карточки
  const toggleCardSelection = (e, id) => {
    e.stopPropagation();
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // ГРУППОВЫЕ ДЕЙСТВИЯ ДЛЯ МНОЖЕСТВЕННОГО ВЫБОРА
  const handleAddSelectedToCart = () => {
    const selectedItems = items.filter((item) => selectedIds.includes(item.id));
    selectedItems.forEach((item) => dispatch(addToCart(item)));
    alert(`В корзину добавлено услуг: ${selectedItems.length}`);
    setSelectedIds([]); // Сбрасываем выбор
  };

  const handleAddSelectedToFavorites = () => {
    const selectedItems = items.filter((item) => selectedIds.includes(item.id));
    alert(`В избранное добавлено услуг: ${selectedItems.length}`);
    setSelectedIds([]);
  };

  // Фильтрация и сортировка
  const filteredServices = useMemo(() => {
    if (customList !== null) return customList;

    let res = items.filter((item) => {
      const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesMin = minPrice === '' || item.price >= Number(minPrice);
      const matchesMax = maxPrice === '' || item.price <= Number(maxPrice);
      return matchesCat && matchesSearch && matchesMin && matchesMax;
    });

    if (sortBy === 'price-asc') res.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') res.sort((a, b) => b.price - a.price);
    if (sortBy === 'name-asc') res.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === 'rating-desc') res.sort((a, b) => b.rating - a.rating);

    return res;
  }, [items, selectedCategory, searchQuery, minPrice, maxPrice, sortBy, customList]);

  // Пагинация
  const totalPages = Math.max(1, Math.ceil(filteredServices.length / ITEMS_PER_PAGE));
  const paginatedServices = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredServices.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredServices, currentPage]);

  // 10 методов массивов
  const runArrayMethod = (method) => {
    setActiveMethod(method);
    setCurrentPage(1);

    if (method === 'map') {
      const mapped = items.map((item) => ({
        ...item,
        price: Math.round(item.price * 0.9),
        description: `${item.description} (Скидка 10% через map())`
      }));
      setCustomList(mapped);
      setMethodMsg('map(): Применена скидка 10% ко всем товарам каталога.');
    } else if (method === 'filter') {
      const filtered = items.filter((item) => item.price <= 20);
      setCustomList(filtered);
      setMethodMsg(`filter(): Выбраны услуги с ценой <= $20 (найдено: ${filtered.length}).`);
    } else if (method === 'reduce') {
      const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
      const mostExpensive = items.reduce(
        (max, item) => (item.price > max.price ? item : max),
        items[0]
      );
      setCustomList([mostExpensive]);
      setMethodMsg(
        `reduce(): Общая сумма всех услуг — $${totalPrice}. Самая дорогая услуга — "${mostExpensive.name}".`
      );
    } else if (method === 'sort') {
      const sorted = [...items].sort((a, b) => b.rating - a.rating);
      setCustomList(sorted);
      setMethodMsg('sort(): Все товары отсортированы по рейтингу (убывание).');
    } else if (method === 'find') {
      const spaService = items.find((item) => item.category.toLowerCase().includes('spa'));
      setCustomList(spaService ? [spaService] : []);
      setMethodMsg(
        spaService
          ? `find(): Найдена первая SPA-услуга: "${spaService.name}".`
          : 'find(): Услуг SPA не найдено.'
      );
    } else if (method === 'findIndex') {
      const idx = items.findIndex((item) => item.rating < 4.5);
      setCustomList(idx >= 0 ? [items[idx]] : []);
      setMethodMsg(
        idx >= 0
          ? `findIndex(): Индекс первой услуги с рейтингом < 4.5 равен ${idx} ("${items[idx].name}").`
          : 'findIndex(): Таких услуг нет.'
      );
    } else if (method === 'some') {
      const hasFree = items.some((item) => item.price === 0);
      setCustomList(items.filter((item) => item.price === 0));
      setMethodMsg(`some(): Есть ли бесплатные услуги в базе? ${hasFree ? 'Да' : 'Нет'}.`);
    } else if (method === 'every') {
      const everyHigh = items.every((item) => item.rating >= 4);
      setCustomList(items.filter((item) => item.rating >= 4));
      setMethodMsg(`every(): У всех ли услуг рейтинг 4 и выше? ${everyHigh ? 'Да' : 'Нет'}.`);
    } else if (method === 'slice') {
      const sliced = items.slice(0, 3);
      setCustomList(sliced);
      setMethodMsg('slice(): Извлечены первые 3 услуги.');
    } else if (method === 'forEach') {
      const fast = [];
      items.forEach((item) => {
        if (item.time <= 15) fast.push(item);
      });
      setCustomList(fast);
      setMethodMsg(`forEach(): Отобраны быстрые услуги (время <= 15 мин). Найдено: ${fast.length}.`);
    }
  };

  const resetMethods = () => {
    setActiveMethod('');
    setMethodMsg('');
    setCustomList(null);
    setCurrentPage(1);
  };

  const handleFavoriteClick = (e, item) => {
    e.stopPropagation();
    alert(`"${item.name}" добавлено в избранное!`);
  };

  const handleAddToCart = (e, item) => {
    e.stopPropagation();
    dispatch(addToCart(item));
  };

  return (
    <main className="container">
      <section className="catalog-intro fade-in">
        <h1 className="text-h2">Каталог услуг</h1>
      </section>

      {/* Панель фильтров и поиска */}
      <div className="catalog-controls container">
        <div className="search-box">
          <input
            type="text"
            id="search-input"
            placeholder={t('search-placeholder') || 'Поиск услуги по названию или описанию...'}
            value={searchQuery}
            onChange={(e) => {
              setCurrentPage(1);
              resetMethods();
              dispatch(setSearchQuery(e.target.value));
            }}
          />
        </div>

        <div className="filters-row">
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => {
              setCurrentPage(1);
              resetMethods();
              dispatch(setSortBy(e.target.value));
            }}
          >
            <option value="default">Сортировать по...</option>
            <option value="price-asc">Цена: дешевле</option>
            <option value="price-desc">Цена: дороже</option>
            <option value="name-asc">Название: А-Я</option>
            <option value="rating-desc">Рейтинг: высокий</option>
          </select>

          <div className="category-list" id="category-list">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`cat-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => {
                  setCurrentPage(1);
                  resetMethods();
                  dispatch(setSelectedCategory(cat));
                }}
              >
                {cat === 'all' ? 'Все' : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-range" style={{ marginTop: '1rem', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span className="text-body-gray-30">Цена от:</span>
          <input
            type="number"
            id="price-min"
            placeholder="0"
            style={{ width: '80px', padding: '5px', borderRadius: '8px', border: '1px solid #ccc' }}
            value={localMin}
            onChange={(e) => setLocalMin(e.target.value)}
          />
          <span className="text-body-gray-30">до:</span>
          <input
            type="number"
            id="price-max"
            placeholder="100"
            style={{ width: '80px', padding: '5px', borderRadius: '8px', border: '1px solid #ccc' }}
            value={localMax}
            onChange={(e) => setLocalMax(e.target.value)}
          />
          <button type="button" id="apply-filters" onClick={handleApplyPrice} className="cat-btn">
            Применить фильтры
          </button>
        </div>
      </div>

      {/* Панель методов массивов */}
      <section className="array-methods container" aria-labelledby="array-methods-title">
        <div className="array-methods__header">
          <button type="button" className="method-reset" id="method-reset" onClick={resetMethods}>
            Обычный каталог
          </button>
        </div>

        <div className="array-methods__buttons">
          {['map', 'filter', 'reduce', 'sort', 'find', 'findIndex', 'some', 'every', 'slice', 'forEach'].map((m) => (
            <button
              key={m}
              type="button"
              className={`method-btn ${activeMethod === m ? 'active' : ''}`}
              onClick={() => runArrayMethod(m)}
            >
              {m}
            </button>
          ))}
        </div>

        {methodMsg && (
          <p className="method-result" id="method-result" aria-live="polite">
            {methodMsg}
          </p>
        )}
      </section>

      {/* ПАНЕЛЬ МНОЖЕСТВЕННОГО ВЫБОРА С ГРУППОВЫМИ ДЕЙСТВИЯМИ */}
      <div 
        className="container" 
        style={{ 
          margin: '1.5rem auto', 
          padding: '14px 22px', 
          background: selectedIds.length > 0 ? '#f4fce8' : '#f8f9fa', 
          border: selectedIds.length > 0 ? '1px solid #9EF01A' : '1px solid #eee',
          borderRadius: '16px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          transition: 'all 0.3s ease'
        }}
      >
        <span style={{ fontSize: '1rem', fontWeight: '500' }}>
          Выбрано элементов: <strong>{selectedIds.length}</strong>
        </span>

        {selectedIds.length > 0 && (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button 
              type="button" 
              className="cat-btn active" 
              onClick={handleAddSelectedToCart}
              style={{ fontSize: '0.85rem' }}
            >
              🛒 Добавить выбранные ({selectedIds.length})
            </button>
            <button 
              type="button" 
              className="cat-btn" 
              onClick={handleAddSelectedToFavorites}
              style={{ fontSize: '0.85rem' }}
            >
              ♥ В избранное ({selectedIds.length})
            </button>
            <button 
              type="button" 
              className="cat-btn" 
              onClick={() => setSelectedIds([])}
              style={{ fontSize: '0.85rem', background: '#fff' }}
            >
              ✕ Снять выбор
            </button>
          </div>
        )}
      </div>

      {/* Сетка карточек каталога */}
      <div id="catalog-container" className="catalog-grid container">
        {paginatedServices.length === 0 ? (
          <div className="no-results">
            <h2 className="text-h2">Услуги не найдены</h2>
            <p className="text-body-gray-30">Попробуйте сбросить фильтры или изменить поисковый запрос.</p>
          </div>
        ) : (
          paginatedServices.map((item) => {
            const isSelected = selectedIds.includes(item.id);

            return (
              <article
                key={item.id}
                className="service-card pop-in"
                role="button"
                tabIndex={0}
                onClick={() => setSelectedService(item)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedService(item);
                  }
                }}
                style={{
                  outline: isSelected ? '3px solid #9EF01A' : '1px solid #F1F1F1',
                  boxShadow: isSelected ? '0 0 22px rgba(158, 240, 26, 0.45)' : undefined,
                  transform: isSelected ? 'translateY(-4px)' : undefined,
                  cursor: 'pointer'
                }}
              >
                <div className="service-card__image-container">
                  <img src={item.image} alt={item.name} className="service-card__image" />
                  <span className="service-card__badge">{item.category}</span>
                </div>

                <div className="service-card__content">
                  <h3 className="service-card__title text-body-34">{item.name}</h3>
                  <p className="service-card__description text-body-gray-30">{item.description}</p>
                  
                  <div className="service-card__meta">
                    <span>Рейтинг: {item.rating}</span>
                    <span>Время: {item.time} мин.</span>
                  </div>

                  <div className="service-card__footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <span className="service-card__price text-price-large" style={{ fontSize: '1.8rem' }}>
                      {formatPrice(item.price)}
                    </span>

                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      {/* Кнопка множественного выбора */}
                      <button
                        type="button"
                        onClick={(e) => toggleCardSelection(e, item.id)}
                        className={`cat-btn ${isSelected ? 'active' : ''}`}
                        style={{ fontSize: '0.8rem', padding: '6px 12px' }}
                      >
                        {isSelected ? '✓ Выбрано' : 'Выбрать'}
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleFavoriteClick(e, item)}
                        className="cat-btn"
                        style={{ padding: '6px 10px' }}
                        aria-label="Добавить в избранное"
                      >
                        ♥
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleAddToCart(e, item)}
                        className="cat-btn active"
                        style={{ padding: '6px 10px' }}
                        aria-label="Добавить в корзину"
                      >
                        🛒
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>

      {/* Пагинация */}
      <nav
        className="pagination container"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
          margin: '2rem 0'
        }}
        aria-label="Навигация по страницам"
      >
        <button
          type="button"
          id="prev-page"
          className="cat-btn"
          disabled={currentPage <= 1}
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        >
          ← Назад
        </button>
        <span id="current-page-info" className="text-body-30">
          Страница {currentPage} из {totalPages}
        </span>
        <button
          type="button"
          id="next-page"
          className="cat-btn"
          disabled={currentPage >= totalPages}
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        >
          Вперед →
        </button>
      </nav>

      {/* МОДАЛЬНОЕ ОКНО ДЕТАЛЕЙ — 1 В 1 КАК В ОРИГИНАЛЬНОМ openServiceDetails */}
      {selectedService && (
        <div
          className="interactive-modal is-open"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.55)',
            backdropFilter: 'blur(3px)',
            padding: '1.25rem',
            boxSizing: 'border-box'
          }}
          onClick={() => setSelectedService(null)}
        >
          <section
            className="interactive-modal__dialog"
            style={{
              width: 'min(720px, 100%)',
              maxHeight: 'min(86vh, 760px)',
              overflowY: 'auto',
              backgroundColor: '#ffffff',
              borderRadius: '1.5rem',
              padding: '1.75rem',
              boxShadow: '0 28px 80px rgba(0, 0, 0, 0.35)',
              boxSizing: 'border-box'
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="interactive-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <header
              className="interactive-modal__header"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                marginBottom: '1.25rem',
                borderBottom: '1px solid #eee',
                paddingBottom: '0.75rem'
              }}
            >
              <h2
                className="interactive-modal__title"
                id="interactive-modal-title"
                style={{ margin: 0, fontSize: '1.8rem', fontWeight: 600, color: '#000' }}
              >
                {selectedService.name}
              </h2>
              <button
                type="button"
                className="interactive-modal__close"
                style={{
                  width: '38px',
                  height: '38px',
                  border: 0,
                  borderRadius: '50%',
                  backgroundColor: '#f1f1f1',
                  cursor: 'pointer',
                  fontSize: '1.4rem',
                  lineHeight: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onClick={() => setSelectedService(null)}
                aria-label="Закрыть"
              >
                ×
              </button>
            </header>

            {/* Двухколоночный оригинальный блок: Слева фото 280px, Справа описание и плашки */}
            <div
              className="interactive-detail"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1.5rem',
                alignItems: 'start'
              }}
            >
              <img
                src={selectedService.image}
                alt={selectedService.name}
                style={{
                  width: '100%',
                  height: '260px',
                  objectFit: 'cover',
                  borderRadius: '1rem',
                  display: 'block'
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <p style={{ margin: 0, fontSize: '1rem', lineHeight: '1.5', color: '#444' }}>
                  {selectedService.description}
                </p>

                {/* Оригинальные плашки-таблетки */}
                <div
                  className="interactive-detail__meta"
                  style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem', margin: '0.75rem 0' }}
                >
                  <span className="interactive-pill" style={{ display: 'inline-flex', padding: '0.4rem 0.8rem', borderRadius: '999px', background: '#f1f1f1', fontSize: '0.9rem', color: '#000' }}>
                    {selectedService.category}
                  </span>
                  <span className="interactive-pill" style={{ display: 'inline-flex', padding: '0.4rem 0.8rem', borderRadius: '999px', background: '#f1f1f1', fontSize: '0.9rem', color: '#000' }}>
                    Цена: {formatPrice(selectedService.price)}
                  </span>
                  <span className="interactive-pill" style={{ display: 'inline-flex', padding: '0.4rem 0.8rem', borderRadius: '999px', background: '#f1f1f1', fontSize: '0.9rem', color: '#000' }}>
                    Рейтинг: {selectedService.rating}
                  </span>
                  <span className="interactive-pill" style={{ display: 'inline-flex', padding: '0.4rem 0.8rem', borderRadius: '999px', background: '#f1f1f1', fontSize: '0.9rem', color: '#000' }}>
                    Время: {selectedService.time} мин.
                  </span>
                </div>

                {/* Кнопки действий */}
                <div style={{ display: 'flex', gap: '10px', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className="cat-btn active"
                    style={{ padding: '0.6rem 1.4rem', fontWeight: 600 }}
                    onClick={(e) => {
                      handleAddToCart(e, selectedService);
                      setSelectedService(null);
                    }}
                  >
                    Добавить в корзину
                  </button>
                  <button
                    type="button"
                    className="cat-btn"
                    style={{ padding: '0.6rem 1.4rem', fontWeight: 500 }}
                    onClick={(e) => {
                      handleFavoriteClick(e, selectedService);
                      setSelectedService(null);
                    }}
                  >
                    В избранное
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}