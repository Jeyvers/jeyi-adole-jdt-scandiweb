import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    cartItems: [],
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
      state.cartItems = [...state.cartItems, item];
      console.log(state.cartItems);
      //   console.log(item.id, state.cart[0].id);
    },
  },
});

export const { loadProducts, addItem } = cartSlice.actions;
export default cartSlice.reducer;
