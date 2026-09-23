import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ru: {
    translation: {
      'nav-about': 'О сервисе',
      'nav-tariffs': 'Тарифы',
      'nav-reviews': 'Отзывы',
      'nav-catalog': 'Каталог услуг',
      'nav-cart': 'Корзина',
      'nav-admin': 'Админка',
      'btn-connect': 'Подключиться сейчас',
      'cart-title': 'Ваша корзина',
      'catalog-title': 'Каталог услуг',
      'catalog-subtitle': 'Поиск и заказ услуг отеля онлайн',
      'search-placeholder': 'Поиск услуги по названию или описанию...',
      'sort-default': 'Сортировать по...',
      'sort-price-asc': 'Цена: дешевле',
      'sort-price-desc': 'Цена: дороже',
      'sort-rating': 'Рейтинг: высокий',
      'price-from': 'Цена от:',
      'price-to': 'до:',
      'btn-apply': 'Применить фильтры',
      'btn-add-cart': 'В корзину',
      'cart-total': 'Общая стоимость:',
      'cart-checkout': 'Оформить покупку',
      'cart-empty': 'Корзина пуста',
      'order-success': 'Покупка успешно оформлена!',
      'admin-title': 'Панель администратора',
      'admin-add-service': 'Добавить услугу',
      'admin-edit-service': 'Редактировать услугу',
      'save': 'Сохранить',
      'cancel': 'Отмена',
      'delete': 'Удалить'
    }
  },
  en: {
    translation: {
      'nav-about': 'About service',
      'nav-tariffs': 'Tariffs',
      'nav-reviews': 'Reviews',
      'nav-catalog': 'Services Catalog',
      'nav-cart': 'Cart',
      'nav-admin': 'Admin Panel',
      'btn-connect': 'Connect now',
      'cart-title': 'Your Cart',
      'catalog-title': 'Services Catalog',
      'catalog-subtitle': 'Search and order hotel services online',
      'search-placeholder': 'Search by title or description...',
      'sort-default': 'Sort by...',
      'sort-price-asc': 'Price: Low to High',
      'sort-price-desc': 'Price: High to Low',
      'sort-rating': 'Top Rated',
      'price-from': 'Price from:',
      'price-to': 'to:',
      'btn-apply': 'Apply filters',
      'btn-add-cart': 'Add to cart',
      'cart-total': 'Total amount:',
      'cart-checkout': 'Checkout order',
      'cart-empty': 'Cart is empty',
      'order-success': 'Order placed successfully!',
      'admin-title': 'Admin Dashboard',
      'admin-add-service': 'Add Service',
      'admin-edit-service': 'Edit Service',
      'save': 'Save',
      'cancel': 'Cancel',
      'delete': 'Delete'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: { escapeValue: false }
  });

export default i18n;