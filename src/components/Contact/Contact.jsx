import React, { useState } from "react";
import "./Contact.css";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";
import { IoChatbubblesOutline } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      date: new Date().toISOString(),
    };

    try {
      const res = await fetch(
        "http://3.223.253.106:1111/api/appointment/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        toast.success("Message sent successfully!");
        setFormData({ fullName: "", email: "", mobile: "", message: "" });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to send message. Please try later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flightmantra-contact-wrapper">
      <ToastContainer />
      <div className="container">
        <div className="row flightmantra-contact-container">
          {/* Contact Form */}
          <div className="col-lg-6 flightmantra-contact-form-section">
            <h2 className="flightmantra-contact-title">Get In Touch</h2>
            <p className="flightmantra-contact-description">
              We respond to emails within 48 hours. Check your spam folder or
              call if no reply.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  name="fullName"
                  className="form-control flightmantra-form-control"
                  placeholder="Enter Your Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control flightmantra-form-control"
                  placeholder="Enter Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="mobile"
                  className="form-control flightmantra-form-control"
                  placeholder="Enter Your Mobile Number"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  name="message"
                  className="form-control flightmantra-form-control"
                  rows="2"
                  placeholder="Enter Your Query Here!"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn flightmantra-btn-send w-100"
                disabled={loading}
              >
                <FaPaperPlane className="me-2" />
                {loading ? "Sending..." : "Send Message"}
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
