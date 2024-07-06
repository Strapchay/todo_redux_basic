import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  currentIndex: 0,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: {
      prepare(payload) {
        return {
          payload: { ...payload, taskId: crypto.randomUUID() },
        };
      },
      reducer(state, action) {
        state.currentIndex += 1;
        action.payload.index = state.currentIndex;
        state.tasks = [...state.tasks, action.payload];
      },
    },
    removeTask(state, action) {
      state.tasks = state.tasks.filter(
        (task) => task.taskId !== action.payload.taskId,
      );
    },
    updateTask(state, action) {
      const taskIndex = state.tasks.findIndex(
        (task) => task.taskId === action.payload.taskId,
      );
      const modState = [...state.tasks];
      modState.splice(taskIndex, 1, action.payload);
      state.tasks = modState;
    },
    restoreTaskFromTrash(state, action) {
      const deletedTaskIndex = state.tasks.findLastIndex(
        (task) => task.index < action.payload.index,
      );
      const modState = [...state.tasks];
      modState.splice(deletedTaskIndex + 1, 0, action.payload);
      state.tasks = modState;
    },
    removeTagFromTasks(state, action) {
      const modState = [...state.tasks];
      modState.forEach((task) => {
        const taskTags = task.tags.filter(
          (tag) => tag !== action.payload.tagId,
        );
        task.tags = taskTags;
      });
      state.tasks = modState;
    },
  },
});

export const {
  addTask,
  removeTask,
  updateTask,
  restoreTaskFromTrash,
  removeTagFromTasks,
} = taskSlice.actions;

export default taskSlice.reducer;
