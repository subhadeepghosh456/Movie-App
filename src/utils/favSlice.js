import { createSlice } from "@reduxjs/toolkit";

const favSlice = createSlice({
  name: "fav",
  initialState: localStorage.getItem("favList")
    ? JSON.parse(localStorage.getItem("favList"))
    : [],
  reducers: {
    addToFav: (state, action) => {
      const itemIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.splice(itemIndex, 1);
      } else {
        state.push(action.payload);
      }

      localStorage.setItem("favList", JSON.stringify(state));
    },
  },
});

export const { addToFav } = favSlice.actions;
export default favSlice.reducer;
