// ResetPassword.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ForgotPassword.css'; // Reuse same styles
import forgotImg from './images/ringconn_gen_2_air_new.webp';

export default function ResetPassword() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleReset = async () => {
    try {
      const response = await fetch('http://3.223.253.106:1111/api/customer/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: state?.email,
          otp,
          newPassword,
          confirmPassword
        })
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message || 'Password reset successful!');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        toast.error(data.message || 'Failed to reset password');
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
        <h2 className="mb-4 fw-bold">Reset Password</h2>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="form-control mb-3 p-3 rounded-pill w-75 shadow-sm"
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="form-control mb-3 p-3 rounded-pill w-75 shadow-sm"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="form-control mb-3 p-3 rounded-pill w-75 shadow-sm"
        />
        <button
          onClick={handleReset}
          className="btn btn-orange text-white fw-bold px-5 py-2 rounded-pill mb-4"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}
