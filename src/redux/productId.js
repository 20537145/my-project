import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductById = createAsyncThunk(
  'productsId/fetchProductById',
  async (productId) => {
    const response = await axios.get(`http://localhost:6010/products/${productId}`);
    return response.data.product;
  }
);

const productsId = createSlice({
  name: "productsId",
  initialState: {
    selectedProduct: null,
    cart: [], // Ensure that cart is initialized as an empty array
    error: null,
    status: 'idle',
  },
  reducers: {
    addToCart: (state, action) => {
      // Use Immer to update the state in a mutable way
      state.cart.push(action.payload);
    },
  },
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

export const { addToCart } = productsId.actions;
export default productsId.reducer;
