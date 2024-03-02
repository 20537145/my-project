import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  user: null,
  isAuth: false,
  token: localStorage.getItem("x-auth-token") || null,
  error: null,
  users: [],
  status: "",
};
export const fetchUserProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (token, { rejectWithValue }) => {
    try {
      const res = await axios.get("https://h-royal-backned.onrender.com/profile", {
        headers: {
          "x-auth-token": token,
        },
      });

      return res.data;
    } catch (error) {
      return rejectWithValue({ error: error.response.data.message });
    }
  }
);
export const registerUser = createAsyncThunk(
  "auth/register",
  async (newUser, { rejectedWithValue }) => {
    try {
      const res = await axios.post("https://h-royal-backned.onrender.com/register", newUser);
      return res.data;
    } catch (error) {
      return rejectedWithValue(error.response.data.message);
    }
  }
);
export const loginUser = createAsyncThunk(
  "auth/login",
  async (check, { rejectedWithValue, dispatch }) => {
    try {
      const res = await axios.post("https://h-royal-backned.onrender.com/login", check);
      dispatch(fetchUserProfile(res.data.token));
      return res.data;
    } catch (error) {
      return rejectedWithValue(error.response.data.message);
    }
  }
);
// http://localhost:6010
export const fetchAllUsers = createAsyncThunk(
  "auth/fetchUsers",
  async (token, { rejectedWithValue }) => {
    try {
      const res = await axios.get("https://h-royal-backned.onrender.com/all", {
        headers: {
          "x-auth-token": token,
        },
      });
      if (res.status === 200) {
        return res.data;
      } else {
        console.log("error fetching all users");
      }
    } catch (error) {
      return rejectedWithValue(error.response.data.msg);
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("cart");
      state.isAuth = false;
      state.user = null;
      state.token = null;
      state.error = null;
    },
    setAuthStatus: (state, action) => {
      state.isAuth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = null;
        state.isAuth = false;
        state.error = null;
        state.status = "registered";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isAuth = false;
        state.user = null;
        state.token = null;
        state.error = action.payload;
        state.status = "Registration failed. Please try again.";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.token);
        state.isAuth = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        localStorage.removeItem("token");
        state.isAuth = null;
        state.user = null;
        state.token = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuth = true;
        state.token = action.payload.token;
        state.error = null;
        state.users = action.payload.users;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuth = true;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.error = action.payload.error;
        localStorage.removeItem("token");
        state.isAuth = null;
        state.user = null;
        state.token = null;
        console.log(state.error);
      });
  },
});
export const { setAuthStatus, logout } = authSlice.actions;
export default authSlice.reducer;
