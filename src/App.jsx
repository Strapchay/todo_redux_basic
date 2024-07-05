import { Toaster } from "react-hot-toast";
import Actions from "./Actions";
import Header from "./Header";
import Landing from "./Landing";
import Sidebar from "./Sidebar";

function App() {
  return (
    <main className="grid grid-cols-[9rem_1fr] h-[100vh]">
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            paddings: "16px 24px",
            backgroundColor: "whitesmoke",
            color: "black",
          },
        }}
      />
      <Sidebar />
      <div className="flex flex-col gap-10 h-[100vh] w-full py-6 px-8">
        <Header />
        <Actions />
        <Landing />
      </div>
    </main>
  );
}

export default App;
