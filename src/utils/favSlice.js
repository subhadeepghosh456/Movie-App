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
        // If the item exists, remove it from the list
        state.splice(itemIndex, 1);
      } else {
        // If the item does not exist, add it to the list
        state.push(action.payload);
      }
      // Update localStorage
      localStorage.setItem("favList", JSON.stringify(state));
    },
  },
});

export const { addToFav } = favSlice.actions;
export default favSlice.reducer;
