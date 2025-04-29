import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomeSection1.css";
import gen1 from "./images/home-page/ringconn_gen_2.webp";
import gen2 from "./images/home-page/ringconn_gen_2_air.webp";

export default function HomeSection1() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://3.223.253.106:1111/api/Product/getAllProducts")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts(data.products.slice(0, 2)); // Display first 2 products
        }
      });
  }, []);

  const handleCardClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <>
      <div className="home-section py-5">
        <div className="container">
          <div className="row">
            {/* Use gen1 image for the first product */}
            <div className="col-md-6">
              <div
                className="card"
                onClick={() => handleCardClick("680f63c7c396eb51ef10d83f")}
                style={{ cursor: "pointer" }}
              >
                <img src={gen1} alt="RingConn Gen1" className="card-image" />
                <div className="card-overlay">
                  <p className="subtitle">NEW ARRIVALS</p>
                  <h2 className="title">Smart Finger Ring</h2>
                  <p className="shop-now">SHOP NOW</p>
                  <div className="underline"></div>
                </div>
              </div>
            </div>

            {/* Use gen2 image for the second product */}
            <div className="col-md-6">
              <div
                className="card"
                onClick={() => handleCardClick("680f62b8c396eb51ef10d836")}
                style={{ cursor: "pointer" }}
              >
                <img src={gen2} alt="RingConn Gen2" className="card-image" />
                <div className="card-overlay">
                  <p className="subtitle">NEW ARRIVALS</p>
                  <h2 className="title">Smart Couple Ring</h2>
                  <p className="shop-now">SHOP NOW</p>
                  <div className="underline"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="marquee-container">
        <div className="marquee">
          <span>Free express shipping worldwide</span>
          <span className="sparkle">✨</span>
          <span>Free express shipping worldwide</span>
          <span className="sparkle">✨</span>
          <span>Free express shipping worldwide</span>
          <span className="sparkle">✨</span>
        </div>
      </div>
    </>
  );
}
