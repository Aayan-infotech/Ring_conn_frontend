import React, { useState, useEffect } from "react";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import "./Cart.css";

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Canverse Checkered Shirt",
      brand: "Canverse",
      price: 75.0,
      qty: 1,
    },
    {
      id: 2,
      name: "Long Top with Print",
      brand: "Canverse",
      price: 20.0,
      qty: 1,
    },
    { id: 3, name: "Knitted Sweater", brand: "Saucony", price: 199.0, qty: 1 },
  ]);
  const [promoCode, setPromoCode] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [discountApplied, setDiscountApplied] = useState(false);

  useEffect(() => {
    updateSubtotal();
  }, [cartItems]);

  const handleQtyChange = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateSubtotal = () => {
    const newSubtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
    setSubtotal(newSubtotal);
  };

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "student" && !discountApplied) {
      setSubtotal((prev) => prev * 0.9);
      setDiscountApplied(true);
      alert("Promocode applied! 10% off.");
    } else if (discountApplied) {
      alert("Promocode already applied.");
    } else {
      alert("Invalid promocode.");
    }
  };

  return (
    <div className="cart-container-modern">
      <h1>
        <ShoppingCart size={32} /> Your Shopping Cart
      </h1>
      <div className="cart-flex">
        <div className="cart-items-list">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item-modern">
              <img
                src={`https://via.placeholder.com/100?text=${item.name}`}
                alt={item.name}
              />
              <div className="details">
                <div className="row">
                  <div className="col-md-4">
                    <strong>{item.name}</strong>
                    <br />
                    <span>{item.brand}</span>
                  </div>
                  <div className="col-md-4">
                  <span>Quantity</span>
                    <div className="qty-wrapper">
                      <button onClick={() => handleQtyChange(item.id, -1)}>
                        <Minus size={16} />
                      </button>
                      <span>{item.qty}</span>
                      <button onClick={() => handleQtyChange(item.id, 1)}>
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="col-md-4">
                  <span>Price</span>
                    <div>${(item.price * item.qty).toFixed(2)}</div>
                  </div>
                </div>
              </div>
              <button
                className="remove-btn"
                onClick={() => handleRemoveItem(item.id)}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary-modern">
          <h2>Summary</h2>
          <p>
            <strong>Subtotal:</strong> ${subtotal.toFixed(2)}
          </p>
          <button className="checkout-btn-modern">Proceed to Checkout</button>
          <div className="promo-code-section">
            <input
              type="text"
              placeholder="Enter Promo Code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button onClick={handleApplyPromo}>Apply</button>
          </div>

          <div className="shipping-select">
            <label htmlFor="shipping">Shipping:</label>
            <select id="shipping">
              <option value="">Choose shipping option</option>
              <option value="standard">Standard ($5)</option>
              <option value="express">Express ($15)</option>
            </select>
          </div>

          <textarea
            className="order-comment"
            placeholder="Add comment about your order..."
          ></textarea>
        </div>
      </div>
    </div>
  );
}
