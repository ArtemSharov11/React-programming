import { configureStore } from '@reduxjs/toolkit';
import servicesReducer from './servicesSlice';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    services: servicesReducer,
    cart: cartReducer,
  },
});