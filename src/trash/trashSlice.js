import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trash: [],
};

const trashSlice = createSlice({
  name: "trash",
  initialState,
  reducers: {
    addTrashItem(state, action) {
      state.trash = [...state.trash, action.payload];
    },
    removeTrashItem(state, action) {
      state.trash = state.trash.filter(
        (trash) => trash.trashId !== action.payload.trashId,
      );
    },
  },
});

export const { addTrashItem, removeTrashItem } = trashSlice.actions;
export default trashSlice.reducer;
