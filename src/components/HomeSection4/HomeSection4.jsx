import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./HomeSection4.css";
import img1 from "./images/1.webp";
import img2 from "./images/2.webp";
import img3 from "./images/3.webp";
import img4 from "./images/4.webp";
import img5 from "./images/5.webp";
import img6 from "./images/6.webp";

const tabs = [
  { name: "Starting your day", image: img1 },
  { name: "Office hours", image: img2 },
  { name: "Fitness", image: img3 },
  { name: "Activity insights", image: img4 },
  { name: "Restful night", image: img5 },
];

export default function HomeSection4() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <div className="home-section4 container">
        <h2 className="title-home-4">
          From morning to night
          <br />
          Always by your side
        </h2>

        <div className="tabs">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`tab-btn ${activeTab === index ? "active" : ""}`}
              onClick={() => setActiveTab(index)}
            >
              {tab.name}
            </button>
          ))}
        </div>

        <div className="image-container">
          <img src={tabs[activeTab].image} alt={tabs[activeTab].name} />
        </div>
      </div>

      <div className="container-fluid p-0">
        <img src={img6} alt="" className="img-fluid"/>
      </div>
    </>
  );
}
