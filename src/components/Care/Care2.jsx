import React from 'react';
import './Care2.css';

const Care2 = () => {
  return (
    <div className="care-service-container">
      <h1 className="care-service-main-title">RingConn Care+ service scope</h1>
      
      <div className="care-service-cards-container">
        <div className="care-service-card">
          <h2 className="care-service-card-title">Accidental damage</h2>
          <p className="care-service-card-desc">
            Covered if your ring is damaged due to drops, impacts, or wear.
          </p>
        </div>
        
        <div className="care-service-card">
          <h2 className="care-service-card-title">Theft protection</h2>
          <p className="care-service-card-desc">
            Covered if your ring is stolen, ensuring you get a replacement.
          </p>
        </div>
        
        <div className="care-service-card">
          <h2 className="care-service-card-title">Lost ring replacement</h2>
          <p className="care-service-card-desc">
            Covered if you accidentally lose your ring, so you can replace it.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Care2;