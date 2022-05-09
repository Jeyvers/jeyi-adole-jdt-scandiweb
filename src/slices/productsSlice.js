import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request, gql } from 'graphql-request';
import { useEffect } from 'react';

const url = 'http://localhost:4000/';

const initialState = {
  categories: [],
  productsList: [],
  currentCategory: 'all',
  currencies: null,
  isLoading: true,
};

const query = gql`
  {
    categories {
      name
      products {
        id
        gallery
        name
      }
    }
    currencies {
      label
      symbol
    }
  }
`;

// Fetching individual categories.
// {
//   category(input: { title: "tech" }) {
//     name
//     products {
//       id
//       gallery
//       name
//     }
//   }
// }

export const getData = createAsyncThunk('products/getData', async () => {
  try {
    const res = await request(url, query);
    return res;
  } catch (error) {
    console.log(error);
  }
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    displayItems: (state, action) => {},
    getCategory: (state, action) => {
      state.currentCategory = action.payload;
      const newproductsList = state.categories.find(
        (category) => category.name === state.currentCategory
      );
      state.productsList = newproductsList.products;
    },
  },

  extraReducers: {
    [getData.pending]: (state) => {
      state.isLoading = true;
      console.log('pending');
    },

    [getData.fulfilled]: (state, action) => {
      state.isLoading = false;

      state.categories = action.payload.categories;
      state.currencies = action.payload.currencies;
      console.log('PAYLOAD:', action.payload);

      const newproductsList = state.categories.find(
        (category) => category.name === state.currentCategory
      );

      state.productsList = newproductsList.products;
      console.log('STATE:', state.products);
    },

    [getData.rejected]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;

      console.log('rejected');
    },
  },
});

export const { displayItems, getCategory } = productsSlice.actions;

// console.log(cartSlice);
export default productsSlice.reducer;
