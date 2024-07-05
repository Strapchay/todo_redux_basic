import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addTask, removeTaskItem, updateTask } from "./tasks/taskSlice";
import { IoTrashOutline } from "react-icons/io5";
import { GoPencil } from "react-icons/go";
import { HiXMark } from "react-icons/hi2";
import { updateTag } from "./tasks/tagSlice";
import { useEffect } from "react";
import { useRef } from "react";

const initialTaskDetails = {
  title: "",
  description: "",
  items: [],
  tags: [],
  dueDate: "",
};
const initialEditingItemState = {
  isEditing: false,
  itemId: null,
};
const TaskContext = createContext();

function TaskContainer({ children }) {
  return (
    <div className="mt-4 overflow-auto flex flex-col gap-4">{children}</div>
  );
}

function TaskFormBox({ children, onCloseModal, taskId }) {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.tags.tags);
  const tasks = useSelector((state) => state.tasks.tasks);
  const task = taskId && tasks.find((task) => task.taskId === taskId);
  const [taskDetails, setTaskDetails] = useState(
    task ? task : initialTaskDetails,
  );
  const [addItem, setAddItem] = useState(false);
  const [editingItem, setEditingItem] = useState(initialEditingItemState);

  return (
    <TaskContext.Provider
      value={{
        dispatch,
        tags,
        tasks,
        task,
        taskDetails,
        setTaskDetails,
        addItem,
        setAddItem,
        editingItem,
        setEditingItem,
        onCloseModal,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

function TaskForm({ onCloseModal, taskId = null }) {
  return (
    <TaskContainer>
      <TaskFormBox onCloseModal={onCloseModal} taskId={taskId}>
        <TaskDetailBox />
        <TaskAddItemBox />
        <TaskItemBox />
        <TaskActionBox />
      </TaskFormBox>
    </TaskContainer>
  );
}

function TaskDetailBox() {
  const { taskDetails, setTaskDetails, dispatch, tags, task, tasks, editing } =
    useContext(TaskContext);
  const renderTags = taskDetails.tags
    ? tags.filter((tag) => taskDetails?.tags.includes(tag.tagId))
    : [];
  function handleTaskTagRemove(tagId) {
    const updatedTaskTags = taskDetails.tags.filter((tag) => tag !== tagId);
    const updatedTask = taskDetails;
    updatedTask.tags = updatedTaskTags;
    if (!task)
      setTaskDetails((details) => ({
        ...details,
        tags: [...updatedTaskTags],
      }));
    else dispatch(updateTask(updatedTask));
  }

  function handleTagAdd(e) {
    if (taskDetails?.tags.find((t) => t === e.target.value)) {
      toast.error("You already added tag");
      return;
    }
    setTaskDetails((detail) => ({
      ...detail,
      tags: [...detail.tags, e.target.value],
    }));
  }

  return (
    <form className="flex flex-col rounded border px-4 py-4 gap-2" action="">
      <input
        className="px-2 py-1 border rounded"
        type="text"
        placeholder="Title"
        value={taskDetails?.title}
        onChange={(e) =>
          setTaskDetails((details) => ({
            ...details,
            title: e.target.value ?? "",
          }))
        }
      />
      <div
        contentEditable
        role="textarea"
        className="border rounded px-2 py-1"
        value={taskDetails?.description}
        onKeyUp={(e) =>
          setTaskDetails((details) => ({
            ...details,
            description: e.target.textContent,
          }))
        }
      ></div>

      <input
        className="px-2 py-1 border rounded"
        type="date"
        placeholder="Set Due Date"
        onChange={(e) =>
          setTaskDetails((details) => ({
            ...details,
            dueDate: e.target.value ?? "",
          }))
        }
      />
      <div
        className="py-1 px-2 rounded h-10 w-full border flex flex-row gap-1"
        contentEditable={false}
      >
        {renderTags?.map((tag) => (
          <div
            key={tag?.tagId}
            className="relative border rounded-md text-white h-full text-sm px-2 py-1 flex flex-row gap-2"
            style={{ background: tag?.tagColor }}
          >
            {tag?.tagName}
            <span
              onClick={() => handleTaskTagRemove(tag.tagId)}
              className="absolute right-0 top-0 text-slate-900 cursor-pointer"
            >
              <HiXMark size={20} />
            </span>
          </div>
        ))}
      </div>
      <select onChange={handleTagAdd} name="tagOptions" id="tagOptions">
        <option>-------------------</option>
        {tags?.map((tag) => (
          <option
            key={tag.tagId}
            className="flex flex-row gap-2"
            value={tag.tagId}
          >
            {tag.tagName}
          </option>
        ))}
      </select>
    </form>
  );
}

const initialItemAdderState = {
  completed: false,
  item: "",
};

function TaskAddItemBox() {
  const {
    dispatch,
    setTaskDetails,
    taskDetails,
    task,
    setAddItem,
    addItem,
    editingItem,
    setEditingItem,
  } = useContext(TaskContext);

  const item = editingItem.isEditing
    ? taskDetails.items.find((item) => item.itemId === editingItem?.itemId)
    : null;

  console.log("the item value", item);

  const [itemAdder, setItemAdder] = useState(initialItemAdderState);
  const editorRef = useRef(null);
  const caretPositionRef = useRef(null);

  const saveCaretPosition = () => {
    const sel = window.getSelection();
    if (sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(editorRef.current);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      caretPositionRef.current = {
        node: range.endContainer,
        offset: range.endOffset,
      };
      // return preCaretRange.toString().length;
    }
    // return 0;
  };

  const restoreCaretPosition = (pos) => {
    const sel = window.getSelection();
    const range = document.createRange();
    const { node, offset } = caretPositionRef.current;
    range.setStart(node, offset);
    range.setEnd(node, offset);
    sel.removeAllRanges();
    sel.addRange(range);
  };

  useEffect(() => {
    if (item && item.itemId) setItemAdder((_) => item);
  }, [setItemAdder, item]);
  useEffect(() => {
    if (item) {
      if (editorRef.current) {
        editorRef.current.textContent = itemAdder?.item;
      }
      if (caretPositionRef.current) restoreCaretPosition();
    }
  }, [item, itemAdder]);

  console.log("item adderon mount", itemAdder);

  function handleItemAdd(e) {
    if (!itemAdder.item) {
      toast.error("task is empty, please provide a value");
      return;
    }
    if (!editingItem.isEditing) {
      const itemDetail = {
        itemId: Date.now(),
        completed: itemAdder.completed,
        item: itemAdder.item,
      };
      setTaskDetails((details) => ({
        ...details,
        items: [...details.items, itemDetail],
      }));
      setAddItem(false);
      setItemAdder((i) => ({ ...initialItemAdderState }));
    }
    if (editingItem.isEditing) {
      setAddItem((_) => false);
      setTaskDetails((details) => {
        const itemIndex = details.items.findIndex(
          (item) => item.itemId === editingItem.itemId,
        );
        const updatedItem = [...details.items];
        updatedItem.splice(itemIndex, 1, itemAdder);
        return {
          ...details,
          items: [...updatedItem],
        };
      });
      setEditingItem((edit) => ({ ...initialEditingItemState }));
      setItemAdder((i) => ({ ...initialItemAdderState }));
    }
  }

  function handleItemEdit(itemId) {
    const item = task?.item.find((item) => item.itemId === itemId);
    setItemAdder(item);
  }

  function handleInput(e) {
    saveCaretPosition();
    setItemAdder((add) => ({
      ...add,
      item: e.target.textContent,
    }));
    // restoreCaretPosition(caretPosition);
  }

  return (
    <>
      {addItem || editingItem.isEditing ? (
        <div className="px-4 py-2 w-full border rounded">
          <div className="grid grid-cols-[2rem_1fr_8rem] gap-2 w-full items-start">
            <input
              type="checkbox"
              onChange={(e) =>
                setItemAdder((item) => ({
                  ...item,
                  completed: e.target.checked,
                }))
              }
              checked={itemAdder?.completed}
            />
            <div
              contentEditable
              className="border px-4 py-1 rounded w-full"
              type="text"
              role="input"
              ref={editorRef}
              placeholder="Add Item"
              onInput={handleInput}
            >
              {/* {itemAdder?.item} */}
            </div>
            <div>
              <button
                className="w-full rounded bg-blue-700 text-white px-4 py-2"
                onClick={handleItemAdd}
              >
                {itemAdder.itemId ? "Update Item" : "Add item"}
              </button>
              {itemAdder.itemId && (
                <button
                  className="w-full rounded bg-blue-700 text-white px-4 py-2"
                  onClick={() => {
                    setAddItem(false);
                    setEditingItem((edit) => ({
                      ...initialEditingItemState,
                    }));
                    setItemAdder((_) => initialItemAdderState);
                  }}
                >
                  Cancel Update
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

function TaskItemBox() {
  const {
    task,
    taskDetails,
    setTaskDetails,
    dispatch,
    setEditingItem,
    editingItem,
    setAddItem,
  } = useContext(TaskContext);

  function handleItemRemove(itemId) {
    setTaskDetails((details) => ({
      ...details,
      items: details.items.filter((item) => item.itemId !== itemId),
    }));

    if (task) dispatch(updateTask(taskDetails));
  }

  return (
    <>
      {taskDetails?.items?.length > 0 ? (
        <div className="flex rounded flex-col border px-4 py-2">
          <h2 className="text-2xl border-b mb-4">Task Items</h2>
          <div className="divide-y gap-3 flex flex-col last:mb-2">
            {taskDetails?.items?.map((item) => (
              <div
                className="flex flex-row justify-between gap-2"
                key={item.itemId}
              >
                <input
                  type="checkbox"
                  checked={item.completed}
                  readOnly={true}
                />
                {item.item}
                {!editingItem.isEditing && (
                  <div className="flex flex-row gap-2">
                    <span
                      className="cursor-pointer"
                      onClick={(_) => handleItemRemove(item.itemId)}
                    >
                      <IoTrashOutline />
                    </span>
                    <span
                      className="cursor-pointer"
                      onClick={() => {
                        setAddItem((_) => false);
                        setEditingItem({
                          isEditing: true,
                          itemId: item.itemId,
                        });
                      }}
                    >
                      <GoPencil />
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

function TaskActionBox() {
  const { addItem, setAddItem, taskDetails, dispatch, onCloseModal, task } =
    useContext(TaskContext);
  console.log("the task details", taskDetails);
  function handleTaskSave(e) {
    const incompleteDetails = [
      taskDetails?.dueDate,
      taskDetails?.tags.length > 0,
      taskDetails?.title,
      taskDetails?.description,
    ].some((item) => !item);

    if (incompleteDetails) {
      toast.error("All the default data for the task has to be provided");
      return;
    }
    if (!task) dispatch(addTask(taskDetails));
    if (task) dispatch(updateTask(taskDetails));
    onCloseModal();
  }

  return (
    <>
      {!addItem && (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={(e) => setAddItem((add) => !add)}
            className="bg-blue-700 text-white px-4 py-1 rounded"
          >
            New Item
          </button>
        </div>
      )}
      <button
        onClick={handleTaskSave}
        className="bg-blue-700 text-white px-4 py-1 rounded"
      >
        Save Task
      </button>
    </>
  );
}

export default TaskForm;



import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addTask, removeTaskItem, updateTask } from "./tasks/taskSlice";
import { IoTrashOutline } from "react-icons/io5";
import { GoPencil } from "react-icons/go";
import { HiXMark } from "react-icons/hi2";
import { updateTag } from "./tasks/tagSlice";
import { useEffect } from "react";
import { useRef } from "react";

const initialTaskDetails = {
  title: "",
  description: "",
  items: [],
  tags: [],
  dueDate: "",
};
const initialEditingItemState = {
  isEditing: false,
  itemId: null,
};
const TaskContext = createContext();

function TaskContainer({ children }) {
  return (
    <div className="mt-4 overflow-auto flex flex-col gap-4">{children}</div>
  );
}

function TaskFormBox({ children, onCloseModal, taskId }) {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.tags.tags);
  const tasks = useSelector((state) => state.tasks.tasks);
  const task = taskId && tasks.find((task) => task.taskId === taskId);
  const [taskDetails, setTaskDetails] = useState(
    task ? task : initialTaskDetails,
  );
  const [addItem, setAddItem] = useState(false);
  const [editingItem, setEditingItem] = useState(initialEditingItemState);

  return (
    <TaskContext.Provider
      value={{
        dispatch,
        tags,
        tasks,
        task,
        taskDetails,
        setTaskDetails,
        addItem,
        setAddItem,
        editingItem,
        setEditingItem,
        onCloseModal,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

function TaskForm({ onCloseModal, taskId = null }) {
  return (
    <TaskContainer>
      <TaskFormBox onCloseModal={onCloseModal} taskId={taskId}>
        <TaskDetailBox />
        <TaskAddItemBox />
        <TaskItemBox />
        <TaskActionBox />
      </TaskFormBox>
    </TaskContainer>
  );
}

function TaskDetailBox() {
  const { taskDetails, setTaskDetails, dispatch, tags, task, tasks, editing } =
    useContext(TaskContext);
  const renderTags = taskDetails.tags
    ? tags.filter((tag) => taskDetails?.tags.includes(tag.tagId))
    : [];
  function handleTaskTagRemove(tagId) {
    const updatedTaskTags = taskDetails.tags.filter((tag) => tag !== tagId);
    const updatedTask = taskDetails;
    updatedTask.tags = updatedTaskTags;
    if (!task)
      setTaskDetails((details) => ({
        ...details,
        tags: [...updatedTaskTags],
      }));
    else dispatch(updateTask(updatedTask));
  }

  function handleTagAdd(e) {
    if (taskDetails?.tags.find((t) => t === e.target.value)) {
      toast.error("You already added tag");
      return;
    }
    setTaskDetails((detail) => ({
      ...detail,
      tags: [...detail.tags, e.target.value],
    }));
  }

  return (
    <form className="flex flex-col rounded border px-4 py-4 gap-2" action="">
      <input
        className="px-2 py-1 border rounded"
        type="text"
        placeholder="Title"
        value={taskDetails?.title}
        onChange={(e) =>
          setTaskDetails((details) => ({
            ...details,
            title: e.target.value ?? "",
          }))
        }
      />
      <div
        contentEditable
        role="textarea"
        className="border rounded px-2 py-1"
        value={taskDetails?.description}
        onKeyUp={(e) =>
          setTaskDetails((details) => ({
            ...details,
            description: e.target.textContent,
          }))
        }
      ></div>

      <input
        className="px-2 py-1 border rounded"
        type="date"
        placeholder="Set Due Date"
        onChange={(e) =>
          setTaskDetails((details) => ({
            ...details,
            dueDate: e.target.value ?? "",
          }))
        }
      />
      <div
        className="py-1 px-2 rounded h-10 w-full border flex flex-row gap-1"
        contentEditable={false}
      >
        {renderTags?.map((tag) => (
          <div
            key={tag?.tagId}
            className="relative border rounded-md text-white h-full text-sm px-2 py-1 flex flex-row gap-2"
            style={{ background: tag?.tagColor }}
          >
            {tag?.tagName}
            <span
              onClick={() => handleTaskTagRemove(tag.tagId)}
              className="absolute right-0 top-0 text-slate-900 cursor-pointer"
            >
              <HiXMark size={20} />
            </span>
          </div>
        ))}
      </div>
      <select onChange={handleTagAdd} name="tagOptions" id="tagOptions">
        <option>-------------------</option>
        {tags?.map((tag) => (
          <option
            key={tag.tagId}
            className="flex flex-row gap-2"
            value={tag.tagId}
          >
            {tag.tagName}
          </option>
        ))}
      </select>
    </form>
  );
}

const initialItemAdderState = {
  completed: false,
  item: "",
};

function TaskAddItemBox() {
  const {
    dispatch,
    setTaskDetails,
    taskDetails,
    task,
    setAddItem,
    addItem,
    editingItem,
    setEditingItem,
  } = useContext(TaskContext);

  const item = editingItem.isEditing
    ? taskDetails.items.find((item) => item.itemId === editingItem?.itemId)
    : null;

  console.log("the item value", item);

  const [itemAdder, setItemAdder] = useState(initialItemAdderState);
  const editorRef = useRef(null);

  const saveCaretPosition = () => {
    const sel = window.getSelection();
    if (sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(editorRef.current);
      preCaretRange.setEnd(range.endContainer, range.endOffset);

      return preCaretRange.toString().length;
    }
    return 0;
  };

  const restoreCaretPosition = (pos) => {
    const sel = window.getSelection();
    const node = editorRef.current;
    node.focus();
    sel.collapse(node.firstChild, pos);
  };

  useEffect(() => {
    if (item && item.itemId) setItemAdder((_) => item);
  }, [setItemAdder, item]);
  useEffect(() => {
    if (item) {
      const caretPosition = saveCaretPosition();
      if (editorRef.current) {
        editorRef.current.textContent = itemAdder?.item;
      }
      restoreCaretPosition(caretPosition);
    }
  }, [item, itemAdder]);

  console.log("item adderon mount", itemAdder);

  function handleItemAdd(e) {
    if (!itemAdder.item) {
      toast.error("task is empty, please provide a value");
      return;
    }
    if (!editingItem.isEditing) {
      const itemDetail = {
        itemId: Date.now(),
        completed: itemAdder.completed,
        item: itemAdder.item,
      };
      setTaskDetails((details) => ({
        ...details,
        items: [...details.items, itemDetail],
      }));
      setAddItem(false);
      setItemAdder((i) => ({ ...initialItemAdderState }));
    }
    if (editingItem.isEditing) {
      setAddItem((_) => false);
      setTaskDetails((details) => {
        const itemIndex = details.items.findIndex(
          (item) => item.itemId === editingItem.itemId,
        );
        const updatedItem = [...details.items];
        updatedItem.splice(itemIndex, 1, itemAdder);
        return {
          ...details,
          items: [...updatedItem],
        };
      });
      setEditingItem((edit) => ({ ...initialEditingItemState }));
      setItemAdder((i) => ({ ...initialItemAdderState }));
    }
  }

  function handleItemEdit(itemId) {
    const item = task?.item.find((item) => item.itemId === itemId);
    setItemAdder(item);
  }

  function handleInput(e) {
    const caretPosition = saveCaretPosition();
    setItemAdder((add) => ({
      ...add,
      item: e.target.textContent,
    }));
    restoreCaretPosition(caretPosition);
  }

  return (
    <>
      {addItem || editingItem.isEditing ? (
        <div className="px-4 py-2 w-full border rounded">
          <div className="grid grid-cols-[2rem_1fr_8rem] gap-2 w-full items-start">
            <input
              type="checkbox"
              onChange={(e) =>
                setItemAdder((item) => ({
                  ...item,
                  completed: e.target.checked,
                }))
              }
              checked={itemAdder?.completed}
            />
            <div
              contentEditable
              className="border px-4 py-1 rounded w-full"
              type="text"
              role="input"
              ref={editorRef}
              placeholder="Add Item"
              onInput={handleInput}
            >
              {/* {itemAdder?.item} */}
            </div>
            <div>
              <button
                className="w-full rounded bg-blue-700 text-white px-4 py-2"
                onClick={handleItemAdd}
              >
                {itemAdder.itemId ? "Update Item" : "Add item"}
              </button>
              {itemAdder.itemId && (
                <button
                  className="w-full rounded bg-blue-700 text-white px-4 py-2"
                  onClick={() => {
                    setAddItem(false);
                    setEditingItem((edit) => ({
                      ...initialEditingItemState,
                    }));
                    setItemAdder((_) => initialItemAdderState);
                  }}
                >
                  Cancel Update
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

function TaskItemBox() {
  const {
    task,
    taskDetails,
    setTaskDetails,
    dispatch,
    setEditingItem,
    editingItem,
    setAddItem,
  } = useContext(TaskContext);

  function handleItemRemove(itemId) {
    setTaskDetails((details) => ({
      ...details,
      items: details.items.filter((item) => item.itemId !== itemId),
    }));

    if (task) dispatch(updateTask(taskDetails));
  }

  return (
    <>
      {taskDetails?.items?.length > 0 ? (
        <div className="flex rounded flex-col border px-4 py-2">
          <h2 className="text-2xl border-b mb-4">Task Items</h2>
          <div className="divide-y gap-3 flex flex-col last:mb-2">
            {taskDetails?.items?.map((item) => (
              <div
                className="flex flex-row justify-between gap-2"
                key={item.itemId}
              >
                <input
                  type="checkbox"
                  checked={item.completed}
                  readOnly={true}
                />
                {item.item}
                {!editingItem.isEditing && (
                  <div className="flex flex-row gap-2">
                    <span
                      className="cursor-pointer"
                      onClick={(_) => handleItemRemove(item.itemId)}
                    >
                      <IoTrashOutline />
                    </span>
                    <span
                      className="cursor-pointer"
                      onClick={() => {
                        setAddItem((_) => false);
                        setEditingItem({
                          isEditing: true,
                          itemId: item.itemId,
                        });
                      }}
                    >
                      <GoPencil />
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

function TaskActionBox() {
  const { addItem, setAddItem, taskDetails, dispatch, onCloseModal, task } =
    useContext(TaskContext);
  console.log("the task details", taskDetails);
  function handleTaskSave(e) {
    const incompleteDetails = [
      taskDetails?.dueDate,
      taskDetails?.tags.length > 0,
      taskDetails?.title,
      taskDetails?.description,
    ].some((item) => !item);

    if (incompleteDetails) {
      toast.error("All the default data for the task has to be provided");
      return;
    }
    if (!task) dispatch(addTask(taskDetails));
    if (task) dispatch(updateTask(taskDetails));
    onCloseModal();
  }

  return (
    <>
      {!addItem && (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={(e) => setAddItem((add) => !add)}
            className="bg-blue-700 text-white px-4 py-1 rounded"
          >
            New Item
          </button>
        </div>
      )}
      <button
        onClick={handleTaskSave}
        className="bg-blue-700 text-white px-4 py-1 rounded"
      >
        Save Task
      </button>
    </>
  );
}

export default TaskForm;
