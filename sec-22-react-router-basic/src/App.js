import { createBrowserRouter, RouterProvider } from "react-router";

import HomePage from "./pages/Home";
import ProductsPage from "./pages/Products";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import ProductDetail from "./pages/ProductDetail";
// import { RouterProvider } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/products", element: <ProductsPage /> },
      { path: "/products/:productID", element: <ProductDetail /> },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
