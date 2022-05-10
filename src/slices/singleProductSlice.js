import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request, gql } from 'graphql-request';

const url = 'http://localhost:4000/';

export const getSingleProductData = createAsyncThunk(
  'singleProduct/getSingleProductData',

  async (productId) => {
    const query = gql`
      {
        product(id: "${productId}") {
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
    `;

    try {
      const res = await request(url, query);
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

const singleProductSlice = createSlice({
  name: 'singleProduct',
  initialState: [],
  reducers: {},
  extraReducers: {
    [getSingleProductData.fulfilled]: (state, action) => {
      state = action.payload.product;
      console.log('ACTION:', action);
      console.log('STATE', state);
    },
  },
});

export default singleProductSlice.reducer;
