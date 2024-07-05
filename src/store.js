import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./tasks/taskSlice";
import tagReducer from "./tasks/tagSlice";

import trashReducer from "./trash/trashSlice";

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    trashs: trashReducer,
    tags: tagReducer,
  },
});

export default store;
