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
      console.log('cart', action.payload);
      state.products = action.payload;
    },
    addItem: (state, action) => {
      console.log(action.payload);
      const item = state.products.find(
        (product) => product.id === action.payload.id
      );
      console.log('WORRIED', state.products);
      state.cartItems = [...state.cartItems, { ...item, amount: 0 }];
      console.log(state.cartItems);
      //   console.log(item.id, state.cart[0].id);
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, { payload }) => {
      //   console.log(payload);
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount += 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount -= 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
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
