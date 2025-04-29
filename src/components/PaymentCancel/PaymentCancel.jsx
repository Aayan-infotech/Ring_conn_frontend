import React, { useEffect } from "react";
import './PaymentCancel.css';

const PaymentCancel = () => {
  useEffect(() => {
    const stackContainer = document.querySelector(".pc-stack-container");
    const cardNodes = document.querySelectorAll(".pc-card-container");
    const perspecNodes = document.querySelectorAll(".pc-perspec");
    const perspec = document.querySelector(".pc-perspec");
    const card = document.querySelector(".pc-card");

    let counter = stackContainer.children.length;

    function randomIntFromInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    card.addEventListener("animationend", function () {
      perspecNodes.forEach(function (elem) {
        elem.classList.add("pc-explode");
      });
    });

    perspec.addEventListener("animationend", function (e) {
      if (e.animationName === "pc-explode") {
        cardNodes.forEach(function (elem) {
          elem.classList.add("pc-pokeup");

          elem.addEventListener("click", function () {
            let updown = [800, -800];
            let randomY = updown[Math.floor(Math.random() * updown.length)];
            let randomX = Math.floor(Math.random() * 1000) - 1000;
            elem.style.transform = `translate(${randomX}px, ${randomY}px) rotate(-540deg)`;
            elem.style.transition = "transform 1s ease, opacity 2s";
            elem.style.opacity = "0";
            counter--;
            if (counter === 0) {
              stackContainer.style.width = "0";
              stackContainer.style.height = "0";
            }
          });

          let numLines = randomIntFromInterval(5, 10);

          for (let index = 0; index < numLines; index++) {
            let lineLength = randomIntFromInterval(25, 97);
            var node = document.createElement("li");
            node.classList.add("pc-node-" + index);
            elem.querySelector(".pc-code ul").appendChild(node);
            node.setAttribute("style", "--linelength: " + lineLength + "%;");

            if (index === 0) {
              node.classList.add("pc-writeLine");
            } else {
              elem
                .querySelector(".pc-code ul .pc-node-" + (index - 1))
                .addEventListener("animationend", function () {
                  elem
                    .querySelector(".pc-code ul .pc-node-" + index)
                    .classList.add("pc-writeLine");
                });
            }
          }
        });
      }
    });
  }, []);

  const cards = [
    { spread: 125, scale: 0.75, vert: -25 },
    { spread: 100, scale: 0.8, vert: -20 },
    { spread: 75, scale: 0.85, vert: -15 },
    { spread: 50, scale: 0.9, vert: -10 },
    { spread: 25, scale: 0.95, vert: -5 },
    { spread: 0, scale: 1, vert: 0 },
  ];

  return (
    <div className="pc-container">
      <div className="pc-error">
        <h1>Oops</h1>
        <h2>Payment Failed</h2>
        <p>Your payment was not completed. It was a mistake, please try again.</p>
      </div>
      <div className="pc-stack-container">
        {cards.map((card, idx) => (
          <div className="pc-card-container" key={idx}>
            <div
              className="pc-perspec"
              style={{
                "--spreaddist": `${card.spread}px`,
                "--scaledist": card.scale,
                "--vertdist": `${card.vert}px`,
              }}
            >
              <div className="pc-card">
                <div className="pc-writing">
                  <div className="pc-topbar">
                    <div className="pc-red"></div>
                    <div className="pc-yellow"></div>
                    <div className="pc-green"></div>
                  </div>
                  <div className="pc-code">
                    <ul></ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentCancel;