import React from 'react';
import './Care4.css'; // Changed CSS file name
import image1 from './test1.webp';
import image2 from './test2.png';
import image3 from './test3.png';

const Care4 = () => {
  return (
    <div className="activation-steps-container">
      <h1 className="activation-steps-title">Lost your ring?



</h1>

<h2  className='h2-text'>Here's how to get a new one</h2>
    

      <div className="activation-steps-wrapper">
        {/* Step 1 */}
        <div className="activation-step">
          <div className="activation-step-img-container">
            <img src={image1} alt="Step 1 illustration" className="activation-step-img" />
          </div>
          <div className="activation-step-details">
            <h3 className="activation-step-heading"> STEP 1</h3>


       


            <p className="activation-step-text">Open the app and go to “Me” → “RingConn Care+” → “Initiate Replacement”</p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="activation-step">
          <div className="activation-step-img-container">
            <img src={image2} alt="Step 2 illustration" className="activation-step-img" />
          </div>


          <div className="activation-step-details">
            <h3 className="activation-step-heading"> STEP 2</h3>
            <p className="activation-step-text">Enter your RingConn app email, shipping details, and pay the shipping fee..</p>
          </div>
        </div>
        STEP 3

        {/* Step 3 */}
        <div className="activation-step">
          <div className="activation-step-img-container">
            <img src={image3} alt="Step 3 illustration" className="activation-step-img" />
          </div>
          <div className="activation-step-details">
            <h3 className="activation-step-heading"> STEP 3</h3>
            <p className="activation-step-text">Once completed, sit back and wait for your new ring to arrive..</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Care4;