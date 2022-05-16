import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import singleProductReducer from './slices/singleProductSlice';
import cartSliceReducer from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    singleProduct: singleProductReducer,
    cart: cartSliceReducer,
  },
});
