import { useSelector } from "react-redux";
import TaskType from "./TaskType";
import Header from "./Header";
import Actions from "./Actions";

import { getCompletedTaskCount, getDateValue } from "./helpers";
import { useContext } from "react";
import { createContext } from "react";
import { useState } from "react";

export const LandingContext = createContext();

function LandingBox({ children }) {
  const [sortState, setSortState] = useState(false);
  const [searchState, setSearchState] = useState("");
  const tasks = useSelector((state) => state.tasks.tasks);
  const sortedTasks = tasks.slice()?.sort((a, b) => a?.title > b?.title);
  const actionedTasks = sortState
    ? tasks.slice()?.sort((a, b) => a.title > b.title)
    : tasks;
  const searchedTasks =
    searchState.length > 0
      ? actionedTasks.filter((task) => task.title.includes(searchState))
      : actionedTasks;

  const incompleteTasks =
    searchedTasks.filter(
      (task) => getCompletedTaskCount(task) < task.items.length,
    ) ?? [];
  const completed =
    searchedTasks.filter(
      (task) => getCompletedTaskCount(task) === task.items.length,
    ) ?? [];
  const curDate = new Date();
  const overDue = searchedTasks
    .filter((task) => getDateValue(task) < curDate)
    .filter((task) => getCompletedTaskCount(task) < task.items.length);

  return (
    <LandingContext.Provider
      value={{
        tasks,
        incompleteTasks,
        completed,
        overDue,
        sortState,
        setSortState,
        searchState,
        setSearchState,
      }}
    >
      {children}
    </LandingContext.Provider>
  );
}

function Landing() {
  return (
    <LandingBox>
      <LandingContent />
    </LandingBox>
  );
}

function LandingContent() {
  const { tasks, incompleteTasks, completed, overDue } =
    useContext(LandingContext);
  //max-lg:overflow-y-auto
  return (
    <>
      <div className="flex flex-col gap-12">
        <Header />
        <Actions />
      </div>
      <div className="flex flex-row justify-between w-full max-lg:h-[80vh]">
        <div className="grid grid-cols-3 h-[70vh] max-lg:h-full w-full gap-32 max-xl:gap-20 max-lg:grid-cols-1 max-lg:gap-5">
          <TaskType type="Incomplete" tasks={incompleteTasks} />
          <TaskType type="Completed" tasks={completed} />
          <TaskType type="Over-due" tasks={overDue} />
        </div>
      </div>
    </>
  );
}

export default Landing;
