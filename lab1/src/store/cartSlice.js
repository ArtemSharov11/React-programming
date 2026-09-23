import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    error: null
  },
  reducers: {
    addToCart: (state, action) => {
      const service = action.payload;
      const existing = state.items.find(item => item.id === service.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...service, quantity: 1 });
      }
      state.error = null;
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      if (quantity < 1) {
        state.error = 'Количество не может быть меньше 1!';
        return;
      }
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
        state.error = null;
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },

    clearCart: (state) => {
      state.items = [];
      state.error = null;
    }
  }
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;