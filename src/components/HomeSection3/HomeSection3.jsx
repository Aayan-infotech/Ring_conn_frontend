import React from 'react';
import './HomeSection3.css';
import bannerImg from './images/bg-home-3.webp';

export default function HomeSection3() {
  return (
    <div className="home-section-3 text-white d-flex align-items-center">
      <div className="container-fluid">
        <div className="row align-items-center">
          {/* Left Column */}
          <div className="col-md-6 text-center">
            <h1 className="fw-bold">RingConn Gen 2</h1>
            <p className="subheading">The World's First Ultra-Thin Smart Ring
            </p>
            <h2 className="discount-text">With Sleep Apnea Monitoring</h2>
            <button className="btn btn-outline-light mt-3">SHOP NOW</button>
          </div>

          {/* Right Column */}
          <div className="col-md-6 text-center">
            <img src={bannerImg} alt="Banner" className="img-fluid banner-img" />
          </div>
        </div>
      </div>
    </div>
  );
}
