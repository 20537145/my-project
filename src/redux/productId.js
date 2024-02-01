// productsId.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching a single product by ID
export const fetchProductById = createAsyncThunk(
  'productsId/fetchProductById',  // Corrected the slice name here
  async (productId) => {
    const response = await axios.get(`https://h-royal-backned.onrender.com/products/${productId}`);
  

    return response.data.product;

  }
);

const productsId = createSlice({
  name: "productsId",  // Updated the slice name here
  initialState: {
    selectedProduct: null,
    error: null,
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
        state.error = null;
        state.status = 'succeeded';
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productsId.reducer;
