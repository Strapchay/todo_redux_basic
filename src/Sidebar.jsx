import { DiReact } from "react-icons/di";
import { MdHouseSiding } from "react-icons/md";
import { SlTrash } from "react-icons/sl";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="flex flex-col gap-4 h-[100vh] bg-slate-50 py-4 pl-2">
      <div className="text-blue-800 text-xl flex items-end">
        <span>
          <DiReact size={50} />
        </span>
        Tasky
      </div>
      <ul className="flex flex-col gap-4">
        <li className="list-none h-9 hover:text-white text-gray-600 text-xs hover:bg-blue-700 rounded-l px-2 flex items-center justify-center cursor-pointer gap-2">
          <NavLink className="flex flex-row gap-2" to={"/dashboard"}>
            <span>
              <MdHouseSiding size={20} />
            </span>
            Dashboard
          </NavLink>
        </li>
        <li className="list-none h-9 hover:text-white text-gray-600 text-xs hover:bg-blue-700 rounded-l px-2 flex items-center justify-center cursor-pointer gap-2">
          <NavLink className="flex flex-row gap-2" to={"/trashItems"}>
            <span>
              <SlTrash size={20} />
            </span>
            Trash Items
          </NavLink>
        </li>
        {/* <div>Tasks</div>
    <div>Calender</div>
    <div>Members</div> */}
      </ul>
    </div>
  );
}
export default Sidebar;
