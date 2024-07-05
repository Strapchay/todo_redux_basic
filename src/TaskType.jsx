import { FaEllipsisVertical } from "react-icons/fa6";
import { BsListTask } from "react-icons/bs";
import { IoEyeOutline, IoTrashOutline } from "react-icons/io5";
import { GoPencil } from "react-icons/go";
import Modal from "./Modal";
import TaskForm from "./TaskForm";
import { getCompletedTaskCount } from "./helpers";
import { useDispatch, useSelector } from "react-redux";
import { addTrashItem, removeTrashItem } from "./trash/trashSlice";
import { removeTask } from "./tasks/taskSlice";

function TaskType({ type, tasks }) {
  return (
    <div className="w-full flex gap-4 flex-col h-full">
      <TaskHeader type={type} tasks={tasks} />
      <div className="flex gap-4 flex-col h-[60vh] overflow-y-auto">
        {tasks?.length > 0 &&
          tasks?.map((task) => (
            <TaskContent key={task.taskId} task={task} type={type} />
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

function TaskHeader({ type, tasks }) {
  return (
    <div className="flex justify-between items-center border-2 border-blue-400 rounded px-2 py-1">
      <h5 className="font-bold text-sm">
        {type}{" "}
        <span className="font-normal text-gray-400">({tasks.length})</span>
      </h5>
      <span>
        <FaEllipsisVertical />
      </span>
    </div>
  );
}

function TaskContent({ task, type }) {
  return (
    <div className="flex flex-col gap-2">
      <TaskContentTags />
      <TaskDetails task={task} type={type} />
    </div>
  );
}

function TaskDetails({ task, type }) {
  const dispatch = useDispatch();
  function handleTaskDelete() {
    dispatch(addTrashItem(task));
    dispatch(removeTask({ taskId: task.taskId }));
  }

  return (
    <div className="py-2 px-2 bg-gray-200 rounded gap-3 flex flex-col">
      <div className="flex flex-row justify-between text-gray-700">
        <h3 className="font-bold ">{task.title}</h3>
        <span>
          <FaEllipsisVertical />
        </span>
      </div>
      <div className="pr-4 flex flex-col gap-2">
        <p className="text-xs text-gray-500">{task.description}</p>
        <div className="border min-w-10 h-5 flex items-center justify-center text-gray-500 max-w-12 py-1 px-2 border-gray-400 rounded text-sm flex-row gap-1 bg-gray-100">
          <span>
            <BsListTask />
          </span>
          {getCompletedTaskCount(task)}/{task.items.length}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="border border-gray-100 bg-gray-300 text-gray-500 py-1 px-2 text-sm rounded">
          {type}
        </div>
        <div className="flex flex-row gap-2 text-lg">
          <span>
            <IoEyeOutline />
          </span>
          <span className="cursor-pointer" onClick={handleTaskDelete}>
            <IoTrashOutline />
          </span>
          <Modal>
            <Modal.Open opens="update-task-form">
              <span className="cursor-pointer">
                <GoPencil />
              </span>
            </Modal.Open>
            <Modal.Window name="update-task-form">
              <TaskForm taskId={task.taskId} />
            </Modal.Window>
          </Modal>
        </div>
      </div>
    </div>
  );
}

function TaskContentTags() {
  return (
    <ul className="flex flex-row justify-between pr-4 w-full h-6">
      <li className="rounded px-3 py-1 h-full text-sm flex items-center justify-center bg-red-100 text-gray-500">
        High
      </li>
      <li className="rounded px-3 py-1 flex items-center justify-center h-full text-sm bg-white shadow-gray-400 shadow-sm text-blue-600">
        6:00 PM
      </li>
      <li className="rounded flex items-center justify-center px-3 py-1 h-full text-sm bg-blue-100 text-blue-600">
        UX Design
      </li>
    </ul>
  );
}

export default TaskType;
