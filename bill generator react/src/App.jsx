import { createBrowserRouter, RouterProvider } from "react-router";
import DataForm from "./componenets/DataForm.jsx";
import RootLayout from "./pages/RootLayout.jsx";
import HomePage from "./pages/HomePage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "new", element: <DataForm /> },
      { path: ":buyerName", element: <DataForm /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
