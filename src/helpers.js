export function getCompletedTaskCount(task) {
  return task.items.reduce((acc, cur) => (cur.completed ? (acc += 1) : acc), 0);
}

export function ellipseText(text, len = 9) {
  if (text) {
    const value = text?.slice(0, len);
    return value + "...";
  }
  return "";
}

export function calcTimeRender(date) {
  const dateValue = new Date(date);
  const curDate = new Date() - dateValue;
  const daysValue = curDate / (1000 * 60 * 60 * 24);
  if (daysValue === 0) return "Today";
  if (daysValue === 1) return "Tomorrow";
  if (daysValue === -1) return "Yesterday";
  if (daysValue > 1 || daysValue < -1)
    return `${dateValue.getDay()}/${dateValue.getMonth() + 1}/${dateValue.getFullYear()}`;
}

export function getDateValue(task) {
  return new Date(task.dueDate);
}
