import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createProduct = createAsyncThunk('product/createProduct', async (productData) => {
  try {
    const response = await axios.post('https://h-royal-backned.onrender.com/products/create', productData);
    return response.data.product;
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error('Error creating product.');
  }
});

const productSlice = createSlice({
  name: 'product',
  initialState: {
    createdProduct: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.createdProduct = action.payload;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
