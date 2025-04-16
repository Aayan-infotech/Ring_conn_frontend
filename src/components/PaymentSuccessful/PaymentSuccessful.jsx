import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { Spinner } from "react-bootstrap";
import "./PaymentSuccessfull.css";

export default function PaymentSuccessfull() {
  const queryParams = new URLSearchParams(window.location.search);
  const [paymentId] = useState(queryParams.get("paymentId"));
  const [payerId] = useState(queryParams.get("PayerID"));
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    // Countdown interval
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setLoading(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!loading) {
      const userId = localStorage.getItem("userId");
      const cartId = localStorage.getItem("cartId");

      if (paymentId && payerId && userId && cartId) {
        const payload = {
          paymentId,
          PayerID: payerId,
          userId,
          cartId,
        };

        const executePayment = async () => {
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
              localStorage.removeItem("cartId");
              localStorage.removeItem("checkoutAmount");
              navigate("/"); 
            }
          } catch (error) {
            console.error("Execution Error:", error);
            alert("Error executing payment.");
          }
        };

        executePayment();
      } else {
        alert("Missing required data to execute payment.");
      }
    }
  }, [loading, navigate, paymentId, payerId]);

  if (loading) {
    return (
      <div className="payment-wait-container d-flex justify-content-center align-items-center vh-100 flex-column">
        <Spinner animation="border" variant="success" style={{ width: "4rem", height: "4rem" }} />
        <h4 className="mt-4 text-success fw-semibold">
          Please wait while we confirm your payment...
        </h4>
        <p className="text-muted">Redirecting in {countdown} second{countdown !== 1 && "s"}...</p>
      </div>
    );
  }

  return (
    <div className="payment-success-container d-flex justify-content-center align-items-center container-fluid vh-100">
      <div className="card-success text-center shadow-lg p-5 rounded-4 text-center">
        <FaCheckCircle className="success-icon mb-4 text-center" />
        <h2 className="text-success mb-3">Payment Successful!</h2>
        <p className="mb-4">Thank you for your purchase. Your order has been confirmed.</p>
        <a href="/orders" className="btn btn-success px-4 py-2 rounded-pill fw-semibold">
          View Orders
        </a>
      </div>
    </div>
  );
}
