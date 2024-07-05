export function getCompletedTaskCount(task) {
  return task.items.reduce((acc, cur) => (cur.completed ? (acc += 1) : acc), 0);
}

export function getDateValue(task) {
  return new Date(task.dueDate);
}
