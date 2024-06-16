import { createBrowserRouter } from "react-router-dom";
import ProductList from "../features/product-list/ProductList";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import CartPage from "../pages/CartPage";
import Checkout from "../pages/CheckOutPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import RegisterPage from "../pages/RegisterPage";
import Protected from "../features/auth/Protected";

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
    element: <RegisterPage />,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage />
      </Protected>
    ),
  },
  {
    path: "/cart/checkout",
    element: (
      <Protected>
        <Checkout />
      </Protected>
    ),
  },
  {
    path: "/product-details/:id",
    element: (
      <Protected>
        <ProductDetailPage />
      </Protected>
    ),
  },
]);
