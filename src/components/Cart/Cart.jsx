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
  const productId = localStorage.getItem("productId");

  useEffect(() => {
    if (userId) {
      fetch(`http://3.223.253.106:1111/api/Cart/getCartByUserId/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.success && data.data.length > 0) {
            const cart = data.data[0]; // Assuming one cart per user
            const allCartItems = cart.products;
            setCartItems(allCartItems);
            localStorage.setItem("cartId", cart._id); // Save cartId
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

  const handleQtyChange = (productId, delta) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.productId._id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      );
      const updatedProduct = updatedItems.find(
        (item) => item.productId._id === productId
      );
      if (updatedProduct) {
        updateCartOnServer(updatedProduct);
        toast.success("Quantity updated");
      }
      return updatedItems;
    });
  };

  const handleRemoveItem = (productId) => {
    fetch(
      `http://3.223.253.106:1111/api/Cart/deleteCart/${userId}/${productId}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setCartItems((prevItems) =>
            prevItems.filter((item) => item.productId._id !== productId)
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

  const updateCartOnServer = (
    updatedProduct = null,
    productIdToRemove = null
  ) => {
    const updatedProducts = cartItems
      .filter((item) => item.productId._id !== productIdToRemove)
      .map((item) =>
        item.productId._id === updatedProduct?.productId._id
          ? { ...item, quantity: updatedProduct?.quantity }
          : item
      );

    const updatedCart = {
      products: updatedProducts,
    };

    fetch(
      `http://3.223.253.106:1111/api/Cart/updateCart/${userId}/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCart),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast.success("Cart updated successfully");
        } else {
          toast.error("Failed to update cart");
        }
      })
      .catch((error) => {
        console.error("Error updating cart:", error);
        toast.error("Error updating cart");
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
    <div className="cart-container-modern">
      <ToastContainer position="top-right" autoClose={2000} />
      <h1>
        <ShoppingCart size={32} /> Your Shopping Cart
      </h1>
      <div className="cart-flex">
        <div className="cart-items-list">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              item.productId && (
                <div key={item._id} className="cart-item-modern">
                  <img
                    src={item.productId.images?.[0] || "fallback-image.jpg"}
                    alt={item.productId.title || "Product Image"}
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
              )
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
