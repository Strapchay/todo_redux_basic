import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tags: [],
};

const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    addTag: {
      prepare(payload) {
        return {
          payload: { ...payload, tagId: crypto.randomUUID() },
        };
      },

      reducer(state, action) {
        state.tags = [...state.tags, action.payload];
      },
    },
    removeTag: {
      reducer(state, action) {
        state.tags = state.tags.filter(
          (tag) => tag.tagId !== action.payload.tagId,
        );
      },
    },
    updateTag: {
      reducer(state, action) {
        const tagIndex = state.tags.findIndex(
          (tag) => tag.tagId === action.payload.tagId,
        );
        const tagsRep = [...state.tags];
        tagsRep.splice(tagIndex, 1, action.payload);
        state.tags = tagsRep;
      },
    },
  },
});

export const { removeTag, updateTag, addTag } = tagSlice.actions;
export default tagSlice.reducer;
