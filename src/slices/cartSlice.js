import { createSlice, current } from '@reduxjs/toolkit';
import { uniqueId } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

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
      // Get chosen item from the list of products
      const item = state.products.find(
        (product) => product.id === action.payload.id
      );
      // Create new item using chosen item's details, and add new properties
      const fullItem = {
        ...item,
        uniqueId,
        amount: 1,
        selectedAttributes: action.payload.selectedAttributes,
      };
      // Check if the variants of the chosen item is already in cart
      const itemExists = state.cartItems.findIndex(
        (item) => item.id === fullItem.id
      );

      if (itemExists !== -1) {
        //If chosen item variant is already in cart, push to existing items object
        state.cartItems[itemExists].items.push(fullItem);
      } else {
        // Else, create a new object with selected item and add to cart
        state.cartItems.push({
          id: action.payload.id,
          items: [fullItem],
        });
      }
    },
    removeItem: (state, action) => {
      const itemId = action.payload.id;
      const uniqueId = action.payload.uniqueId;
      const item = state.cartItems.find((cartItem) => cartItem.id === itemId);

      if (item.items.length > 1) {
        let newItems = item.items.filter(
          (singleItem) => singleItem.uniqueId !== uniqueId
        );
        const newArray = state.cartItems.map((cartItem) =>
          cartItem.id === itemId ? { id: itemId, items: newItems } : cartItem
        );
        state.cartItems = newArray;
      } else {
        state.cartItems = state.cartItems.filter(
          (cartItem) => cartItem.id !== itemId
        );
      }
    },
    increase: (state, { payload }) => {
      const selectedItem = state.cartItems.find(
        (cartItem) => cartItem.id === payload.id
      );
      const singleItem = selectedItem.items.find(
        (item) => item.uniqueId === payload.uniqueId
      );

      singleItem.amount += 1;
    },
    decrease: (state, { payload }) => {
      const selectedItem = state.cartItems.find(
        (cartItem) => cartItem.id === payload.id
      );
      const singleItem = selectedItem.items.find(
        (item) => item.uniqueId === payload.uniqueId
      );

      singleItem.amount -= 1;
    },
    calculateTotals: (state, action) => {
      let amount = 0;
      let total = 0;

      state.cartItems?.forEach((cartItem) => {
        cartItem?.items?.forEach((item) => {
          const defaultPrice = item.prices?.find(
            (price) => price.currency.symbol === action.payload
          );
          amount += item.amount;
          if (defaultPrice) {
            total += item.amount * defaultPrice.amount;
          }
        });
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
