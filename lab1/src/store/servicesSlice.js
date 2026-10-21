import { createSlice } from '@reduxjs/toolkit';
import initialServices from '../data/services.json';

const validateService = (data) => {
  if (!data.name || data.name.trim().length < 3 || data.name.trim().length > 80) {
    return 'Название должно содержать от 3 до 80 символов.';
  }
  if (!data.category || data.category.trim().length < 2) {
    return 'Категория должна содержать не менее 2 символов.';
  }
  if (isNaN(data.price) || Number(data.price) < 0 || Number(data.price) > 100000) {
    return 'Цена должна быть от 0 до 100000.';
  }
  if (!data.description || data.description.trim().length < 10) {
    return 'Описание должно содержать не менее 10 символов.';
  }
  return null;
};

const servicesSlice = createSlice({
  name: 'services',
  initialState: {
    items: initialServices,
    searchQuery: '',
    selectedCategory: 'all',
    sortBy: 'default',
    minPrice: '',
    maxPrice: '',
    error: null
  },
  reducers: {
      addService: (state, action) => {
      const validationError = validateService(action.payload);
      if (validationError) {
        state.error = validationError;
        return;
      }
      state.items.unshift({
        ...action.payload,
        id: Date.now().toString(),
        rating: Number(action.payload.rating) || 5,
        time: Number(action.payload.time) || 30
      });
      state.error = null;
    },

    updateService: (state, action) => {
      const validationError = validateService(action.payload);
      if (validationError) {
        state.error = validationError;
        return;
      }
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
        state.error = null;
      }
    },

    deleteService: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.error = null;
    },

    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setPriceRange: (state, action) => {
    const { min, max } = action.payload;
      
      if (min !== '' && Number(min) < 0) {
        state.error = 'Минимальная цена не может быть отрицательной!';
        return;
      }
      if (max !== '' && Number(max) < 0) {
        state.error = 'Максимальная цена не может быть отрицательной!';
        return;
      }
      if (min !== '' && max !== '' && Number(min) > Number(max)) {
        state.error = 'Минимальная цена не может превышать максимальную!';
        return;
      }

      state.minPrice = min;
      state.maxPrice = max;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const {
  addService,
  updateService,
  deleteService,
  setSearchQuery,
  setSelectedCategory,
  setSortBy,
  setPriceRange,
  clearError
} = servicesSlice.actions;

export default servicesSlice.reducer;