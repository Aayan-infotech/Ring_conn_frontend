import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import "./PaymentSuccessfull.css";

export default function PaymentSuccessfull() {
  return (
    <div className="payment-success-container d-flex justify-content-center align-items-center vh-100">
      <div className="card text-center shadow-lg p-5 rounded-4">
        <FaCheckCircle className="success-icon mb-4" />
        <h2 className="text-success mb-3">Payment Successful!</h2>
        <p className="mb-4">Thank you for your purchase. Your order has been confirmed.</p>
        <a href="/orders" className="btn btn-success px-4 py-2 rounded-pill fw-semibold">
          View Orders
        </a>
      </div>
    </div>
  );
}
