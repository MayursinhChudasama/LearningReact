import { createBrowserRouter, RouterProvider } from "react-router";
import DataForm from "./componenets/DataForm.jsx";
import RootLayout from "./pages/RootLayout.jsx";
import HomePage, { resetState } from "./pages/HomePage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage />, loader: resetState },
      { path: "new", element: <DataForm /> },
      { path: ":buyerName", element: <DataForm /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
