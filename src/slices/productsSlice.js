import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request, gql } from 'graphql-request';

const url = 'http://localhost:4000/';

const initialState = {
  categories: [],
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
      console.log('RES:', res);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    displayItems: (state, action) => {
      console.log(state);
    },
  },
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.isLoading = true;
      console.log('pending');
    },
    [getProducts.fulfilled]: (state, action) => {
      console.log(action, state);
      state.isLoading = false;
      state.categories = action.payload.categories;
    },
    [getProducts.rejected]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      console.log('rejected');
    },
  },
});

export const { displayItems } = productsSlice.actions;

// console.log(cartSlice);
export default productsSlice.reducer;
