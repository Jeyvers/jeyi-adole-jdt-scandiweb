import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request, gql } from 'graphql-request';
import { useEffect } from 'react';

const url = 'http://localhost:4000/';

const initialState = {
  categories: [],
  productsList: [],
  currentCategory: 'all',
  amount: 0,
  total: 0,
  currency: null,
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

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async () => {
    try {
      const res = await request(url, query);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

// onclick((e) => setCategory(e.target.value)

// useEffect(() => {
//    const newproductsList = state.categories.find(
//      (category) => category.name === state.currentCategory
//    );

//    state.productsList = newproductsList.products;
//    console.log('ProductsList:', state.productsList);
// }, [state.currentCategory])

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
    [getProducts.pending]: (state) => {
      state.isLoading = true;
      console.log('pending');
    },

    [getProducts.fulfilled]: (state, action) => {
      state.isLoading = false;

      state.categories = action.payload.categories;

      const newproductsList = state.categories.find(
        (category) => category.name === state.currentCategory
      );

      state.productsList = newproductsList.products;
      console.log('ProductsList:', state.productsList);
    },

    [getProducts.rejected]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;

      console.log('rejected');
    },
  },
});

export const { displayItems, getCategory } = productsSlice.actions;

// console.log(cartSlice);
export default productsSlice.reducer;
