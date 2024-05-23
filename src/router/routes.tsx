import { createBrowserRouter } from "react-router-dom";
import ProductList from "../features/product-list/ProductList";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import Register from "../features/auth/components/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/products",
        element: <ProductList />,
      },
    ],
  },
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
  {
    path: "/auth/register",
    element: <Register />,
  },
]);
