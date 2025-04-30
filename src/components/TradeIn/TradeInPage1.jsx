import React from 'react';
import './TradeInPage1.css';

const TradeInPage1 = () => {
  return (
    <div className="trade-in-container">
      <div className="trade-in-content">
        <h1>RingConn Trade-in</h1>
        <p className="subtext">
          Get great value for your old device and apply it towards a new<br />
          RingConn. Fast, easy, and eco-friendly-trade in today!
        </p>
        <div className="divider"></div>
        <button className="buy-now-button">Buy Now</button>
      </div>
    </div>
  );
};

export default TradeInPage1;