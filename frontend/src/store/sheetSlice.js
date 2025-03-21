import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedSheet:null,
};

const sheetSlice = createSlice({
  name: "sheet",
  initialState,
  reducers: {
    selectSheet: (state, action) => {
      state.selectedSheet = action.payload;
    },
  },
});

export const { selectSheet } = sheetSlice.actions;
export default sheetSlice.reducer;