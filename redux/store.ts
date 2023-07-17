import { configureStore } from "@reduxjs/toolkit";
import savedPCReducer from "./features/savedPC/savedPCSlice";
import apiCreator from "./features/api/apiCreator";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    [apiCreator.reducerPath]: apiCreator.reducer,
    savedPc: savedPCReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiCreator.middleware),
});

setupListeners(store.dispatch);
