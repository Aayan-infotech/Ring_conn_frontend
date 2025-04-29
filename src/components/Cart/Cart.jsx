import React, { useState, useEffect } from "react";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./Cart.css";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      fetch(`http://3.223.253.106:1111/api/Cart/getCartByUserId/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.success && data.data.length > 0) {
            const cart = data.data[0];
            const allCartItems = cart.products;
            setCartItems(allCartItems);
            localStorage.setItem("cartId", cart._id);
          } else {
            setCartItems([]);
            toast.info("Your cart is empty");
          }
        })
        .catch((error) => {
          console.error("Error fetching cart data:", error);
          toast.error("Failed to fetch cart data");
        });
    } else {
      console.error("User ID not found in localStorage.");
      toast.error("User not logged in");
    }
  }, [userId]);

  useEffect(() => {
    updateSubtotal();
  }, [cartItems]);

  const handleUpdate = (itemId, newQuantity, newSize) => {
    fetch(`http://3.223.253.106:1111/api/Cart/updateCart/${userId}/${itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity: newQuantity.toString(),
        size: [newSize.toString()],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Cart item updated");
          setCartItems((prevItems) =>
            prevItems.map((item) =>
              item._id === itemId
                ? { ...item, quantity: newQuantity, size: [newSize] }
                : item
            )
          );
        } else {
          toast.error("Failed to update item");
        }
      })
      .catch((err) => {
        console.error("Update error:", err);
        toast.error("Error updating cart");
      });
  };

  const handleRemoveItem = (itemId) => {
    fetch(`http://3.223.253.106:1111/api/Cart/deleteCart/${userId}/${itemId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setCartItems((prevItems) =>
            prevItems.filter((item) => item._id !== itemId)
          );
          toast.success("Product removed from cart");
        } else {
          console.error("Failed to remove product from cart");
          toast.error("Failed to remove product");
        }
      })
      .catch((error) => {
        console.error("Error removing product:", error);
        toast.error("Error removing product");
      });
  };

  const updateSubtotal = () => {
    const newSubtotal = cartItems.reduce(
      (sum, item) => sum + item.productPrice * item.quantity,
      0
    );
    setSubtotal(newSubtotal);
  };

  const handleProceedToCheckout = () => {
    localStorage.setItem("checkoutAmount", subtotal.toFixed(2));
    const cartId = localStorage.getItem("cartId");
    if (!cartId) {
      toast.warning("Cart ID not found. Please refresh your cart.");
    }
    navigate("/checkout");
  };

  return (
    <div className="cart-container-modern container">
      <ToastContainer position="top-right" autoClose={2000} />
      <h1>
        <ShoppingCart size={32} /> Your Shopping Cart
      </h1>
      <div className="cart-flex">
        <div className="cart-items-list">
          {cartItems.length > 0 ? (
            cartItems.map((item) =>
              item.productId ? (
                <div key={item._id} className="cart-item-modern">
                  <img
                    src={item.productId.images?.[0] || "fallback-image.jpg"}
                    alt={item.productId.title || "Product Image"}
                  />
                  <div className="details">
                    <div className="row text-center">
                      <div className="col-md-3">
                        <strong>{item.productId.title}</strong>
                        <br />
                        {/* <span>{item.productId.description}</span> */}
                      </div>
                      <div className="col-md-3">
                        <span>Quantity</span>
                        <div className="qty-wrapper">
                          <button
                            onClick={() =>
                              item.quantity > 1 &&
                              handleUpdate(
                                item._id,
                                item.quantity - 1,
                                item.size?.[0] || 1
                              )
                            }
                          >
                            <Minus size={16} />
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() =>
                              handleUpdate(
                                item._id,
                                item.quantity + 1,
                                item.size?.[0] || 1
                              )
                            }
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <span>Your Size</span>
                        <div className="size-wrapper">
                          <select className="p-1"
                            value={item.size?.[0] || "1"}
                            onChange={(e) =>
                              handleUpdate(
                                item._id,
                                item.quantity,
                                e.target.value
                              )
                            }
                          >
                            {[6, 7, 8, 9, 10, 11, 12].map((size) => (
                              <option key={size} value={size}>
                                {size}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <span>Item Price</span>
                        <div className="price-wrapper">
                          ${(item.productPrice * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveItem(item._id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ) : null
            )
          ) : (
            <p>No items in the cart.</p>
          )}
        </div>
        <div className="cart-summary-modern">
          <h2>Your Order Summary</h2>
          <p>
            <strong>Subtotal:</strong> ${subtotal.toFixed(2)}
          </p>
          <button
            className="checkout-btn-modern"
            onClick={handleProceedToCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
