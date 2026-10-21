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

import Rating from '@mui/material/Rating';
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';


const ITEMS_PER_PAGE = 6;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function CatalogPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { items, searchQuery, selectedCategory, sortBy, minPrice, maxPrice, error } = useSelector(
    (state) => state.services
  );

  const [localMin, setLocalMin] = useState(minPrice);
  const [localMax, setLocalMax] = useState(maxPrice);
  const [currentPage, setCurrentPage] = useState(1);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');

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

  const toggleCardSelection = (e, id) => {
    e.stopPropagation();
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddSelectedToCart = () => {
    const selectedItems = items.filter((item) => selectedIds.includes(item.id));
    selectedItems.forEach((item) => dispatch(addToCart(item)));
    alert(`В корзину добавлено услуг: ${selectedItems.length}`);
    setSelectedIds([]);
  };

  const handleAddSelectedToFavorites = () => {
    const selectedItems = items.filter((item) => selectedIds.includes(item.id));
    alert(`В избранное добавлено услуг: ${selectedItems.length}`);
    setSelectedIds([]);
  };

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

  const totalPages = Math.max(1, Math.ceil(filteredServices.length / ITEMS_PER_PAGE));
  const paginatedServices = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredServices.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredServices, currentPage]);

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
    setSnackbarText(`Услуга "${item.name}" успешно добавлена в корзину!`);
    setSnackbarOpen(true);
  };
  return (
    <main className="container">
      <section className="catalog-intro fade-in">
        <h1 className="text-h2">{t('catalog-title')}</h1>
        {error && (
        <Alert severity="error" sx={{ my: 2, borderRadius: '12px' }}>
          {error}
        </Alert>
      )}
      </section>

      <div className="catalog-controls container">
        <div className="search-box" style={{ width: '100%', marginBottom: '1.5rem' }}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder={t('search-placeholder') || 'Поиск услуги по названию или описанию...'}
            value={searchQuery}
            onChange={(e) => {
              setCurrentPage(1);
              resetMethods();
              dispatch(setSearchQuery(e.target.value));
            }}
            sx={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
              }
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
            <option value="default">{t('sort-default')}</option>
            <option value="price-asc">{t('sort-price-asc')}</option>
            <option value="price-desc">{t('sort-price-desc')}</option>
            <option value="name-asc">Название: А-Я</option>
            <option value="rating-desc">{t('sort-rating')}</option>
          </select>

          <div className="category-list" id="category-list" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <Chip
                  key={cat}
                  label={cat === 'all' ? 'Все' : cat}
                  clickable
                  color={isSelected ? 'success' : 'default'}
                  variant={isSelected ? 'filled' : 'outlined'}
                  onClick={() => {
                    setCurrentPage(1);
                    resetMethods();
                    dispatch(setSelectedCategory(cat));
                  }}
                  sx={{
                    fontWeight: isSelected ? '600' : '400',
                    fontSize: '0.9rem',
                    padding: '4px 6px'
                  }}
                />
              );
            })}
          </div>
        </div>

        <div className="filter-range" style={{ marginTop: '1rem', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span className="text-body-gray-30">{t('price-from')}</span>
          <input
            type="number"
            id="price-min"
            placeholder="0"
            style={{ width: '80px', padding: '5px', borderRadius: '8px', border: '1px solid #ccc' }}
            value={localMin}
            onChange={(e) => setLocalMin(e.target.value)}
          />
          <span className="text-body-gray-30">{t('price-to')}</span>
          <input
            type="number"
            id="price-max"
            placeholder="100"
            style={{ width: '80px', padding: '5px', borderRadius: '8px', border: '1px solid #ccc' }}
            value={localMax}
            onChange={(e) => setLocalMax(e.target.value)}
          />
          <Button
            variant="contained"
            color="success"
            onClick={handleApplyPrice}
            sx={{
              borderRadius: '10px',
              textTransform: 'none',
              fontWeight: '600',
              padding: '6px 18px',
              backgroundColor: '#6aad00',
              '&:hover': {
                backgroundColor: '#589000'
              }
            }}
          >
            {t('btn-apply')}
          </Button>
        </div>
      </div>

      <Divider sx={{ my: 3 }} />
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
          <Alert 
            severity="info" 
            variant="standard"
            sx={{ 
              marginTop: '1rem', 
              borderRadius: '12px',
              fontSize: '0.95rem'
            }}
          >
            {methodMsg}
          </Alert>
        )}
      </section>

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
                  
                <div className="service-card__meta" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Rating 
                    value={Number(item.rating) || 5} 
                    precision={0.5} 
                    readOnly 
                    size="small" 
                  />
                  <span style={{ fontSize: '0.85rem', color: '#666' }}>({item.rating})</span>
                  <span>Время: {item.time} мин.</span>
                </div>

                  <div className="service-card__footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <span className="service-card__price text-price-large" style={{ fontSize: '1.8rem' }}>
                      {formatPrice(item.price)}
                    </span>

                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
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

      <div style={{ display: 'flex', justifyContent: 'center', margin: '2.5rem 0' }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, value) => {
            setCurrentPage(value);
            window.scrollTo({ top: 300, behavior: 'smooth' });
          }}
          color="primary"
          shape="rounded"
          size="large"
        />
      </div>

      <Dialog
        open={Boolean(selectedService)}
        slots={{ transition: Transition }}
        keepMounted
        onClose={() => setSelectedService(null)}
        maxWidth="md"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: '28px',
              overflow: 'hidden'
            }
          },
          backdrop: {
            sx: {
              backdropFilter: 'blur(8px)',
              backgroundColor: 'rgba(0, 0, 0, 0.45)',
            }
          }
        }}
      >
        {selectedService && (
          <div style={{ padding: '32px', boxSizing: 'border-box', backgroundColor: '#fff' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 style={{ margin: 0, fontSize: '1.9rem', fontWeight: '700', color: '#111' }}>
                {selectedService.name}
              </h2>
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                style={{
                  width: '38px',
                  height: '38px',
                  border: 'none',
                  borderRadius: '50%',
                  backgroundColor: '#f1f1f1',
                  cursor: 'pointer',
                  fontSize: '1.3rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#e0e0e0'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#f1f1f1'}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              
              <div style={{ flex: '1 1 280px', maxWidth: '340px' }}>
                <img
                  src={selectedService.image}
                  alt={selectedService.name}
                  style={{
                    width: '100%',
                    height: '240px',
                    objectFit: 'cover',
                    borderRadius: '20px',
                    display: 'block',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                  }}
                />
              </div>

              <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p style={{ margin: 0, fontSize: '1.05rem', lineHeight: '1.6', color: '#555' }}>
                  {selectedService.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  <Chip label={selectedService.category} size="small" sx={{ fontWeight: 600, bgcolor: '#f1f1f1' }} />
                  <Chip label={`Цена: ${formatPrice(selectedService.price)}`} size="small" color="success" variant="outlined" sx={{ fontWeight: 600 }} />
                  <Chip label={`Рейтинг: ★ ${selectedService.rating}`} size="small" sx={{ bgcolor: '#fff8e1', color: '#f57f17', fontWeight: 600 }} />
                  <Chip label={`Время: ${selectedService.time} мин.`} size="small" sx={{ bgcolor: '#f1f1f1' }} />
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '12px', flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    onClick={(e) => {
                      handleAddToCart(e, selectedService);
                      setSelectedService(null);
                    }}
                    sx={{
                      borderRadius: '12px',
                      textTransform: 'none',
                      fontWeight: 600,
                      padding: '10px 22px',
                      backgroundColor: '#6aad00',
                      '&:hover': { backgroundColor: '#589000' }
                    }}
                  >
                    🛒 Добавить в корзину
                  </Button>

                  <Button
                    variant="outlined"
                    onClick={(e) => {
                      handleFavoriteClick(e, selectedService);
                      setSelectedService(null);
                    }}
                    sx={{
                      borderRadius: '12px',
                      textTransform: 'none',
                      fontWeight: 600,
                      padding: '10px 20px',
                      color: '#333',
                      borderColor: '#ccc',
                      '&:hover': { borderColor: '#999', backgroundColor: '#f9f9f9' }
                    }}
                  >
                    ♥ В избранное
                  </Button>
                </div>
              </div>

            </div>

          </div>
        )}
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%', borderRadius: '12px' }}>
          {snackbarText}
        </Alert>
      </Snackbar>
    </main>
  );
}