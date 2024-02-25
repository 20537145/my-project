// userUpdateSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
  data: {},
  status: 'idle',
  error: null,
};

// Define the asynchronous thunk for updating user data
export const updateUser = createAsyncThunk('userUpdate/updateUser', async ({ userId, data }) => {
  try {
    const response = await axios.patch(`http://localhost:6010/${userId}`, data);
    return response.data;
  } catch (error) {
    // Handle error appropriately
    throw error;
  }
});

// Create a slice of the Redux store
const userUpdateSlice = createSlice({
  name: 'userUpdate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export the reducer and action creator
export default userUpdateSlice.reducer;
