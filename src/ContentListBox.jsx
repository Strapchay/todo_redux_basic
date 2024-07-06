import { useDispatch, useSelector } from "react-redux";
import { addTrashItem, removeTrashItem } from "./trash/trashSlice";
import { addTask, removeTask, restoreTaskFromTrash } from "./tasks/taskSlice";
import { FaEllipsisVertical } from "react-icons/fa6";
import { BsListTask } from "react-icons/bs";
import { calcTimeRender, ellipseText, getCompletedTaskCount } from "./helpers";
import { IoEyeOutline, IoTrashOutline } from "react-icons/io5";
import { LiaTrashRestoreAltSolid } from "react-icons/lia";
import Modal from "./Modal";
import { GoPencil } from "react-icons/go";
import TaskForm from "./TaskForm";

function ContentItem({ task, type, trashId = null }) {
  return (
    <div className="flex flex-col gap-2">
      <ContentTags task={task} />
      <ContentDetails task={task} type={type} trashId={trashId} />
    </div>
  );
}

function ContentDetails({ task, type, trashId }) {
  const dispatch = useDispatch();

  function handleTrashDelete(trashId) {
    dispatch(removeTrashItem({ trashId }));
  }

  function handleTrashRestore() {
    const trashPayload = Object.assign({}, task);
    handleTrashDelete(trashId);
    delete trashPayload.trashId;
    dispatch(restoreTaskFromTrash(trashPayload));
  }

  function handleTaskDelete() {
    if (trashId) {
      handleTrashDelete(trashId);
      return;
    }
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
          <span className="cursor-pointer" onClick={handleTaskDelete}>
            <IoTrashOutline />
          </span>
          {!trashId && (
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
          )}
          {trashId && (
            <span className="cursor-pointer" onClick={handleTrashRestore}>
              <LiaTrashRestoreAltSolid size={20} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function ContentTags({ task }) {
  const taskTags = useSelector((state) =>
    state.tags.tags.filter((tag) => task.tags.includes(tag.tagId)),
  );
  const firstTwoTags = taskTags.slice(0, 2);

  return (
    <ul className="flex flex-row justify-between pr-4 w-full h-6">
      {firstTwoTags.length > 0 && (
        <li className="rounded px-3 py-1 h-full text-sm flex items-center justify-center bg-red-100 text-gray-500">
          {ellipseText(firstTwoTags[0]?.tagName)}
        </li>
      )}
      <li className="rounded px-3 py-1 flex items-center justify-center h-full text-sm bg-white shadow-gray-400 shadow-sm text-blue-600">
        {calcTimeRender(task.dueDate)}
      </li>
      {firstTwoTags?.[1]?.tagName && (
        <li className="rounded flex items-center justify-center px-3 py-1 h-full text-sm bg-blue-100 text-blue-600">
          {ellipseText(firstTwoTags?.[1]?.tagName)}
        </li>
      )}
      {!firstTwoTags.length && (
        <li className="rounded flex items-center justify-center px-3 py-1 h-full text-sm bg-red-700 text-red-100">
          Tags Missing
        </li>
      )}
    </ul>
  );
}

export default ContentItem;
