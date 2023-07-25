import { sidebarConstant } from "@/lib/constant";
import useGetLocalStorageData from "@/lib/customHooks/useGetLocalStorageData";
import { createSlice } from "@reduxjs/toolkit";

const initialState: { data: SideBar[] } = {
  data: sidebarConstant,
};
const sideBarSlice = createSlice({
  name: "sideBar",
  initialState,
  reducers: {
    setSideBar: (state) => {
      const prevComponents = useGetLocalStorageData("my_pc");
      let loop1 = 0;
      let loop2 = 0;

      const updatedSideBar = state.data.map((comp) => {
        loop1++;
        const selected = prevComponents?.find((item: NewPCComponent) => {
          loop2++;
          return (
            item.component ===
            comp.name.toLocaleLowerCase().split(" ").join("-")
          );
        });
        if (selected) {
          comp.selected = true;
        } else {
          comp.selected = false;
        }

        return comp;
      });

      state.data = updatedSideBar;
    },
  },
});

export const { setSideBar } = sideBarSlice.actions;

export default sideBarSlice.reducer;
