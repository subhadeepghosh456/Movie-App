import { configureStore } from "@reduxjs/toolkit";
import favSlice from "./favSlice";

const store = configureStore({
  reducer: {
    favList: favSlice,
  },
});

export default store;
