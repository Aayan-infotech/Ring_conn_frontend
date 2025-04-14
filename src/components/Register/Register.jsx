import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css';
import registerImg from './images/ringconn_gen_2_air_new.webp';

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [otp, setOtp] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async () => {
    const { firstName, lastName, email, password } = formData;

    const missingFields = [];
    if (!firstName) missingFields.push('First Name');
    if (!lastName) missingFields.push('Last Name');
    if (!email) missingFields.push('Email');
    if (!password) missingFields.push('Password');

    if (missingFields.length > 0) {
      return toast.error(`Please fill in: ${missingFields.join(', ')}`);
    }

    try {
      const response = await fetch('http://3.223.253.106:1111/api/customer/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          First_Name: firstName,
          Last_Name: lastName,
          email,
          password
        })
      });

      const data = await response.json();

      if (data.success) {
        toast.success('OTP sent successfully to your email!');
        setTimeout(() => setShowOtpModal(true), 800);
      } else {
        toast.error(data.message || 'Registration failed');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await fetch('http://3.223.253.106:1111/api/customer/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          otp: otp
        })
      });

      const data = await response.json();

      if (data.success) {
        toast.success('OTP verified successfully!');
        toast.success('Registered successfully!');
        setShowOtpModal(false);

        setTimeout(() => {
          navigate('/login');
        }, 2500);
      } else {
        toast.error(data.message || 'Incorrect OTP');
      }
    } catch (error) {
      toast.error('OTP verification failed');
    }
  };

  return (
    <>
      <div className="d-flex vh-100">
        <ToastContainer />
        <div className="left-panel-register d-flex flex-column justify-content-center align-items-center text-white p-5">
          <h2 className="mb-3">Welcome Back!</h2>
          <p className="text-center mb-4">Already have a RingConn account?</p>
          <Link to="/login" className="btn btn-light text-orange fw-bold px-4 py-2 rounded-pill">
            Sign In
          </Link>
          <div className="illustration mt-5">
            <img src={registerImg} alt="illustration" className="img-fluid" style={{ maxHeight: '200px' }} />
          </div>
        </div>

        <div className="right-panel-register d-flex flex-column justify-content-center align-items-center flex-grow-1 p-5">
          <h2 className="mb-4 fw-bold">Register</h2>
          <input 
            name="firstName" 
            type="text" 
            placeholder="First Name"
            className="form-control mb-3 p-3 rounded-pill w-75 shadow-sm"
            value={formData.firstName} 
            onChange={handleChange} 
          />
          <input 
            name="lastName" 
            type="text" 
            placeholder="Last Name"
            className="form-control mb-3 p-3 rounded-pill w-75 shadow-sm"
            value={formData.lastName} 
            onChange={handleChange} 
          />
          <input 
            name="email" 
            type="email" 
            placeholder="Email"
            className="form-control mb-3 p-3 rounded-pill w-75 shadow-sm"
            value={formData.email} 
            onChange={handleChange} 
          />
          <input 
            name="password" 
            type="password" 
            placeholder="Password"
            className="form-control mb-4 p-3 rounded-pill w-75 shadow-sm"
            value={formData.password} 
            onChange={handleChange} 
          />
          <button onClick={handleRegister} className="btn btn-orange text-white fw-bold px-5 py-2 rounded-pill mb-3">
            Create Account
          </button>
          <p className="text-muted">
            Already have an account? <Link to="/login" className="text-orange fw-bold text-decoration-none">Login here</Link>
          </p>
        </div>
      </div>

      {/* Modern OTP Modal */}
      {showOtpModal && (
        <div className="custom-modal-backdrop">
          <div className="custom-modal">
            <h4 className="text-center fw-bold mb-3">🔐 Verify OTP</h4>
            <p className="text-muted text-center mb-4">We’ve sent a 6-digit OTP to your email.</p>
            <input
              type="text"
              maxLength={6}
              placeholder="Enter OTP"
              className="form-control text-center fs-5 mb-4 rounded-pill"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <div className="d-flex justify-content-between gap-2">
              <button className="btn btn-outline-secondary rounded-pill w-50" onClick={() => setShowOtpModal(false)}>Cancel</button>
              <button className="btn btn-orange text-white fw-bold rounded-pill w-50" onClick={handleVerifyOtp}>Verify</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
