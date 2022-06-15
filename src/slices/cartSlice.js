import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    cartItems: [],
    amount: 0,
    total: 0,
  },
  reducers: {
    loadProducts: (state, action) => {
      state.products = action.payload.find(
        (product) => product.name === 'all'
      ).products;
    },
    addItem: (state, action) => {
      const item = state.products.find(
        (product) => product.id === action.payload.id
      );
      state.cartItems = [...state.cartItems, { ...item, amount: 1 }];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount += 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount -= 1;
    },
    calculateTotals: (state, action) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        const defaultPrice = item.prices?.find(
          (price) => price.currency.symbol === action.payload
        );
        amount += item.amount;
        total += item.amount * defaultPrice.amount;
      });

      state.amount = amount;
      state.total = total;
    },
  },
});

export const {
  loadProducts,
  addItem,
  increase,
  decrease,
  removeItem,
  calculateTotals,
} = cartSlice.actions;
export default cartSlice.reducer;
