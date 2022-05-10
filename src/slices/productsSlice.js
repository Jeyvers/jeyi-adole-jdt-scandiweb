import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request, gql } from 'graphql-request';

const url = 'http://localhost:4000/';

const initialState = {
  categories: [],
  productsList: [],
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
        gallery
        name
        inStock
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
    changeCurrency: (state, action) => {
      state.currencyInUse = action.payload;
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

      const newproductsList = state.categories.find(
        (category) => category.name === state.currentCategory
      );

      state.productsList = newproductsList.products;
      console.log(state.productsList);
    },

    [getData.rejected]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;

      console.log('rejected');
    },
  },
});

export const { displayItems, getCategory, changeCurrency } =
  productsSlice.actions;

// console.log(cartSlice);
export default productsSlice.reducer;
