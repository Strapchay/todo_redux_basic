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

// export function addTrashItem(item) {
//   return {
//     type: "trash/addTrashItem",
//     payload: { trashId: Crypto.randomUUID(), item },
//   };
// }

// export function removeTrashItem(trashId) {
//   return { type: "trash/removeTrashItem", payload: { trashId } };
// }

// function trashReducer(state = initialTrashState, action) {
//   switch (action.type) {
//     case "trash/addTrashItem":
//       return {
//         ...state,
//         trash: [...state.trash, action.payload],
//       };

//     case "trash/removeTrashItem":
//       return {
//         ...state,
//         trash: state.trash.filter((trash) => trash.id !== action.payload.id),
//       };
//   }
// }
