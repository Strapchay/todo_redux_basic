import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function BasePage() {
  return (
    <main className="grid grid-cols-[9rem_1fr] h-[100vh] dark:bg-gray-600">
      <Sidebar />
      <div className="flex flex-col gap-10 h-[100vh] w-full py-6 px-8 overflow-y-auto max-sm:px-4">
        <Outlet />
      </div>
    </main>
  );
}

export default BasePage;
