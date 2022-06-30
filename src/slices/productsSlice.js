import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request, gql } from 'graphql-request';

const url = 'http://localhost:4000/';

const initialState = {
  categories: [],
  productsList: [],
  allItems: [],
  currentCategory: 'all',
  currencyInUse: '$',
  currencies: null,
  isLoading: true,
};

const query = gql`
  {
    categories {
      name

      products {
        id
        name
        inStock
        gallery
        description
        category

        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        brand
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
    currencies {
      label
      symbol
    }
  }
`;

export const getData = createAsyncThunk('products/getData', async () => {
  try {
    const res = await request(url, query);
    return res;
  } catch (error) {}
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getCategory: (state, action) => {
      state.currentCategory = action.payload;
      const newproductsList = state.categories.find(
        (category) => category.name === state.currentCategory
      );
      state.productsList = newproductsList.products;
    },
    changeCurrency: (state, action) => {
      state.currencyInUse = action.payload;
    },
  },

  extraReducers: {
    [getData.pending]: (state) => {
      state.isLoading = true;
    },

    [getData.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.allItems = action.payload.categories;
      state.categories = action.payload.categories;
      state.currencies = action.payload.currencies;

      const newproductsList = state.categories.find(
        (category) => category.name === state.currentCategory
      );

      state.productsList = newproductsList.products;
    },

    [getData.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const { displayItems, getCategory, changeCurrency } =
  productsSlice.actions;

export default productsSlice.reducer;
