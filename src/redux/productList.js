import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk('carte/fetchProducts',async()=>{
  const res = await axios.get('https://h-royal-backned.onrender.com/products/list')
  return res.data
})
export const searchProduct = createAsyncThunk('product/searchProduct', async (searchTerm, { rejectWithValue }) => {
  try {
    const response = await axios.get(`https://h-royal-backned.onrender.com/products/search?name=${searchTerm}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
const productsCard = createSlice({
  name:"productsList",
  initialState:{
    products:[],
    error:null,
    status: 'idle',
    searchTerm: '',
    searchResults: [],
    
  },
  reducers:{
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers:builder=>{
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    })
    .addCase(fetchProducts.fulfilled,(state,action)=>{
      state.products = action.payload
      state.error = null
      state.status = 'succeeded';

    })
    .addCase(fetchProducts.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    })
    .addCase(searchProduct.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(searchProduct.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.searchResults = action.payload;
    })
    .addCase(searchProduct.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  }
})
export const { setSearchTerm } = productsCard.actions;
export default productsCard.reducer