import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
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
        state.tasks = [...state.tasks, action.payload];
      },
    },
    removeTask(state, action) {
      state.tasks = state.tasks.filter(
        (task) => task.taskId !== action.payload.taskId,
      );
    },
    removeTaskItem(state, action) {
      const curTaskIndex = state.tasks.findIndex(
        (task) => task.taskId === action.payload.taskId,
      );
      const curTask = state.tasks[curTaskIndex];
      curTask.items = curTask.items.filter(
        (item) => item.itemId !== action.payload.itemId,
      );
      const modTasks = [...state.tasks];
      const swapTasks = modTasks.splice(
        curTaskIndex,
        curTaskIndex + 1,
        curTask,
      );
      state.tasks = swapTasks;
    },
    updateTask(state, action) {
      const taskIndex = state.tasks.findIndex(
        (task) => task.taskId === action.payload.taskId,
      );
      const modState = [...state.tasks];
      modState.splice(taskIndex, 1, action.payload);
      state.tasks = modState;
    },
    updateTaskItem(state, action) {
      const curTaskIndex = state.tasks.findIndex(
        (task) => task.taskId === action.payload.taskId,
      );
      const curTask = Object.assign({}, state.tasks[curTaskIndex]);
      const curTaskItemIndex = curTask.items.findIndex(
        (item) => item.itemId === action.payload.item.itemId,
      );

      curTask.items = curTask.items.splice(
        curTaskItemIndex,
        1,
        action.payload.item,
      );

      const modTasks = [...state.tasks];
      const swapTasks = modTasks.splice(curTaskIndex, 1, curTask);
      state.tasks = swapTasks;
    },
  },
});

export const {
  addTask,
  removeTask,
  updateTask,
  removeTaskItem,
  updateTaskItem,
} = taskSlice.actions;

export default taskSlice.reducer;

// function taskReducer(state = initialTaskState, action) {
//   switch (action.type) {
//     case "task/addTask":
//       return { ...state, tasks: [...state.tasks, action.payload] };

//     case "task/removeTask":
//       return {
//         ...state,
//         tasks: state.tasks.filter((task) => task.id !== action.payload.id),
//       };

//     case "task/updateTask": {
//       const taskIndex = state.tasks.findIndex(
//         (task) => task.id === action.payload.id,
//       );
//       const modState = [...state.tasks];
//       const swapState = modState.splice(
//         taskIndex,
//         taskIndex + 1,
//         action.payload,
//       );
//       return {
//         ...state,
//         tasks: swapState,
//       };
//     }
//   }
// }
