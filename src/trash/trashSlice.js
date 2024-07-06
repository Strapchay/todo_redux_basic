import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trashs: [],
};

const trashSlice = createSlice({
  name: "trash",
  initialState,
  reducers: {
    addTrashItem: {
      prepare(payload) {
        return { payload: { ...payload, trashId: crypto.randomUUID() } };
      },

      reducer(state, action) {
        state.trashs = [...state.trashs, action.payload];
      },
    },
    removeTrashItem(state, action) {
      state.trashs = state.trashs.filter(
        (trash) => trash.trashId !== action.payload.trashId,
      );
    },
  },
});

export const { addTrashItem, removeTrashItem } = trashSlice.actions;
export default trashSlice.reducer;
