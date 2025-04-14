import React from "react";
import "./HomeSection1.css";
import gen1 from "./images/home-page/ringconn_gen_2.webp";
import gen2 from "./images/home-page/ringconn_gen_2_air.webp";

export default function HomeSection1() {
  return (
    <>
      <div className="home-section py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <img src={gen1} alt="Men" className="card-image" />
                <div className="card-overlay">
                  <p className="subtitle">NEW ARRIVALS</p>
                  <h2 className="title">RingConn Gen1</h2>
                  <p className="shop-now">SHOP NOW</p>
                  <div className="underline"></div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card">
                <img src={gen2} alt="Women" className="card-image" />
                <div className="card-overlay">
                  <p className="subtitle">NEW ARRIVALS</p>
                  <h2 className="title">RingConn Gen2</h2>
                  <p className="shop-now">SHOP NOW</p>
                  <div className="underline"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="marquee-container">
        <div className="marquee">
          <span>Free express shipping worldwide</span>
          <span className="sparkle">✨</span>
          <span>Free express shipping worldwide</span>
          <span className="sparkle">✨</span>
          <span>Free express shipping worldwide</span>
          <span className="sparkle">✨</span>
          <span>Free express shipping worldwide</span>
          <span className="sparkle">✨</span>
          <span>Free express shipping worldwide</span>
          <span className="sparkle">✨</span>
          <span>Free express shipping worldwide</span>
          <span className="sparkle">✨</span>
          <span>Free express shipping worldwide</span>
          <span className="sparkle">✨</span>
          <span>Free express shipping worldwide</span>
          <span className="sparkle">✨</span>
          <span>Free express shipping worldwide</span>
        </div>
      </div>
    </>
  );
}
