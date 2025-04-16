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


function AppRoutes() {
  const location = useLocation();

  useEffect(() => {
    const pathToTitle = {
      "/": "Home",
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
        <Route path="/payment-successful" element={<PaymentSuccessfull />} />
        <Route path="/payment-fail" element={<PaymentCancel />} />

        {/* ProtectedRoute */}
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/myaccount" element={<ProtectedRoute><MyAccount /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default AppRoutes;
