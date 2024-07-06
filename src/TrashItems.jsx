import { useSelector } from "react-redux";
import ContentItem from "./ContentListBox";

function TrashItems() {
  const trashItems = useSelector((state) => state.trashs.trashs);

  return (
    <div className="flex flex-col gap-8 h-[100vh] overflow-auto">
      <h2 className="text-2xl">Trash Items</h2>
      <div className="grid grid-cols-4 gap-2 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
        {trashItems?.length > 0 &&
          trashItems?.map((trashItem) => (
            <ContentItem
              key={trashItem.trashId}
              task={trashItem}
              type="Trash"
              trashId={trashItem.trashId}
            />
          ))}
      </div>
      {!trashItems?.length && (
        <div className="mt-8 flex items-center justify-center">
          Nothing to see here!
        </div>
      )}
    </div>
  );
}

export default TrashItems;
