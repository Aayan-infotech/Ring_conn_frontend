import React from 'react';
import './TradeInPage3.css';

const TradeInPage3 = () => {
  return (
    <div className="tradein-container container">
    <h1 className="tradein-heading">How to trade-in your device?</h1>
    
    <div className="steps-row">
      <div className="step-card">
        <div className="step-number">STEP 1</div>
        <div className="step-description">Choose the device for trade-in at checkout.</div>
      </div>
      
      <div className="step-card">
        <div className="step-number">STEP 2</div>
        <div className="step-description">Provide accurate details as required.</div>
      </div>
      
      <div className="step-card">
        <div className="step-number">STEP 3</div>
        <div className="step-description">Complete your purchase and wait for delivery.</div>
      </div>
      
      <div className="step-card">
        <div className="step-number">STEP 4</div>
        <div className="step-description">Send back your old device after receiving the new one.</div>
      </div>
    </div>
    
    <div className="tradein-note">
      <p>Note: After successfully verifying your trade-in, complete your payment within 15 minutes to secure your discount. If the time expires, you'll need to verify again.</p>
    </div>
  </div>
  );
};

export default TradeInPage3;