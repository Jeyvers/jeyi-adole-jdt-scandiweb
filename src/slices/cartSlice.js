import { createSlice, current } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    cartItems: [],
    amount: 0,
    total: 0,
    miniCart: false,
  },
  reducers: {
    loadProducts: (state, action) => {
      state.products = action.payload.find(
        (product) => product.name === 'all'
      ).products;
    },
    setMiniCart: (state, action) => {
      state.miniCart = !state.miniCart;
    },
    addItem: (state, action) => {
      const uniqueId = uuidv4();
      // const selectedAttributes = { Size: '40' };
      // console.log(
      //   'WITH LODASH',
      //   uniqueId,
      //   _.isEqual(selectedAttributes, action.payload.selectedAttributes)
      // );
      console.log(uniqueId);
      const item = state.products.find(
        (product) => product.id === action.payload.id
      );
      const fullItem = {
        ...item,
        uniqueId,
        amount: 1,
        selectedAttributes: action.payload.selectedAttributes,
      };

      state.cartItems = [...state.cartItems, fullItem];
      console.log(state.cartItems);
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.uniqueId !== itemId
      );
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find(
        (item) => item.uniqueId === payload.uniqueId
      );
      cartItem.amount += 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find(
        (item) => item.uniqueId === payload.uniqueId
      );
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
  setMiniCart,
} = cartSlice.actions;
export default cartSlice.reducer;
