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

      return res;
    } catch (error) {}
  }
);

const singleProductSlice = createSlice({
  name: 'singleProduct',
  initialState: {
    productData: [],
    attributes: {},
  },
  reducers: {
    setAttributeValue: (state, action) => {
      state.attributes[action.payload.name] = action.payload.value;
    },
  },
  extraReducers: {
    [getSingleProductData.fulfilled]: (state, action) => {
      const newAttrArray = {};
      state.productData = action.payload.product;
      action.payload.product.attributes.map((attribute) => {
        const { name, items } = attribute;
        return (newAttrArray[name] = items[0].value);
      });
      state.attributes = newAttrArray;
    },
  },
});

export const { setAttributeValue } = singleProductSlice.actions;

export default singleProductSlice.reducer;
