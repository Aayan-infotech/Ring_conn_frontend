import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaLinkedinIn,
} from "react-icons/fa6";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row gy-5">
          <div className="col-lg-4 col-md-6">
            <h3 className="footer-title">Join us for special promotions.</h3>
            <div className="subscribe-box">
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                aria-label="Email address"
              />
              <button className="subscribe-btn">Subscribe</button>
            </div>

            <div className="mt-4">
              <p className="text-white mb-0 footer-title">Download Our App</p>
              <div className="app-badges">
                <a href="#">
                  <img
                    src="https://ringconn.com/cdn/shop/files/app_store.png?v=1730898558&width=1400"
                    alt="Download on the App Store"
                  />
                </a>
                <a href="#">
                  <img
                    src="https://ringconn.com/cdn/shop/files/goole_play.png?v=1730898557&width=1400"
                    alt="Get it on Google Play"
                  />
                </a>
              </div>
            </div>

            <div className="social-icons">
              <a href="#" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#" aria-label="Twitter">
                <FaXTwitter />
              </a>
              <a href="#" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" aria-label="YouTube">
                <FaYoutube />
              </a>
              <a href="#" aria-label="TikTok">
                <FaTiktok />
              </a>
              <a href="#" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="footer-heading footer-title">Products</h6>
            <ul className="footer-links">
              <li>
                <Link to="/products/gen2">Smart Finger Ring</Link>
              </li>
              <li>
                <Link to="/products/gen2air">Smart Couple Ring</Link>
              </li>
              <li>
                <Link to="/products/gen1">Waterproof Smart Rings</Link>
              </li>
              <li>
                <Link to="/products/chargingdock">Charging Dock</Link>
              </li>
              <li>
                <Link to="/products/protectorcolors">Protector Colors</Link>
              </li>
              <li>
                <Link to="/products/protector">Ring Protector</Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="footer-heading footer-title">Resources</h6>
            <ul className="footer-links">
              <li>
                <Link to="/download/android">Android App</Link>
              </li>
              <li>
                <Link to="/download/ios">iOS App</Link>
              </li>
              <li>
                <Link to="/download/3dmodels">3D Model Files</Link>
              </li>
              <li>
                <Link to="/download/manual">User Manual</Link>
              </li>
              <li>
                <Link to="/support/faq">FAQ</Link>
              </li>
              <li>
                <Link to="/support/guides">User Guides</Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="footer-heading footer-title">Support</h6>
            <ul className="footer-links">
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/return-policy">Returns & Refunds</Link>
              </li>
              <li>
                <Link to="/shipping-policy">Shipping Info</Link>
              </li>
              <li>
                <Link to="/terms">Terms of Service</Link>
              </li>
              <li>
                <Link to="/warranty">Warranty</Link>
              </li>
              <li>
                <Link to="/contact">Contact Support</Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="footer-heading footer-title">Company</h6>
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li>
                <Link to="/news">Newsroom</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/distributors">Distributors</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="copyright mb-3 mb-md-0">
            © 2025 RingConn. All rights reserved.
            <span className="d-none d-md-inline"> | </span>
            <br className="d-md-none" />
            Designed by{" "}
            <a
              href="https://aayaninfotech.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Aayan Infotech
            </a>
          </p>

          <div className="payment-icons">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
              alt="Visa"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
              alt="MasterCard"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
              alt="PayPal"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
