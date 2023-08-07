import { Middleware, configureStore } from "@reduxjs/toolkit";
import apiCreator from "./features/api/apiCreator";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import sideBarSlice, { setSideBar } from "./features/sidebar/sideBarSlice";
import newPCSlice from "./features/pc/newPCSlice";
import extraSlice, { setQuery } from "./features/extra/extraSlice";

// => Custom MiddleWare
const myCustomMiddleWare: Middleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    const response = next(action);

    // *** Do something after the action hits the reducer ***//

    // => getState from store
    const {
      newPC,
      extra: { currentCategory },
    } = getState();

    // => Function for update queryKey, queryValue, and setSkip
    function myFunc() {
      if (newPC.data?.length > 0) {
        const comp = newPC.data?.find(
          (item: NewPCComponent) => item.component === currentCategory
        );

        if (comp?.productID) {
          dispatch(
            setQuery({
              queryKey: "_id",
              queryValue: comp?.productID,
              skip: false,
            })
          );
        } else {
          dispatch(
            setQuery({
              queryKey: "category",
              queryValue: currentCategory,
              skip: false,
            })
          );
        }
      } else {
        dispatch(
          setQuery({
            queryKey: "category",
            queryValue: currentCategory,
            skip: false,
          })
        );
      }
    }

    if (action.type === "extra/setCurrentCategory") {
      // => set qyeryKey and queryValue
      myFunc();
    }

    if (action.type?.includes("newPC")) {
      // => set queryKey, queryValue, and setSkip
      myFunc();

      // => If user not select an item didn't set set sideBar and return response
      if (action.type === "newPC/getNewPC" && newPC?.data?.length === 0) {
        return response;
      }

      // => update sideBar based on user selected item
      dispatch(setSideBar());
    }

    return response;
  };

// => Redux Global store
export const store = configureStore({
  reducer: {
    [apiCreator.reducerPath]: apiCreator.reducer,
    newPC: newPCSlice,
    sideBar: sideBarSlice,
    extra: extraSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiCreator.middleware)
      .concat(myCustomMiddleWare),
});

setupListeners(store.dispatch);
