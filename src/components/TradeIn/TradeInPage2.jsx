import React from 'react';
import tradeinImage from './tradeinimage2.webp'; 

const TradeInPage2 = () => {
  return (

    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: 'white',
        padding: '20px'
      }}>
    <div className="trade-in-image-container container-fluid">
      <img 
        src={tradeinImage} 
        alt="Trade in your smart wearable - Get up to $90 when you trade in your device"
        className="trade-in-image img-fluid"
      />
    </div>
    </div>
  );
};

export default TradeInPage2;