import useGetLocalStorageData from "@/lib/customHooks/useGetLocalStorageData";
import { createSlice } from "@reduxjs/toolkit";

const initialState: { data: NewPCComponent[] } = {
  data: [],
};

const newPCSlice = createSlice({
  name: "newPC",
  initialState,
  reducers: {
    getNewPC: (state) => {
      const prevComponents = useGetLocalStorageData("my_pc");
      state.data = prevComponents || [];
    },
    setNewPC: (state, action) => {
      const prevComponents = useGetLocalStorageData("my_pc");
      let updated = false;
      const updatedComponents =
        prevComponents &&
        prevComponents.map((item: NewPCComponent) => {
          if (item.component === action.payload.category) {
            // update component
            item.productID = action.payload.productID;
            updated = true;
          }
          return item;
        });

      if (updated) {
        state.data = updatedComponents;
        return localStorage.setItem("my_pc", JSON.stringify(updatedComponents));
      } else {
        const newComponents = [
          ...state.data,
          {
            component: action.payload.category,
            productID: action.payload.productID,
          },
        ];
        state.data = newComponents;
        // => update localStorage

        return localStorage.setItem("my_pc", JSON.stringify(newComponents));
      }
    },
    deleteNewPC: (state, action) => {
      const prevComponents = useGetLocalStorageData("my_pc");

      if (prevComponents) {
        const filteredComponents =
          prevComponents &&
          prevComponents.filter((component: NewPCComponent) => {
            if (component.component === action.payload.category) {
              return false;
            }
            return true;
          });
        state.data = filteredComponents;
        // => update localStorage
        return localStorage.setItem(
          "my_pc",
          JSON.stringify(filteredComponents)
        );
      }
    },
  },
});

export const { getNewPC, setNewPC, deleteNewPC } = newPCSlice.actions;

export default newPCSlice.reducer;
