import { configureStore } from "@reduxjs/toolkit";
import apiCreator from "./features/api/apiCreator";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import sideBarSlice from "./features/sidebar/sideBarSlice";
import newPCSlice from "./features/pc/newPCSlice";

export const store = configureStore({
  reducer: {
    [apiCreator.reducerPath]: apiCreator.reducer,
    newPC: newPCSlice,
    sideBar: sideBarSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiCreator.middleware),
});

setupListeners(store.dispatch);
