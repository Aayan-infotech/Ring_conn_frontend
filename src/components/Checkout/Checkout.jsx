import React, { useState, useEffect } from "react";
import { FaRegCreditCard, FaPaypal, FaShippingFast, FaMapMarkerAlt, FaTags } from "react-icons/fa";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { Country, State } from "country-state-city";
import "./Checkout.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Checkout() {
  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    country: "",
    state: "",
    zip: "",
    address1: "",
    address2: "",
    save: false,
  });

  const [billing, setBilling] = useState({
    sameAsShipping: false,
    country: "",
    state: "",
    zip: "",
    address1: "",
  });

  const [delivery, setDelivery] = useState("standard");
  const [payment, setPayment] = useState("creditCard");

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  // Fetch countries on component mount
  useEffect(() => {
    const allCountries = Country.getAllCountries();
    setCountries(allCountries);
  }, []);

  // Fetch states when a country is selected
  useEffect(() => {
    if (shipping.country) {
      const countryStates = State.getStatesOfCountry(shipping.country);
      setStates(countryStates);
    } else {
      setStates([]);
    }
  }, [shipping.country]);

  const cartItems = [
    { name: "Checkered Shirt", price: 75 },
    { name: "Long Top with Print", price: 20 },
    { name: "Knitted Sweater", price: 199 },
  ];

  const subtotal = parseFloat(localStorage.getItem("checkoutAmount")) || 0;

  const handleSaveAddress = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("User ID is missing!");
      return;
    }

    const payload = {
      userId,
      type: "billing", // You can dynamically change between shipping or billing
      savedAddress: true,
      firstName: shipping.firstName || "Rishabh", // Fallback if empty
      lastName: shipping.lastName || "Chandra", // Fallback if empty
      address: shipping.address1,
      apartment: shipping.address2,
      city: shipping.city || "Lucknow", // Fallback if empty
      state: shipping.state,
      pincode: shipping.zip,
      phone: shipping.phone || "9795661095", // Fallback if empty
      countryOrRegion: shipping.country,
    };

    try {
      const response = await fetch("http://18.209.91.97:1111/api/Addres/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to save address");
      }

      const data = await response.json();
      console.log("Save Address Response:", data);
      alert("Address saved successfully!");
    } catch (error) {
      console.error("Error saving address:", error);
      alert("Error saving address.");
    }
  };

  const handlePlaceOrder = async () => {
    const userId = localStorage.getItem("userId");
    const cartId = localStorage.getItem("cartId");
    const amount = Number(localStorage.getItem("checkoutAmount"));

    if (!userId || !cartId || isNaN(amount)) {
      alert("Missing or invalid user, cart, or amount info!");
      return;
    }

    const payload = {
      amount,
      currency: "USD",
      userId,
      cartId,
    };

    try {
      const response = await fetch("http://18.209.91.97:1111/api/Transaction/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to create payment");
      }

      const data = await response.json();
      console.log("Payment Response:", data);

      if (data.approvalUrl) {
        window.location.href = data.approvalUrl;
      } else {
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Error placing order.");
    }
  };

  return (
    <div className="checkout container py-5">
      <h2 className="text-center mb-5 fw-bold display-6 text-primary">🛒 Checkout</h2>
      <div className="row">
        {/* LEFT SIDE */}
        <div className="col-lg-8">
          {/* Shipping Address */}
          <div className="card-address shadow p-4 mb-4">
            <h5 className="mb-3 text-secondary">
              <FaMapMarkerAlt className="me-2" />
              Shipping Address
            </h5>
            <div className="row g-3">
              {["firstName", "lastName"].map((field, idx) => (
                <div className="col-md-6" key={field}>
                  <input
                    className="form-control"
                    placeholder={field.replace(/([A-Z])/, " $1")}
                    value={shipping[field]}
                    onChange={(e) => setShipping({ ...shipping, [field]: e.target.value })}
                  />
                </div>
              ))}
              <div className="col-md-6">
                <select
                  className="form-select"
                  value={shipping.country}
                  onChange={(e) => setShipping({ ...shipping, country: e.target.value })}
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country.isoCode} value={country.isoCode}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-3">
                <select
                  className="form-select"
                  value={shipping.state}
                  onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
                >
                  <option value="">State</option>
                  {states.map((state) => (
                    <option key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-3">
                <input
                  className="form-control"
                  placeholder="Zip Code"
                  value={shipping.zip}
                  onChange={(e) => setShipping({ ...shipping, zip: e.target.value })}
                />
              </div>
              <div className="col-md-12">
                <input
                  className="form-control"
                  placeholder="Address Line 1"
                  value={shipping.address1}
                  onChange={(e) => setShipping({ ...shipping, address1: e.target.value })}
                />
              </div>
              <div className="col-md-12">
                <input
                  className="form-control"
                  placeholder="Address Line 2"
                  value={shipping.address2}
                  onChange={(e) => setShipping({ ...shipping, address2: e.target.value })}
                />
              </div>
              <div className="col-md-12">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="saveAddress"
                    checked={shipping.save}
                    onChange={() => setShipping({ ...shipping, save: !shipping.save })}
                  />
                  <label className="form-check-label" htmlFor="saveAddress">
                    Save address
                  </label>
                </div>
              </div>
            </div>
            {shipping.save && (
              <button className="btn btn-primary w-100 fw-bold mt-3" onClick={handleSaveAddress}>
                Save Address
              </button>
            )}
          </div>

          {/* Billing Address */}
          {/* ... Billing address code ... */}

          {/* Delivery Method */}
          {/* ... Delivery method code ... */}

          {/* Payment Method */}
          {/* ... Payment method code ... */}
        </div>

        {/* Order Summary */}
        <div className="col-lg-4">
          <div className="card p-4 shadow">
            <h5 className="mb-3 text-secondary">
              <FaTags className="me-2" />
              Order Summary
            </h5>
            <ul className="list-group mb-3">
              <li className="list-group-item d-flex justify-content-between fw-bold">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </li>
            </ul>
            <button className="btn btn-primary w-100 fw-bold" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
