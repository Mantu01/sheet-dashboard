import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    addSheets: (state, action) => {
      state.user.sheet = [...state.user.sheet,action.payload];
    },
  },
});

export const { login, logout,addSheets } = authSlice.actions;

export default authSlice.reducer;