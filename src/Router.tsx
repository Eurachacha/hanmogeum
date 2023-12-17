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
import ProtectedRoute from "./components/route/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "",
        element: <ProtectedRoute location="/" allowedRoles={["all"]} />,
        children: [
          {
            path: "/",
            element: <MainPage />,
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
        ],
      },
      {
        path: "",
        element: (
          <ProtectedRoute
            location="/login"
            modalMessage="로그인하셔야 본 서비스를 이용하실 수 있습니다."
            allowedRoles={["user", "admin", "seller"]}
          />
        ),
        children: [
          {
            path: "/orders/checkout",
            element: <OrderCheckoutPage />,
          },
          {
            path: "/orders/complete",
            element: <OrderCompletePage />,
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
        ],
      },
      {
        path: "",
        element: <ProtectedRoute location={-1} modalMessage="이미 로그인된 사용자입니다." allowedRoles={["guest"]} />,
        children: [
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/signup",
            element: <SignUpPage />,
          },
        ],
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "",
    element: (
      <ProtectedRoute location="/" modalMessage="관리자만 접근 가능합니다." allowedRoles={["seller", "admin"]} />
    ),
    children: [
      {
        path: "manage/*",
        element: <ManagePage />,
      },
    ],
  },
]);

export default router;
