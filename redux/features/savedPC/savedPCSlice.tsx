import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allPC: [],
};

const savedPCSlice = createSlice({
  name: "savedPC",
  initialState,
  reducers: {
    getPC: (state, action) => {
      state.allPC = action.payload;
    },
  },
});

export const { getPC } = savedPCSlice.actions;

export default savedPCSlice.reducer;
