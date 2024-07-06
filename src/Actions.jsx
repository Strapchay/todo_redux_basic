import { BiSortAlt2 } from "react-icons/bi";
import { LuListFilter } from "react-icons/lu";
import Modal from "./Modal";
import AddTagForm from "./AddTagForm";
import TaskForm from "./TaskForm";
import { useContext } from "react";
import { LandingContext } from "./Landing";

const BASE =
  "border rounded h-6 text-gray-600 dark:bg-gray-300  text-xs font-bold px-1 py-1 flex items-center justify-center gap-1 cursor-pointer";
const actionBtnStyling = {
  base: BASE,
  active: BASE + ` bg-zinc-500 dark:bg-gray-400 dark:text-black text-white`,
};

function Actions() {
  const { sortState, setSortState } = useContext(LandingContext);

  function handleSort() {
    if (!sortState) {
      setSortState(true);
    } else setSortState(false);
  }

  return (
    <div className="flex flex-row justify-between items-center w-full">
      <div className="flex flex-row gap-4">
        <button
          className={
            sortState ? actionBtnStyling.active : actionBtnStyling.base
          }
          onClick={handleSort}
        >
          <span>
            <BiSortAlt2 fontSize={"15px"} />
          </span>
          Sort
        </button>
        {/* <button
          className={filter ? actionBtnStyling.active : actionBtnStyling.base}
          onClick={handleFilter}
        >
          <span>
            <LuListFilter fontSize={"15px"} />
          </span>
          Filter
        </button> */}
      </div>

      <Modal>
        <ul className="flex flex-row items-center justify-center gap-2">
          {/* <li className="list-none">add item</li>
        <li className="list-none">add item</li> */}
          <li className="list-none">
            <Modal.Open opens="add-task-form">
              <button className="flex items-center h-8 justify-center rounded dark:text-blue-100 bg-blue-700 text-white px-4 py-1 text-xs">
                + Add task
              </button>
            </Modal.Open>
            <Modal.Window name="add-task-form">
              <TaskForm />
            </Modal.Window>
          </li>
          <li className="list-none">
            <Modal.Open opens="add-tag-form">
              <button className="flex items-center h-8 justify-center rounded dark:text-blue-100 bg-zinc-500 text-white px-4 py-1 text-xs">
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
