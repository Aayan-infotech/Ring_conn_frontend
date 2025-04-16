import React, { useState, useEffect } from "react";
import {
  FaBoxOpen,
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
  const [activeTab, setActiveTab] = useState("account");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("No user ID found.");
      return;
    }

    fetch("http://3.223.253.106:1111/api/customer/getAllCustomers")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const currentUser = data.data.find((user) => user._id === userId);
          if (currentUser) {
            setUserData({
              name: `${currentUser.First_Name} ${currentUser.Last_Name}`,
              email: currentUser.email,
            });
          } else {
            toast.error("User not found.");
          }
        } else {
          toast.error("Failed to fetch user data.");
        }
      })
      .catch(() => toast.error("Something went wrong!"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    toast.success("Logged out successfully!");
    setTimeout(() => navigate("/login"), 1500);
  };

  const renderTabContent = () => {
    if (!userData) return <p>Loading...</p>;

    switch (activeTab) {
      case "orders":
        return <p>No orders yet.</p>;
      case "addresses":
        return <p>No saved addresses yet.</p>;
      case "account":
        return (
          <div className="tab-content">
            <h2 className="tab-title">Account Info</h2>
            <div className="info-card">
              <p><strong>Name:</strong> {userData.name}</p>
              <p><strong>Email:</strong> {userData.email}</p>
            </div>
          </div>
        );
      case "change-password":
        return <ChangePassword />;
      default:
        return <p>Welcome to your account.</p>;
    }
  };

  const tabs = [
    { id: "account", label: "Account Details", icon: <FaUser /> },
    { id: "orders", label: "Orders", icon: <FaBoxOpen /> },
    { id: "addresses", label: "Addresses", icon: <FaMapMarkerAlt /> },
    { id: "change-password", label: "Change Password", icon: <FaKey /> },
  ];

  return (
    <div className="my-account">
      <ToastContainer />
      <aside className="sidebar">
        <h2 className="sidebar-header">My Account</h2>
        <nav>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`nav-button ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
          <button className="nav-button logout" onClick={handleLogout}>
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </nav>
      </aside>
      <main className="content-area">{renderTabContent()}</main>
    </div>
  );
}

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
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
        toast.success("Password updated!");
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        toast.error(data.message || "Password change failed.");
      }
    } catch {
      toast.error("Error updating password.");
    }
  };

  return (
    <div className="change-password">
      <h2 className="tab-title">Change Password</h2>
      <input
        type="password"
        placeholder="Old Password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        className="input-field"
      />
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="input-field"
      />
      <input
        type="password"
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="input-field"
      />
      <button className="btn-dark" onClick={handleChangePassword}>
        Update Password
      </button>
    </div>
  );
}
