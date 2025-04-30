import React from 'react';
import './Care5.css';
import replacementImage from './imageforcare.webp'; // Import your image

const Care5 = () => {
  return (
    <div className="replacement-container container-fluid">
      {/* Option 1: Display the image directly */}
      <div className="replacement-image-container">
        <img 
          src={replacementImage} 
          alt="Replacement Details" 
          className="replacement-image"
        />
      </div>


    </div>
  );
};

export default Care5;