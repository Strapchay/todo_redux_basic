import { useSelector } from "react-redux";
import TaskType from "./TaskType";
import { getCompletedTaskCount, getDateValue } from "./helpers";

function Landing() {
  const tasks = useSelector((state) => state.tasks.tasks);

  const incompleteTasks =
    tasks.filter((task) => getCompletedTaskCount(task) < task.items.length) ??
    [];
  const completed =
    tasks.filter((task) => getCompletedTaskCount(task) === task.items.length) ??
    [];
  const curDate = new Date();
  const overDue = tasks.filter((task) => getDateValue(task) < curDate);
  return (
    <div className="flex flex-row justify-between w-full">
      <div className="grid grid-cols-3 gap-32 h-[70vh] w-full">
        <TaskType type="Incomplete" tasks={incompleteTasks} />
        <TaskType type="Completed" tasks={completed} />
        <TaskType type="Over-due" tasks={overDue} />
      </div>
    </div>
  );
}

export default Landing;
