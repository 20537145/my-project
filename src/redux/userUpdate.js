import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  userId: JSON.parse(localStorage.getItem('user')),
  data: {},
  status: 'idle',
  error: null,
};

export const updateUser = createAsyncThunk('userUpdate/updateUser', async ({ userId, data }) => {
  try {
    const response = await axios.patch(`https://h-royal-backned.onrender.com/profile/${userId}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
});

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

export default userUpdateSlice.reducer;
