import { HiOutlineSearch } from "react-icons/hi";

function Header() {
  return (
    <div className="flex flex-row justify-between items-center w-full">
      <div className="w-32 h-8">
        <div className="relative flex flex-row h-full w-full">
          <span className="absolute translate-x-2 translate-y-[6px] text-gray-500">
            <HiOutlineSearch size={20} />
          </span>
          <input
            className="h-full bg-gray-300 px-2 flex items-center justify-center focus:ring-gray-500 focus:outline-none rounded focus:ring-3 placeholder:text-gray-400 text-gray-500 pl-7"
            type="text"
            placeholder="Search tasks"
          />
        </div>
      </div>
      {/* <ul className="flex flex-row gap-4 w-30">
        <li className="list-none">add item</li>
        <li className="list-none">add item</li>
        <li className="list-none">add item</li>
      </ul> */}
    </div>
  );
}

export default Header;
