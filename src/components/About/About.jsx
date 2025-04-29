import React from 'react';
import "./About.css";
import img1 from "./images/about-us.jpg";
import img2 from "./images/count.png";
import img3 from "./images/journey_1.jpg";
import img4 from "./images/journey_2.webp";

export default function About() {
  return (
    <>
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 p-0">
          <img src={img1} alt="" className='img-fluid img-about-us'/>
        </div>
        <div className="col-md-12 p-0">
          <img src={img2} alt="" className='img-fluid img-about-us'/>
        </div>
        <div className="col-md-12 p-0">
          <img src={img3} alt="" className='img-fluid img-about-us'/>
        </div>
        <div className="col-md-12 p-0">
          <img src={img4} alt="" className='img-fluid img-about-us'/>
        </div>
      </div>
    </div>
    </>
  )
}
