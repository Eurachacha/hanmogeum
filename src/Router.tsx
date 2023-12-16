import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import LoginPage from "@/pages/LoginPage";
import SignUpPage from "@/pages/SignUpPage";
import ErrorPage from "@/pages/ErrorPage";
import MainPage from "@/pages/MainPage";
import ProductListPage from "@/pages/ProductListPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import CartPage from "@/pages/CartPage";
import OrderCheckoutPage from "@/pages/OrderCheckoutPage";
import OrderCompletePage from "@/pages/OrderCompletePage";
import ManagePage from "@/pages/ManagePage";

import MyPage from "./pages/Mypage";
import MyOrderListContainer from "./containers/mypage/MyOrderListContainer";
import MyOrderDetailContainer from "./containers/mypage/MyOrderDetailContainer";
import MyProfileLoginContainer from "./containers/mypage/MyProfileLoginContainer";
import MyProfileEditContainer from "./containers/mypage/MyProfileModifyContainer";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
      {
        path: "/mypage",
        element: <MyPage />,
        children: [
          {
            index: true,
            element: <MyOrderListContainer />,
          },
          {
            path: "orders",
            element: <MyOrderListContainer />,
          },
          {
            path: "orders/:id",
            element: <MyOrderDetailContainer />,
          },
          {
            path: "profile",
            element: <MyProfileLoginContainer />,
          },
          {
            path: "profile/login",
            element: <MyProfileLoginContainer />,
          },
          {
            path: "profile/modify",
            element: <MyProfileEditContainer />,
          },
          {
            path: "reviews",
            element: <>review</>,
          },
          {
            path: "likes",
            element: <>likes</>,
          },
        ],
      },
      {
        path: "/products",
        element: <ProductListPage />,
      },
      {
        path: "/products/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/orders/checkout",
        element: <OrderCheckoutPage />,
      },
      {
        path: "/orders/complete",
        element: <OrderCompletePage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "manage/*",
    element: <ManagePage />,
  },
]);

export default router;
