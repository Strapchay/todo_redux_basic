import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Error from "./Error";
import BasePage from "./BasePage";
import Landing from "./Landing";
import TrashItems from "./TrashItems";
import PageNotFound from "./PageNotFound";

const router = createBrowserRouter([
  {
    element: <BasePage />,
    errorElement: <Error />,
    children: [
      { path: "/dashboard", element: <Landing />, index: true },
      { path: "/trashItems", element: <TrashItems /> },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
    errorElement: <Error />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
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
    </>
  );
}

export default App;
