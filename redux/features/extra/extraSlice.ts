import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentCategory: "cpu",
  query: {
    queryKey: "category",
    queryValue: "cpu",
    skip: true,
  },
};

const extraSlice = createSlice({
  name: "extra",
  initialState,
  reducers: {
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
});

export const { setCurrentCategory, setQuery } = extraSlice.actions;

export default extraSlice.reducer;
