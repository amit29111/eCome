import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const loadCartFromStorage = () => {
  try {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    return [];
  }
};

const saveCartToStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCartFromStorage(),
    totalItems: 0,
    totalAmount: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1, size, color } = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => item.product._id === product._id && item.size === size && item.color === color
      );

      if (existingItemIndex >= 0) {
        state.items[existingItemIndex].quantity += quantity;
        toast.success('Item quantity updated in cart');
      } else {
        state.items.push({
          product,
          quantity,
          size,
          color,
          price: product.price,
        });
        toast.success('Item added to cart');
      }

      cartSlice.caseReducers.calculateTotals(state);
      saveCartToStorage(state.items);
    },
    removeFromCart: (state, action) => {
      const { productId, size, color } = action.payload;
      state.items = state.items.filter(
        item => !(item.product._id === productId && item.size === size && item.color === color)
      );
      
      cartSlice.caseReducers.calculateTotals(state);
      saveCartToStorage(state.items);
      toast.success('Item removed from cart');
    },
    updateQuantity: (state, action) => {
      const { productId, size, color, quantity } = action.payload;
      const item = state.items.find(
        item => item.product._id === productId && item.size === size && item.color === color
      );

      if (item) {
        if (quantity <= 0) {
          cartSlice.caseReducers.removeFromCart(state, { payload: { productId, size, color } });
        } else {
          item.quantity = quantity;
          cartSlice.caseReducers.calculateTotals(state);
          saveCartToStorage(state.items);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalAmount = 0;
      localStorage.removeItem('cart');
      toast.success('Cart cleared');
    },
    calculateTotals: (state) => {
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;