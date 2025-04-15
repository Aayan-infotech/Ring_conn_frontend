import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import "./PaymentSuccessfull.css";

export default function PaymentSuccessfull() {
  const [paymentId, setPaymentId] = useState(null);
  const [payerId, setPayerId] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    setPaymentId(queryParams.get("paymentId"));
    setPayerId(queryParams.get("PayerID"));
  }, []);

  const handleExecutePayment = async () => {
    const userId = localStorage.getItem("userId");
    const cartId = localStorage.getItem("cartId");

    if (!paymentId || !payerId || !userId || !cartId) {
      alert("Missing required data to execute payment.");
      return;
    }

    const payload = {
      paymentId,
      PayerID: payerId,
      userId,
      cartId,
    };

    try {
      const response = await fetch("http://3.223.253.106:1111/api/Transaction/execute-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (data.success) {
        alert("Payment executed successfully!");
        // Optionally clear localStorage and redirect
        localStorage.removeItem("cartId");
        localStorage.removeItem("checkoutAmount");
        window.location.href = "/";
      } else {
        alert("Execution failed: " + data.message);
      }
    } catch (error) {
      console.error("Execution Error:", error);
      alert("Error executing payment.");
    }
  };

  return (
    <div className="payment-success-container d-flex justify-content-center align-items-center vh-100">
      <div className="card text-center shadow-lg p-5 rounded-4">
        <FaCheckCircle className="success-icon mb-4" />
        <h2 className="text-success mb-3">Payment Successful!</h2>
        <p className="mb-4">Thank you for your purchase. Your order has been confirmed.</p>

        <div className="d-flex justify-content-center gap-3">
          <a href="/orders" className="btn btn-success px-4 py-2 rounded-pill fw-semibold">
            View Orders
          </a>
          <button
            onClick={handleExecutePayment}
            className="btn btn-outline-success px-4 py-2 rounded-pill fw-semibold"
          >
            Final Execute
          </button>
        </div>
      </div>
    </div>
  );
}
