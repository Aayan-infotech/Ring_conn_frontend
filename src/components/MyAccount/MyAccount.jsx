import React, { useState, useEffect } from "react";
import {
  FaBoxOpen,
  FaMapMarkerAlt,
  FaUser,
  FaSignOutAlt,
  FaKey,
  FaEdit,
  FaTrash,
  FaPlus,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./MyAccount.css";

export default function MyAccount() {
  const [activeTab, setActiveTab] = useState("account");
  const [userData, setUserData] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const fetchAddresses = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.warn("No userId found in localStorage");
      toast.error("User not logged in!");
      return;
    }
    fetch(`http://18.209.91.97:1111/api/Addres/getAddresses/${userId}`)
      .then((res) => res.json())
      .then((data) => setAddresses(data))
      .catch((err) => {
        console.error("Error fetching addresses:", err);
        toast.error("Failed to load address data.");
      });
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("No user ID found.");
      return;
    }

    fetch("http://18.209.91.97:1111/api/customer/getAllCustomers")
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

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    if (tabId === "orders") {
      navigate("/orders");
    }
  };

  const handleAddNewAddress = () => {
    setCurrentAddress({
      firstName: "",
      lastName: "",
      company: "",
      address: "",
      apartment: "",
      city: "",
      state: "",
      pincode: "",
      phone: "",
      type: "billing",
      countryOrRegion: "India",
      savedAddress: true,
    });
    setIsEditing(false);
    setShowAddressModal(true);
  };

  const handleEditAddress = (address) => {
    setCurrentAddress({ ...address });
    setIsEditing(true);
    setShowAddressModal(true);
  };

  const handleDeleteAddress = (addressId) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      fetch(`http://18.209.91.97:1111/api/Addres/deleteAddress/${addressId}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            toast.success("Address deleted successfully");
            fetchAddresses();
          } else {
            toast.error(data.message || "Failed to delete address");
          }
        })
        .catch((err) => {
          console.error("Error deleting address:", err);
          toast.error("Error deleting address");
        });
    }
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");

    const addressData = {
      userId,
      type: currentAddress.type,
      savedAddress: currentAddress.savedAddress,
      countryOrRegion: currentAddress.countryOrRegion,
      firstName: currentAddress.firstName || userData?.name.split(" ")[0] || "",
      lastName: currentAddress.lastName || userData?.name.split(" ")[1] || "",
      company: currentAddress.company,
      address: currentAddress.address,
      apartment: currentAddress.apartment,
      city: currentAddress.city,
      state: currentAddress.state,
      pincode: currentAddress.pincode,
      phone: currentAddress.phone,
    };

    const url = isEditing
      ? `http://18.209.91.97:1111/api/Addres/update/${currentAddress._id}`
      : `http://18.209.91.97:1111/api/Addres/add`;

    const method = isEditing ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addressData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(
            `Address ${isEditing ? "updated" : "added"} successfully`
          );
          fetchAddresses();
          setShowAddressModal(false);
        } else {
          toast.error(
            data.message || `Failed to ${isEditing ? "update" : "add"} address`
          );
        }
      })
      .catch((err) => {
        console.error(
          `Error ${isEditing ? "updating" : "adding"} address:`,
          err
        );
        toast.error(`Error ${isEditing ? "updating" : "adding"} address`);
      });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setCurrentAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const renderTabContent = () => {
    if (!userData) return <p>Loading...</p>;

    switch (activeTab) {
      case "orders":
        return <p>No orders yet.</p>;
      case "addresses":
        return (
          <div className="address-list tab-content modern-addresses">
            <div className="address-header-container">
              <h4 className="tab-title">Saved Addresses</h4>
              <button className="add-address-btn" onClick={handleAddNewAddress}>
                <FaPlus /> Add New Address
              </button>
            </div>
            {addresses.length === 0 ? (
              <p>No addresses found.</p>
            ) : (
              addresses.map((addr) => (
                <div key={addr._id} className="address-card-modern">
                  <div className="address-card-header">
                    <div>
                      <p className="address-type">
                        {addr.type === "billing" ? "Billing" : "Delivery"}{" "}
                        Address
                      </p>
                      <p className="address-name">
                        {addr.firstName} {addr.lastName}
                      </p>
                    </div>
                    <div className="address-actions">
                      <button
                        className="address-edit-btn"
                        onClick={() => handleEditAddress(addr)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="address-delete-btn"
                        onClick={() => handleDeleteAddress(addr._id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  <div className="address-details">
                    {addr.company && (
                      <p>
                        <strong>Company:</strong> {addr.company}
                      </p>
                    )}
                    <p>
                      <strong>Address:</strong> {addr.address}, {addr.apartment}
                    </p>
                    <p>
                      <strong>City:</strong> {addr.city}, {addr.state} -{" "}
                      {addr.pincode}
                    </p>
                    <p>
                      <strong>Country:</strong> {addr.countryOrRegion}
                    </p>
                    <p>
                      <strong>Phone:</strong> {addr.phone}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        );
      case "account":
        return (
          <div className="tab-content">
            <h2 className="tab-title">Account Info</h2>
            <div className="info-card">
              <p>
                <strong>Name:</strong> {userData.name}
              </p>
              <p>
                <strong>Email:</strong> {userData.email}
              </p>
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
              onClick={() => handleTabClick(tab.id)}
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

      {/* Address Modal */}
      {showAddressModal && (
        <div className="address-modal-overlay">
          <div className="address-modal-container">
            <div className="address-modal-header">
              <h3>{isEditing ? "Edit Address" : "Add New Address"}</h3>
              <button
                className="address-modal-close"
                onClick={() => setShowAddressModal(false)}
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleAddressSubmit}>
              <div className="address-form-row">
                <div className="address-form-group">
                  <label>First Name (Optional)</label>
                  <input
                    type="text"
                    name="firstName"
                    value={currentAddress.firstName}
                    onChange={handleAddressChange}
                    placeholder="Will use account name if empty"
                  />
                </div>
                <div className="address-form-group">
                  <label>Last Name (Optional)</label>
                  <input
                    type="text"
                    name="lastName"
                    value={currentAddress.lastName}
                    onChange={handleAddressChange}
                    placeholder="Will use account name if empty"
                  />
                </div>
              </div>

              <div className="address-form-group">
                <label>Company (Optional)</label>
                <input
                  type="text"
                  name="company"
                  value={currentAddress.company}
                  onChange={handleAddressChange}
                />
              </div>

              <div className="address-form-group">
                <label>Address*</label>
                <input
                  type="text"
                  name="address"
                  value={currentAddress.address}
                  onChange={handleAddressChange}
                  required
                />
              </div>

              <div className="address-form-group">
                <label>Apartment/Unit (Optional)</label>
                <input
                  type="text"
                  name="apartment"
                  value={currentAddress.apartment}
                  onChange={handleAddressChange}
                />
              </div>

              <div className="address-form-row">
                <div className="address-form-group">
                  <label>City*</label>
                  <input
                    type="text"
                    name="city"
                    value={currentAddress.city}
                    onChange={handleAddressChange}
                    required
                  />
                </div>
                <div className="address-form-group">
                  <label>State*</label>
                  <input
                    type="text"
                    name="state"
                    value={currentAddress.state}
                    onChange={handleAddressChange}
                    required
                  />
                </div>
                <div className="address-form-group">
                  <label>Pincode*</label>
                  <input
                    type="text"
                    name="pincode"
                    value={currentAddress.pincode}
                    onChange={handleAddressChange}
                    required
                  />
                </div>
              </div>

              <div className="address-form-row">
                <div className="address-form-group">
                  <label>Phone*</label>
                  <input
                    type="text"
                    name="phone"
                    value={currentAddress.phone}
                    onChange={handleAddressChange}
                    required
                  />
                </div>
                <div className="address-form-group">
                  <label>Address Type*</label>
                  <select
                    name="type"
                    value={currentAddress.type}
                    onChange={handleAddressChange}
                    required
                  >
                    <option value="billing">Billing</option>
                    <option value="delivery">Delivery</option>
                  </select>
                </div>
              </div>

              <div className="address-form-group">
                <label>Country/Region*</label>
                <input
                  type="text"
                  name="countryOrRegion"
                  value={currentAddress.countryOrRegion}
                  onChange={handleAddressChange}
                  required
                />
              </div>

              <div className="address-modal-actions">
                <button
                  type="button"
                  className="address-modal-cancel"
                  onClick={() => setShowAddressModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="address-modal-submit">
                  {isEditing ? "Update Address" : "Save Address"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(
        "http://18.209.91.97:1111/api/customer/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ oldPassword, newPassword, confirmPassword }),
        }
      );

      const data = await response.json();
      if (data.success) {
        toast.success("Password updated!");
        setOldPassword("");
        setNewPassword("");

        localStorage.removeItem("token");
        localStorage.removeItem("userId");

        setTimeout(() => navigate("/login"), 1500);
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
