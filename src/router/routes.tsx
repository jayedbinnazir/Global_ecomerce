import { createBrowserRouter } from "react-router-dom";
import ProductList from "../features/product-list/ProductList";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import Register from "../features/auth/components/Register";
import CartPage from "../pages/CartPage";
import Checkout from "../pages/CheckOutPage";
import ProductDetailPage from "../pages/ProductDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        element: <ProductList />,
        index: true,
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
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/cart/checkout",
    element: <Checkout />,
  },
  {
    path: "/product-details/:id",
    element: <ProductDetailPage />,
  },
]);
