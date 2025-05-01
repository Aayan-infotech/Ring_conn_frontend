// ForgotPassword.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ForgotPassword.css';
import forgotImg from './images/ringconn_gen_2_air_new.webp';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    try {
      const response = await fetch('http://18.209.91.97:1111/api/customer/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message || 'OTP sent!');
        setTimeout(() => navigate('/reset-password', { state: { email } }), 2000);
      } else {
        toast.error(data.message || 'Failed to send OTP');
      }
    } catch (err) {
      toast.error('Something went wrong. Try again.');
    }
  };

  return (
    <div className="d-flex vh-100">
      <ToastContainer />
      <div className="forgot-left-panel d-flex flex-column justify-content-center align-items-center text-white p-5">
        <h2>Back to Login?</h2>
        <button onClick={() => navigate('/login')} className="btn btn-light text-orange fw-bold px-4 py-2 rounded-pill">
          Login
        </button>
        <div className="illustration mt-5">
          <img src={forgotImg} alt="illustration" className="img-fluid" style={{ maxHeight: '200px' }} />
        </div>
      </div>
      <div className="forgot-right-panel d-flex flex-column justify-content-center align-items-center p-5">
        <h2 className="mb-4 fw-bold">Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control mb-3 p-3 rounded-pill w-75 shadow-sm"
        />
        <button
          onClick={handleSendOTP}
          className="btn btn-orange text-white fw-bold px-5 py-2 rounded-pill mb-4"
        >
          Send OTP
        </button>
        <p className="text-muted small text-center w-75">
          We'll send an OTP to your email to reset your password.
        </p>
      </div>
    </div>
  );
}
