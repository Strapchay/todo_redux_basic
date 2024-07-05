import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addTag, removeTag, updateTag } from "./tasks/tagSlice";
import { IoEyeOutline, IoTrashOutline } from "react-icons/io5";
import { GoPencil } from "react-icons/go";

const emptyTagState = {
  tagName: "",
  tagColor: "",
};

function AddTagForm() {
  const [curTag, setCurTag] = useState(emptyTagState);
  const [editing, setEditing] = useState(false);
  const tags = useSelector((state) => state.tags.tags);
  const dispatch = useDispatch();

  function handleSubmit() {
    if (!curTag.tagName || !curTag.tagColor) {
      toast.error(
        "Please provide the the name and color for the tag being created",
      );
      return;
    }
    if (!editing) dispatch(addTag(curTag));
    if (editing) {
      dispatch(updateTag(curTag));
      setEditing(false);
    }
    setCurTag(emptyTagState);
  }

  function handleTagEdit(tagId) {
    const tag = tags.filter((tag) => tag.tagId === tagId);
    setEditing(true);
    setCurTag({ ...tag[0] });
  }

  return (
    <div className="pt-4">
      <div className="flex flex-col gap-4">
        <input
          className="border rounded px-2 py-1"
          placeholder="Tag Name"
          type="text"
          value={curTag?.tagName}
          onChange={(e) =>
            setCurTag((_) => ({ ...curTag, tagName: e.target.value }))
          }
        />
        <HexColorPicker
          color={curTag?.tagColor}
          onChange={(e) => setCurTag((_) => ({ ...curTag, tagColor: e }))}
        />

        <div className="flex items-center justify-end">
          <button
            className="border px-4 py-1 text-white bg-gray-400"
            onClick={handleSubmit}
          >
            {editing ? "Update Tag" : "Add Tag"}
          </button>
        </div>
      </div>
      <div className="border rounded px-4 py-4">
        <h2 className="text-xl border-b">Tag Items</h2>
        <div className="divide-y gap-3 flex flex-col last:mb-2">
          {tags.map((tag) => (
            <div
              key={tag?.tagId}
              className="flex flex-row justify-between items-center"
            >
              <span
                className="border w-4 h-4 rounded px-4 py-1"
                style={{ background: tag.tagColor }}
              ></span>
              <p>{tag.tagName}</p>
              <div className="flex flex-row gap-2">
                <span
                  className="cursor-pointer"
                  onClick={(_) => dispatch(removeTag({ tagId: tag.tagId }))}
                >
                  <IoTrashOutline />
                </span>
                <span
                  className="cursor-pointer"
                  onClick={() => handleTagEdit(tag.tagId)}
                >
                  <GoPencil />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AddTagForm;
