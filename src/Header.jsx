import { useContext } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { LandingContext } from "./Landing";

function Header() {
  const { searchState, setSearchState } = useContext(LandingContext);
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
            value={searchState}
            onChange={(e) => setSearchState(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
