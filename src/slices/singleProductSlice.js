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
  initialState: {
    productData: [],
    attributes: {},
  },
  reducers: {
    setAttributeValue: (state, action) => {
      console.log(action.payload.name, action.payload.value);
      state.attributes[action.payload.name] = action.payload.value;
      console.log('ATTR', state.attributes[action.payload.name]);
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
      console.log('STATE', state.productData);
      console.log('ATTR', state.attributes);
    },
  },
});

export const { setAttributeValue } = singleProductSlice.actions;

export default singleProductSlice.reducer;
