import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./Pages/RootLayout";
import HomePage from "./Pages/HomePage";
import ErrorPage from "./Pages/ErrorPage";
import InputForm from "./components/InputForm";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "new", element: <InputForm /> },
        { path: ":buyerName", element: <InputForm /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
