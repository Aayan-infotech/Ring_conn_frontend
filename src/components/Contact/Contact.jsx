import React from "react";
import "./Contact.css";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";
import { IoChatbubblesOutline } from "react-icons/io5";

export default function Contact() {
  return (
    <div className="flightmantra-contact-wrapper">
      <div className="container">
        <div className="row flightmantra-contact-container">
          {/* Contact Form */}
          <div className="col-lg-6 flightmantra-contact-form-section">
            <h2 className="flightmantra-contact-title">Get In Touch</h2>
            <p className="flightmantra-contact-description">
            We respond to emails within 48 hours. Check your spam folder or call if no reply.
            </p>
            <form>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control flightmantra-form-control"
                  id="name"
                  placeholder="Enter Your Name"
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control flightmantra-form-control"
                  id="email"
                  placeholder="Enter Your Email"
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control flightmantra-form-control"
                  id="message"
                  rows="2"
                  placeholder="Enter Your Query Here!"
                ></textarea>
              </div>
              <button type="submit" className="btn flightmantra-btn-send w-100">
                <FaPaperPlane className="me-2" />
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="col-lg-6 flightmantra-contact-info-section">
            <h3 className="flightmantra-info-title">Contact Information</h3>
            <ul className="flightmantra-contact-list">
              <li className="flightmantra-contact-item">
                <FaPhoneAlt className="flightmantra-contact-icon" />
                <span className="flightmantra-contact-text">
                  +1 888-548-1271 (EST 10am-6pm Mon-Fri)
                </span>
              </li>
              <li className="flightmantra-contact-item">
                <FaEnvelope className="flightmantra-contact-icon" />
                <span className="flightmantra-contact-text">
                  cs@ringconn.com
                </span>
              </li>
              <li className="flightmantra-contact-item">
                <FaMapMarkerAlt className="flightmantra-contact-icon" />
                <span className="flightmantra-contact-text">
                  <strong>HK Office:</strong> RINGCONN (HONG KONG) LIMITED, RM
                  A07, 1701-02 NEW TREND CTR, 704 PRINCE EDWARD RD EAST, SAN PO
                  KONG, HONG KONG
                </span>
              </li>
              <li className="flightmantra-contact-item">
                <FaMapMarkerAlt className="flightmantra-contact-icon" />
                <span className="flightmantra-contact-text">
                  <strong>US Office:</strong> RingConn LLC, 1226 NORTH KING ST
                  NUM 292, WILMINGTON, DE 19801, UNITED STATES
                </span>
              </li>
              <li className="flightmantra-contact-item">
                <IoChatbubblesOutline className="flightmantra-contact-icon" />
                <span className="flightmantra-contact-text">
                  We respond to emails within 48 hours. Check your spam folder
                  or call if no reply.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
