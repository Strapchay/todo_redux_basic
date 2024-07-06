import { FaEllipsisVertical } from "react-icons/fa6";
import { BsListTask } from "react-icons/bs";
import { IoEyeOutline, IoTrashOutline } from "react-icons/io5";
import { GoArrowDown, GoArrowUp, GoPencil } from "react-icons/go";
import Modal from "./Modal";
import TaskForm from "./TaskForm";
import { getCompletedTaskCount } from "./helpers";
import { useDispatch, useSelector } from "react-redux";
import { addTrashItem, removeTrashItem } from "./trash/trashSlice";
import { removeTask } from "./tasks/taskSlice";
import ContentItem from "./ContentListBox";
import { useRef, useState } from "react";

function TaskType({ type, tasks }) {
  const taskTypeRef = useRef();
  const [heightCollapsed, setHeightCollapsed] = useState(false);

  function collapseTaskType() {
    if (heightCollapsed) taskTypeRef.current.style.height = "100%";
    else taskTypeRef.current.style.height = "1.9rem";
    setHeightCollapsed((h) => !h);
  }

  return (
    <div className="w-full flex gap-4 flex-col h-full" ref={taskTypeRef}>
      <TaskHeader
        type={type}
        tasks={tasks}
        heightCollapsed={heightCollapsed}
        collapseHeight={collapseTaskType}
      />
      <div className="flex gap-4 flex-col h-[60vh] overflow-y-auto max-lg:grid max-lg:grid-cols-3 max-lg:h-full max-md:grid-cols-2 max-sm:grid-cols-1">
        {tasks?.length > 0 &&
          tasks?.map((task) => (
            <ContentItem key={task.taskId} task={task} type={type} />
          ))}
        {!tasks?.length && (
          <div className="mt-8 flex items-center justify-center">
            Nothing to see here!
          </div>
        )}
        {/* <TaskContent /> */}
        {/* <TaskContent /> */}
        {/* <TaskContent /> */}
      </div>
    </div>
  );
}

function TaskHeader({ type, tasks, heightCollapsed, collapseHeight }) {
  return (
    <div className="flex justify-between items-center border-2 border-blue-400 rounded px-2 py-1">
      <h5 className="font-bold text-sm">
        {type}
        <span className="font-normal text-gray-400">({tasks.length})</span>
      </h5>
      <span className="cursor-pointer" onClick={collapseHeight}>
        {heightCollapsed ? <GoArrowDown /> : <GoArrowUp />}
      </span>
    </div>
  );
}

export default TaskType;
