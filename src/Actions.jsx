import { BiSortAlt2 } from "react-icons/bi";
import { LuListFilter } from "react-icons/lu";
import Modal from "./Modal";
import AddTagForm from "./AddTagForm";
import TaskForm from "./TaskForm";

function Actions() {
  return (
    <div className="flex flex-row justify-between items-center w-full">
      <div className="flex flex-row gap-4">
        <button className="border rounded h-6 text-gray-600 text-xs font-bold px-1 py-1 flex items-center justify-center gap-1">
          <span>
            <BiSortAlt2 fontSize={"15px"} />
          </span>
          Sort
        </button>
        <button className="border rounded h-6 text-gray-600 text-xs font-bold px-2 py-1 flex items-center justify-center gap-1">
          <span>
            <LuListFilter fontSize={"15px"} />
          </span>
          Filter
        </button>
      </div>

      <Modal>
        <ul className="flex flex-row items-center justify-center gap-2">
          {/* <li className="list-none">add item</li>
        <li className="list-none">add item</li> */}
          <li className="list-none">
            <Modal.Open opens="add-task-form">
              <button className="flex items-center h-8 justify-center rounded bg-blue-700 text-white px-4 py-1 text-xs">
                + Add task
              </button>
            </Modal.Open>
            <Modal.Window name="add-task-form">
              <TaskForm />
            </Modal.Window>
          </li>
          <li className="list-none">
            <Modal.Open opens="add-tag-form">
              <button className="flex items-center h-8 justify-center rounded bg-zinc-500 text-white px-4 py-1 text-xs">
                + Add tag
              </button>
            </Modal.Open>
            <Modal.Window name="add-tag-form">
              <AddTagForm />
            </Modal.Window>
          </li>
        </ul>
      </Modal>
    </div>
  );
}

export default Actions;
