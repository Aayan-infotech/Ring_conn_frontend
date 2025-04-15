import React, { useState, useEffect } from "react";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import "./Cart.css";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [discountApplied, setDiscountApplied] = useState(false);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      fetch(`http://3.223.253.106:1111/api/Cart/getCartByUserId/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.success && data.data.length > 0) {
            // Get all products from all cart entries
            const allCartItems = data.data.flatMap(cart => cart.products);
            setCartItems(allCartItems);
          } else {
            setCartItems([]);
          }
        })
        .catch((error) => console.error("Error fetching cart data:", error));
    } else {
      console.error("User ID not found in localStorage.");
    }
  }, [userId]);

  useEffect(() => {
    updateSubtotal();
  }, [cartItems]);

  const handleQtyChange = (productId, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId._id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.productId._id !== productId)
    );
  };

  const updateSubtotal = () => {
    const newSubtotal = cartItems.reduce(
      (sum, item) => sum + item.productPrice * item.quantity,
      0
    );
    setSubtotal(newSubtotal);
  };



  return (
    <div className="cart-container-modern">
      <h1>
        <ShoppingCart size={32} /> Your Shopping Cart
      </h1>
      <div className="cart-flex">
        <div className="cart-items-list">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item._id} className="cart-item-modern">
                <img
                  src={item.productId.images[0]}
                  alt={item.productId.title}
                />
                <div className="details">
                  <div className="row">
                    <div className="col-md-4">
                      <strong>{item.productId.title}</strong>
                      <br />
                      <span>{item.productId.description}</span>
                    </div>
                    <div className="col-md-4">
                      <span>Quantity</span>
                      <div className="qty-wrapper">
                        <button
                          onClick={() =>
                            handleQtyChange(item.productId._id, -1)
                          }
                        >
                          <Minus size={16} />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleQtyChange(item.productId._id, 1)
                          }
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <span>Price</span>
                      <div>${(item.productPrice * item.quantity).toFixed(2)}</div>
                    </div>
                  </div>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveItem(item.productId._id)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          ) : (
            <p>No items in the cart.</p>
          )}
        </div>

        <div className="cart-summary-modern">
          <h2>Summary</h2>
          <p>
            <strong>Subtotal:</strong> ${subtotal.toFixed(2)}
          </p>
          <button className="checkout-btn-modern">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}
