import { configureStore } from "@reduxjs/toolkit";
import authReducer from './userSlice.js';
import sheetReducer from './sheetSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    sheet: sheetReducer,
  },
});

export default store;