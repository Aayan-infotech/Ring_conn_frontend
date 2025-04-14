import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import {
  FiSearch,
  FiLogIn,
  FiUserPlus,
  FiUser,
  FiPackage,
  FiLogOut,
} from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Navbar.css"

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);


  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    
    toast.success("Logged out successfully!");

    setTimeout(() => {
      navigate("/login");
    }, 2500);
  };

  useEffect(() => {
    const navbarCollapse = document.getElementById("navbarNav");
    if (navbarCollapse && navbarCollapse.classList.contains("show")) {
      new bootstrap.Collapse(navbarCollapse).hide();
    }
  }, [location]);

  return (
    <>
      <ToastContainer />
      <nav className="navbar navbar-expand-lg navbar-dark shadow sticky-top navbar-bg-ringconn">
        <div className="container-fluid px-4">
          <Link to="/" className="navbar-brand fw-bold text-white fs-3">
            RingConn
          </Link>

          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNav"
          >
            <ul className="navbar-nav gap-3">
              <li className="nav-item">
                <Link to="/" className="nav-link text-white">
                  Gen 1
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link text-white">
                  Gen 2
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle text-white"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  Support
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/shipping-policy" className="dropdown-item">
                      Shipping Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/return-policy" className="dropdown-item">
                      Return & Refund Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/careplus" className="dropdown-item">
                      Care+
                    </Link>
                  </li>
                  <li>
                    <Link to="/trade-in" className="dropdown-item">
                      Trade-in
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle text-white"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  Explore
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/about" className="dropdown-item">
                      Brand Story
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" className="dropdown-item">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link to="/news" className="dropdown-item">
                      News
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="d-flex align-items-center gap-3">

            <form
              className="d-none d-lg-flex align-items-center"
              role="search"
            >
              <input
                className="form-control rounded-pill me-2"
                type="search"
                placeholder="Search..."
              />
              <button
                className="btn btn-outline-light rounded-circle"
                type="submit"
              >
                <FiSearch />
              </button>
            </form>

            <Link to="/cart" className="text-white position-relative">
              <FaShoppingCart size={20} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                3
              </span>
            </Link>

            <div className="dropdown">
              <Link
                to="#"
                className="d-flex align-items-center text-white dropdown-toggle"
                id="userDropdown"
                data-bs-toggle="dropdown"
              >
                <FaUserCircle size={22} />
              </Link>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="userDropdown"
              >
                {!isLoggedIn ? (
                  <>
                    <li>
                      <Link
                        to="/login"
                        className="dropdown-item d-flex align-items-center gap-2"
                      >
                        <FiLogIn /> Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/register"
                        className="dropdown-item d-flex align-items-center gap-2"
                      >
                        <FiUserPlus /> Register
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        to="/myaccount"
                        className="dropdown-item d-flex align-items-center gap-2"
                      >
                        <FiUser /> My Account
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/orders"
                        className="dropdown-item d-flex align-items-center gap-2"
                      >
                        <FiPackage /> Orders
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button
                        className="dropdown-item d-flex align-items-center gap-2"
                        onClick={handleLogout}
                      >
                        <FiLogOut /> Logout
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>

          {/* Toggle for mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon" />
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
