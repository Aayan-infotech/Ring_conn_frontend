import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";
import ResetPassword from "../components/ForgotPassword/ResetPassword";
import Home from "../components/Home/Home";
import HomeSection1 from "../components/HomeSection1/HomeSection1";
import HomeSection2 from "../components/HomeSection2/HomeSection2";
import HomeSection3 from "../components/HomeSection3/HomeSection3";
import HomeSection4 from "../components/HomeSection4/HomeSection4";
import About from "../components/About/About";
import Blog from "../components/Blog/Blog";
import BlogDetails from "../components/BlogDetails/BlogDetails";
import News from "../components/News/News";
import NewsDetails from "../components/NewsDetails/NewsDetails";
import Contact from "../components/Contact/Contact";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import Cart from "../components/Cart/Cart";
import Checkout from "../components/Checkout/Checkout";
import PaymentSuccessfull from "../components/PaymentSuccessful/PaymentSuccessful";
import MyAccount from "../components/MyAccount/MyAccount";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import Orders from "../components/Orders/Orders";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import PaymentCancel from "../components/PaymentCancel/PaymentCancel";
import AllProducts from "../components/AllProducts/AllProducts";
import ShippingPolicy from "../components/ShippingPolicy/ShipppingPolicy";
import ReturnPolicy from "../components/ReturnPolicy/ReturnPolicy";
import TradeIn from "../components/TradeIn/TradeIn";
import TradeInPage1 from "../components/TradeIn/TradeInPage1";
import TradeInPage2 from "../components/TradeIn/TradeInPage2";
import TradeInPage3 from "../components/TradeIn/TradeInPage3";
import TradeInPage4 from "../components/TradeIn/TradeInPage4";
import Care from "../components/Care/Care";
import Care1 from "../components/Care/Care1";
import Care2 from "../components/Care/Care2";
import Care3 from "../components/Care/Care3";
import Care4 from "../components/Care/Care4";
import Care5 from "../components/Care/Care5";

function AppRoutes() {
  const location = useLocation();

  useEffect(() => {
    const pathToTitle = {
      "/": "RingConn",
      "/login": "Login | RingConn",
      "/register": "Register | RingConn",
      "/forgot-password": "Forgot Password | RingConn",
      "/reset-password": "Reset Password | RingConn",
      "/home1": "Home Section 1 | RingConn",
      "/home2": "Home Section 2 | RingConn",
      "/home3": "Home Section 3 | RingConn",
      "/home4": "Home Section 4 | RingConn",
      "/about": "About Us | RingConn",
      "/blog": "Blog | RingConn",
      "/news": "News | RingConn",
      "/contact": "Contact | RingConn",
      "/cart": "Your Cart | RingConn",
      "/checkout": "Checkout | RingConn",
      "/myaccount": "My Account | RingConn",
      "/orders": "My Orders | RingConn",
    };

    // Handle dynamic routes
    if (location.pathname.startsWith("/blog/")) {
      document.title = "Blog Details";
    } else if (location.pathname.startsWith("/news/")) {
      document.title = "News Details";
    } else {
      document.title = pathToTitle[location.pathname] || "My App";
    }
  }, [location]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<Home />} />
        <Route path="/home1" element={<HomeSection1 />} />
        <Route path="/home2" element={<HomeSection2 />} />
        <Route path="/home3" element={<HomeSection3 />} />
        <Route path="/home3" element={<HomeSection4 />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<NewsDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/allproducts" element={<AllProducts />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
        <Route path="/trade-in" element={<TradeIn />} />
        <Route path="/trade-in-1" element={<TradeInPage1 />} />
        <Route path="/trade-in-2" element={<TradeInPage2 />} />
        <Route path="/trade-in-3" element={<TradeInPage3 />} />
        <Route path="/trade-in-4" element={<TradeInPage4 />} />
        <Route path="/careplus" element={<Care />} />
        <Route path="/careplus1" element={<Care1 />} />
        <Route path="/careplus2" element={<Care2 />} />
        <Route path="/careplus3" element={<Care3 />} />
        <Route path="/careplus4" element={<Care4 />} />
        <Route path="/careplus5" element={<Care5 />} />

        <Route path="/payment-successful" element={<PaymentSuccessfull />} />
        <Route path="/payment-fail" element={<PaymentCancel />} />

        {/* ProtectedRoute */}
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myaccount"
          element={
            <ProtectedRoute>
              <MyAccount />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default AppRoutes;
