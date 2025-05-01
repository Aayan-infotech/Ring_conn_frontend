import React, { useEffect, useState } from "react";
import "./ProductDetails.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) setUserId(storedUserId);
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `http://18.209.91.97:1111/api/Product/getProduct/${id}`
        );
        const data = await res.json();
        if (data.success) {
          setProduct(data.product);
          setSelectedImage(data.product.images[0]);
          setSelectedSize(data.product.size?.[0] || ""); // Set default size
          localStorage.setItem("productId", data.product._id);
        }
      } catch (err) {
        console.error("Failed to load product:", err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleImageClick = (img) => setSelectedImage(img);

  const handleQuantityChange = (type) => {
    if (type === "decrease" && quantity > 1) setQuantity(quantity - 1);
    if (type === "increase" && quantity < 10) setQuantity(quantity + 1);
  };

  const handleSizeSelect = (size) => setSelectedSize(size);

  const handleAddToCart = async () => {
    if (!userId) {
      toast.error("Please login to add items to your cart.");
      return;
    }

    const totalPrice = (product.price * quantity).toFixed(2);

    const cartData = {
      userId: userId,
      products: [
        {
          productId: product._id,
          productPrice: totalPrice,
          title: product.title,
          color: [selectedImage],
          quantity: quantity,
          size: [selectedSize],
        },
      ],
    };

    try {
      const response = await fetch(
        "http://18.209.91.97:1111/api/Cart/createCart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cartData),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success(
          `Added ${quantity} item(s) of size ${selectedSize} to cart at $${totalPrice}.`
        );
        setTimeout(() => {
          navigate("/cart");
        }, 1500);
      } else {
        toast.error("Failed to add product to cart.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("An error occurred while adding the product to the cart.");
    }
  };

  if (!product)
    return <div className="text-center py-5">Loading product...</div>;

  return (
    <div className="product-details container py-5">
      <div className="row g-5">
        {/* Left: Images */}
        <div className="col-md-6">
          <div className="main-image-wrapper mb-3">
            <img
              src={selectedImage}
              alt="Selected"
              className="img-fluid rounded shadow product-image-details"
            />
          </div>
          <div className="d-flex flex-wrap gap-2 thumbnail-images">
            {[...product.images, ...product.colorPallets.map((c) => c.images)].map(
              (img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => handleImageClick(img)}
                  className={`img-thumbnail thumb ${
                    selectedImage === img ? "selected" : ""
                  }`}
                  alt={`thumb-${i}`}
                />
              )
            )}
          </div>
        </div>

        {/* Right: Info */}
        <div className="col-md-6">
          <h2 className="fw-bold mb-2">{product.title}</h2>
          <p className="text-muted mb-2">
            SKU: <span className="fw-semibold">#{product._id.slice(-5)}</span> |{" "}
            <span className="text-success">Status : In Stock</span>
          </p>
          <p className="text-secondary fs-6 mb-4">{product.description}</p>

          {/* Color Selection */}
          <div className="product-option mb-4">
            <p className="option-label">Select Color:</p>
            <div className="d-flex flex-wrap gap-3">
              {product.colorPallets.map((color, i) => (
                <div key={i} className="text-center">
                  <img
                    src={color.images}
                    onClick={() => handleImageClick(color.images)}
                    className={`img-thumbnail color-option ${
                      selectedImage === color.images ? "selected" : ""
                    }`}
                    alt={`color-${i}`}
                    style={{ width: "80px", height: "80px", objectFit: "cover", cursor: "pointer" }}
                  />
                  <div
                    className={`mt-1 fw-semibold small text-capitalize ${
                      selectedImage === color.images ? "text-primary" : "text-muted"
                    }`}
                  >
                    {color.color}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="product-option mb-4">
            <p className="option-label">Select Size:</p>
            <div className="btn-group" role="group">
              {product.size.map((size, i) => (
                <button
                  key={i}
                  onClick={() => handleSizeSelect(size)}
                  className={`btn btn-outline-primary ${
                    selectedSize === size ? "active" : ""
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            <span className="ms-3 text-decoration-underline text-primary size-guide">
              Size Guide
            </span>
          </div>

          {/* Quantity */}
          <div className="product-option">
            <p className="option-label">Select Quantity:</p>
            <div className="input-group quantity-control">
              <button
                className="btn btn-outline-secondary"
                onClick={() => handleQuantityChange("decrease")}
              >
                -
              </button>
              <input
                type="text"
                value={quantity}
                className="form-control text-center"
                readOnly
              />
              <button
                className="btn btn-outline-secondary"
                onClick={() => handleQuantityChange("increase")}
              >
                +
              </button>
            </div>
            <small className="text-muted d-block">Max 10 items</small>
          </div>

          {/* Price & Add to Cart */}
          <div className="d-flex align-items-center flex-wrap gap-3 mt-2">
            <h6 className="fw-bold price-display mb-0">
              Price: ${(product.price * quantity).toFixed(2)}
            </h6>
            <button
              onClick={handleAddToCart}
              className="btn btn-dark text-white d-flex align-items-center gap-2 shadow"
            >
              <FaShoppingCart /> ADD TO CART
            </button>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
