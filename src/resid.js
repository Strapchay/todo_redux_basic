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
