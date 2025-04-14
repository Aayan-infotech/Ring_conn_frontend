
import React, { useState } from "react";
import {
  FaRegCreditCard,
  FaPaypal,
  FaShippingFast,
  FaMapMarkerAlt,
  FaTags,
} from "react-icons/fa";
import { MdOutlineDeliveryDining } from "react-icons/md";
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
    sameAsShipping: true,
    country: "",
    state: "",
    zip: "",
    address1: "",
  });

  const [delivery, setDelivery] = useState("standard");
  const [payment, setPayment] = useState("creditCard");
  const [promoCode, setPromoCode] = useState("");
  const [orderComment, setOrderComment] = useState("");

  const cartItems = [
    { name: "Checkered Shirt", price: 75 },
    { name: "Long Top with Print", price: 20 },
    { name: "Knitted Sweater", price: 199 },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handlePlaceOrder = () => {
    console.log("Order Placed", {
      shipping,
      billing,
      delivery,
      payment,
      promoCode,
      orderComment,
    });
    alert("Order placed successfully!");
  };

  return (
    <div className="checkout container py-5">
      <h2 className="text-center mb-5 fw-bold display-6 text-primary">
        🛒 Checkout
      </h2>
      <div className="row">
        {/* LEFT SIDE */}
        <div className="col-lg-8">
          {/* Shipping Address */}
          <div className="card shadow p-4 mb-4">
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
                    onChange={(e) =>
                      setShipping({ ...shipping, [field]: e.target.value })
                    }
                  />
                </div>
              ))}
              <div className="col-md-6">
                <select
                  className="form-select"
                  value={shipping.country}
                  onChange={(e) =>
                    setShipping({ ...shipping, country: e.target.value })
                  }
                >
                  <option value="">Select Country</option>
                  <option>United States</option>
                  <option>India</option>
                </select>
              </div>
              <div className="col-md-3">
                <select
                  className="form-select"
                  value={shipping.state}
                  onChange={(e) =>
                    setShipping({ ...shipping, state: e.target.value })
                  }
                >
                  <option value="">State</option>
                  <option>California</option>
                  <option>Texas</option>
                </select>
              </div>
              <div className="col-md-3">
                <input
                  className="form-control"
                  placeholder="Zip Code"
                  value={shipping.zip}
                  onChange={(e) =>
                    setShipping({ ...shipping, zip: e.target.value })
                  }
                />
              </div>
              <div className="col-md-12">
                <input
                  className="form-control"
                  placeholder="Address Line 1"
                  value={shipping.address1}
                  onChange={(e) =>
                    setShipping({ ...shipping, address1: e.target.value })
                  }
                />
              </div>
              <div className="col-md-12">
                <input
                  className="form-control"
                  placeholder="Address Line 2"
                  value={shipping.address2}
                  onChange={(e) =>
                    setShipping({ ...shipping, address2: e.target.value })
                  }
                />
              </div>
              <div className="col-md-12">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="saveAddress"
                    checked={shipping.save}
                    onChange={() =>
                      setShipping({ ...shipping, save: !shipping.save })
                    }
                  />
                  <label className="form-check-label" htmlFor="saveAddress">
                    Save address
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Billing Address */}
          <div className="card shadow p-4 mb-4">
            <h5 className="mb-3 text-secondary">
              <FaMapMarkerAlt className="me-2" />
              Billing Address
            </h5>
            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="sameAddress"
                checked={billing.sameAsShipping}
                onChange={() =>
                  setBilling({
                    ...billing,
                    sameAsShipping: !billing.sameAsShipping,
                  })
                }
              />
              <label htmlFor="sameAddress" className="form-check-label">
                Same as shipping
              </label>
            </div>
            {!billing.sameAsShipping && (
              <div className="row g-3">
                <div className="col-md-6">
                  <select
                    className="form-select"
                    value={billing.country}
                    onChange={(e) =>
                      setBilling({ ...billing, country: e.target.value })
                    }
                  >
                    <option value="">Country</option>
                    <option>United States</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <select
                    className="form-select"
                    value={billing.state}
                    onChange={(e) =>
                      setBilling({ ...billing, state: e.target.value })
                    }
                  >
                    <option value="">State</option>
                    <option>Alabama</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <input
                    className="form-control"
                    placeholder="Zip"
                    value={billing.zip}
                    onChange={(e) =>
                      setBilling({ ...billing, zip: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-12">
                  <input
                    className="form-control"
                    placeholder="Address Line 1"
                    value={billing.address1}
                    onChange={(e) =>
                      setBilling({ ...billing, address1: e.target.value })
                    }
                  />
                </div>
              </div>
            )}
          </div>

          {/* Delivery Method */}
          <div className="card shadow p-4 mb-4">
            <h5 className="mb-3 text-secondary">
              <MdOutlineDeliveryDining className="me-2" />
              Delivery Method
            </h5>
            {["standard", "express", "sameDay"].map((opt) => (
              <div className="form-check" key={opt}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="delivery"
                  id={opt}
                  value={opt}
                  checked={delivery === opt}
                  onChange={() => setDelivery(opt)}
                />
                <label className="form-check-label" htmlFor={opt}>
                  {opt === "standard" && "Standard ($2.99) (3-5 days)"}
                  {opt === "express" && "Express ($10.99) (1-2 days)"}
                  {opt === "sameDay" && "Same Day ($20.00) (Evening)"}
                </label>
              </div>
            ))}
          </div>

          {/* Payment Method */}
          <div className="card shadow p-4 mb-4">
            <h5 className="mb-3 text-secondary">
              <FaRegCreditCard className="me-2" />
              Payment Method
            </h5>
            {["creditCard", "paypal"].map((method) => (
              <div className="form-check mb-2" key={method}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment"
                  id={method}
                  value={method}
                  checked={payment === method}
                  onChange={() => setPayment(method)}
                />
                <label className="form-check-label" htmlFor={method}>
                  {method === "creditCard" ? (
                    <>
                      <FaRegCreditCard className="me-1" /> Credit Card
                    </>
                  ) : (
                    <>
                      <FaPaypal className="me-1" /> Paypal
                    </>
                  )}
                </label>
              </div>
            ))}
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Card Number"
            />
            <div className="row">
              <div className="col-6">
                <select className="form-select mb-2">
                  <option>Month</option>
                </select>
              </div>
              <div className="col-6">
                <select className="form-select mb-2">
                  <option>Year</option>
                </select>
              </div>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="CVV Code"
            />
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-lg-4">
          <div className="card p-4 shadow">
            <h5 className="mb-3 text-secondary">
              <FaTags className="me-2" />
              Order Summary
            </h5>
            <ul className="list-group mb-3">
              {cartItems.map((item, i) => (
                <li
                  className="list-group-item d-flex justify-content-between"
                  key={i}
                >
                  <span>{item.name}</span>
                  <span>${item.price.toFixed(2)}</span>
                </li>
              ))}
              <li className="list-group-item d-flex justify-content-between fw-bold">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </li>
            </ul>
            <label className="form-label">Promo Code:</label>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button className="btn btn-outline-secondary">Apply</button>
            </div>
            <button
              className="btn btn-primary w-100 fw-bold"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
