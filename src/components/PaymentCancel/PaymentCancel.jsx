import React, { useEffect } from "react";
// import './PaymentCancel.css';

const PaymentCancel = () => {
  useEffect(() => {
    const stackContainer = document.querySelector(".stack-container");
    const cardNodes = document.querySelectorAll(".card-containerF");
    const perspecNodes = document.querySelectorAll(".perspec");
    const perspec = document.querySelector(".perspec");
    const card = document.querySelector(".card");

    let counter = stackContainer.children.length;

    function randomIntFromInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    card.addEventListener("animationend", function () {
      perspecNodes.forEach(function (elem) {
        elem.classList.add("explode");
      });
    });

    perspec.addEventListener("animationend", function (e) {
      if (e.animationName === "explode") {
        cardNodes.forEach(function (elem) {
          elem.classList.add("pokeup");
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
            node.classList.add("node-" + index);
            elem.querySelector(".code ul").appendChild(node);
            node.setAttribute("style", "--linelength: " + lineLength + "%;");

            if (index === 0) {
              node.classList.add("writeLine");
            } else {
              elem
                .querySelector(".code ul .node-" + (index - 1))
                .addEventListener("animationend", function () {
                  elem
                    .querySelector(".code ul .node-" + index)
                    .classList.add("writeLine");
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
    <div className="containerF">
      <div className="error" style={{ textAlign: "center", padding: "20px" }}>
        <h1 style={{ fontSize: "60px", marginBottom: "35px", color: "#e74c3c" }}>Oops</h1>
        <h2 style={{ fontSize: "28px", marginBottom: "15px" }}>Payment Failed</h2>
        <p style={{ fontSize: "18px", maxWidth: "500px", margin: "0 auto", color: "#555" }}>
          Your payment was not completed. It was a mistake , please try again.
        </p>
      </div>
      <div className="stack-container">
        {cards.map((card, idx) => (
          <div className="card-containerF" key={idx}>
            <div
              className="perspec"
              style={{
                "--spreaddist": `${card.spread}px`,
                "--scaledist": card.scale,
                "--vertdist": `${card.vert}px`,
              }}
            >
              <div className="card">
                <div className="writing">
                  <div className="topbar">
                    <div className="red"></div>
                    <div className="yellow"></div>
                    <div className="green"></div>
                  </div>
                  <div className="code">
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