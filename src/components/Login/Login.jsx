import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { FaFacebookF, FaGoogle, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import loginImg from './images/ringconn_gen_2_air_new.webp';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://3.223.253.106:1111/api/customer/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        const token = data.token;
        localStorage.setItem('token', token);

        // Decode the token to get userId
        const base64Payload = token.split('.')[1];
        const payload = JSON.parse(atob(base64Payload));
        const userId = payload?.id || payload?.userId || payload?.user_id;

        if (userId) {
          localStorage.setItem('userId', userId);
        }

        toast.success(data.message || 'Login successful!');
        setTimeout(() => navigate('/'), 2000);
      } else {
        toast.error(data.message || 'Invalid credentials!');
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="d-flex vh-100">
      <ToastContainer />
      <div className="left-panel d-flex flex-column justify-content-center align-items-center text-white p-5">
        <h2 className="mb-3">New User ?</h2>
        <p className="text-center mb-4">Create Your RingConn Account</p>
        <Link to="/register" className="btn btn-light text-orange fw-bold px-4 py-2 rounded-pill">
          Register
        </Link>
        <div className="illustration mt-5">
          <img src={loginImg} alt="illustration" className="img-fluid" style={{ maxHeight: '200px' }} />
        </div>
      </div>
      <div className="right-panel d-flex flex-column justify-content-center align-items-center flex-grow-1 p-5">
        <h2 className="mb-4 fw-bold">Sign in</h2>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control mb-3 p-3 rounded-pill w-75 shadow-sm"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control mb-2 p-3 rounded-pill w-75 shadow-sm"
        />
        <div className="w-100 text-center mb-3">
          <Link to="/forgot-password" className="text-decoration-none text-orange small">
            Forgot Your Password?
          </Link>
        </div>
        <button
          onClick={handleLogin}
          className="btn btn-orange text-white fw-bold px-5 py-2 rounded-pill mb-4"
        >
          Login
        </button>
        <p className="text-muted">Or Sign in with social platforms</p>
        <div className="d-flex gap-3 mt-2">
          <span className="social-icon bg-white text-orange"><FaFacebookF /></span>
          <span className="social-icon bg-white text-orange"><FaGoogle /></span>
          <span className="social-icon bg-white text-orange"><FaTwitter /></span>
          <span className="social-icon bg-white text-orange"><FaLinkedinIn /></span>
        </div>
      </div>
    </div>
  );
}
