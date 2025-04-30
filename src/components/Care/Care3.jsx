import React from 'react';
import './Care3.css';
import image1 from './image1.png'; // Replace with your actual image paths
import image2 from './image2.png';
import image3 from './image3.png';

const Care3 = () => {
  return (
    <div className="activation-guide container">
      <h1 className="guide-title">How to use the activation code?</h1>
      <p className="guide-subtitle">
        Your activation code is unique - store it safely and do not disclose it. Before activating your code, please update the app to version 3.5.0 or later.
      </p>

      <div className="steps-container">
        {/* Step 1 */}
        <div className="step">
          <div className="step-image">
            <img src={image1} alt="Step 1 illustration" />
          </div>
          <div className="step-content">
            <h3>1. Purchase & get your code</h3>
            <p>Buy RingConn Care+ on the official website, then find your activation code in the order email or on the order page.</p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="step">
          <div className="step-image">
            <img src={image2} alt="Step 2 illustration" />
          </div>
          <div className="step-content">
            <h3>2. Open the app & navigate</h3>
            <p>Pair your ring with the app, then go to "Me" → "RingConn Care+".</p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="step">
          <div className="step-image">
            <img src={image3} alt="Step 3 illustration" />
          </div>
          <div className="step-content">
            <h3>3. Input & activate</h3>
            <p>Copy and paste your activation code into the field, then tap "Activate".</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Care3;