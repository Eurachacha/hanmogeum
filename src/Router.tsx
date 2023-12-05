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
import MyOrderListPage from "@/pages/MyOrderListPage";
import MyOrderDetailPage from "@/pages/MyOrderDetailPage";
import MyProfilePage from "@/pages/MyProfilePage";
import MyLikePage from "@/pages/MyLikePage";
import MyReviewPage from "@/pages/MyReviewPage";
import ManagePage from "./pages/ManagePage";

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
        element: <MyOrderListPage />,
      },
      {
        path: "/mypage/orders",
        element: <MyOrderListPage />,
      },
      {
        path: "/mypage/orders/:id",
        element: <MyOrderDetailPage />,
      },
      {
        path: "/mypage/profile",
        element: <MyProfilePage />,
      },
      {
        path: "mypage/reviews",
        element: <MyReviewPage />,
      },
      {
        path: "/mypage/likes",
        element: <MyLikePage />,
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
      {
        path: "/manage",
        element: <ManagePage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

export default router;
