import React, { useState, useEffect } from "react";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaHeart,
  FaMapMarkerAlt,
  FaUser,
  FaSignOutAlt,
  FaKey,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./MyAccount.css";

export default function MyAccount() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setUserData({
        name: "Rishabh",
        orders: 3,
        wishlist: 5,
        addresses: 2,
        email: "rishabh@example.com",
        phone: "+91-1234567890",
      });
    }, 500);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  const renderTabContent = () => {
    if (!userData) return <p>Loading...</p>;

    switch (activeTab) {
      case "dashboard":
        return (
          <div className="tab-content">
            <h3>Welcome, {userData.name} 👋</h3>
            <p>Here’s a quick overview of your recent activity.</p>
            <div className="grid-cards">
              <InfoCard
                title="Orders"
                value={`${userData.orders} pending orders`}
                icon={<FaBoxOpen />}
              />
              <InfoCard
                title="Wishlist"
                value={`${userData.wishlist} items`}
                icon={<FaHeart />}
              />
              <InfoCard
                title="Addresses"
                value={`${userData.addresses} saved`}
                icon={<FaMapMarkerAlt />}
              />
            </div>
          </div>
        );
      case "orders":
        return <p>You have {userData.orders} orders.</p>;
      case "wishlist":
        return <p>You have {userData.wishlist} items in your wishlist.</p>;
      case "addresses":
        return <p>You have {userData.addresses} saved addresses.</p>;
      case "account":
        return (
          <>
            <h4>Account Details</h4>
            <p>
              <strong>Name:</strong> {userData.name}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>Phone:</strong> {userData.phone}
            </p>
          </>
        );
      case "change-password":
        return <ChangePassword />;
      default:
        return <p>Welcome to your account.</p>;
    }
  };

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { id: "orders", label: "Orders", icon: <FaBoxOpen /> },
    { id: "wishlist", label: "Wishlist", icon: <FaHeart /> },
    { id: "addresses", label: "Addresses", icon: <FaMapMarkerAlt /> },
    { id: "account", label: "Account Details", icon: <FaUser /> },
    { id: "change-password", label: "Change Password", icon: <FaKey /> },
  ];

  return (
    <div className="my-account-container">
      <ToastContainer />
      <aside className="sidebar">
        <h3 className="sidebar-title">My Account</h3>
        <ul className="sidebar-nav">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                className={`nav-button ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            </li>
          ))}
          <li>
            <button className="nav-button logout" onClick={handleLogout}>
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </aside>
      <main className="main-content">{renderTabContent()}</main>
    </div>
  );
}

function InfoCard({ title, value, icon }) {
  return (
    <div className="info-card">
      <div className="icon">{icon}</div>
      <div>
        <h5>{title}</h5>
        <p>{value}</p>
      </div>
    </div>
  );
}

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }

    try {
      const response = await fetch('http://3.223.253.106:1111/api/customer/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ oldPassword, newPassword, confirmPassword }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message || "Password changed successfully!");
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        toast.error(data.message || "Failed to change password.");
      }
    } catch (error) {
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <div className="change-password-form">
      <h4>Change Password</h4>
      <input
        type="password"
        placeholder="Old Password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        className="form-control mb-3 p-2 rounded"
      />
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="form-control mb-3 p-2 rounded"
      />
      <input
        type="password"
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="form-control mb-3 p-2 rounded"
      />
      <button
        className="btn btn-orange text-white fw-bold px-4 py-2 rounded"
        onClick={handleChangePassword}
      >
        Update Password
      </button>
    </div>
  );
}
