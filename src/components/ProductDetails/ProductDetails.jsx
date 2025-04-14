import React, { useEffect, useState } from 'react';
import './ProductDetails.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaShoppingCart } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode'; // ✅ Correct import

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [userId, setUserId] = useState(null);

  // ✅ Extract user ID from token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const id = decoded.id || decoded.userId || decoded._id;
        setUserId(id);
        localStorage.setItem('userId', id);
      } catch (err) {
        console.error('Invalid token', err);
      }
    }
  }, []);

  // ✅ Fetch product by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://3.223.253.106:1111/api/Product/getProduct/${id}`);
        const data = await res.json();
        if (data.success) {
          setProduct(data.product);
          setSelectedImage(data.product.images[0]);
          setSelectedSize(data.product.size[0]);
        }
      } catch (err) {
        console.error('Failed to load product:', err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleImageClick = (img) => setSelectedImage(img);

  const handleQuantityChange = (type) => {
    if (type === 'decrease' && quantity > 1) setQuantity(quantity - 1);
    if (type === 'increase' && quantity < 10) setQuantity(quantity + 1);
  };

  const handleSizeSelect = (size) => setSelectedSize(size);

  const handleAddToCart = () => {
    // You can later replace this with an API call using userId and product details
    toast.info(`Added ${quantity} item(s) of size ${selectedSize} to cart.`);
  };

  if (!product) return <div className="text-center py-5">Loading product...</div>;

  return (
    <div className="product-details container py-5">
      <div className="row g-5">
        {/* Left: Image Preview */}
        <div className="col-md-6">
          <div className="main-image-wrapper mb-3">
            <img src={selectedImage} alt="Selected" className="img-fluid rounded shadow product-image-details" />
          </div>
          <div className="d-flex flex-wrap gap-2 thumbnail-images">
            {[...product.images, ...product.colorPallets.map(c => c.images)].map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => handleImageClick(img)}
                className={`img-thumbnail thumb ${selectedImage === img ? 'selected' : ''}`}
                alt={`thumb-${i}`}
              />
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="col-md-6">
          <h2 className="fw-bold display-6 mb-2">{product.title}</h2>
          <p className="text-muted mb-2">SKU: <span className="fw-semibold">#{product._id.slice(-5)}</span> | <span className="text-success">ACTIVE</span></p>
          <p className="text-secondary fs-6 mb-4">{product.description}</p>

          <div className="product-option mb-4">
            <p className="option-label">COLOR:</p>
            <div className="d-flex gap-3">
              {product.colorPallets.map((color, i) => (
                <img
                  key={i}
                  src={color.images}
                  onClick={() => handleImageClick(color.images)}
                  className={`img-thumbnail color-option ${selectedImage === color.images ? 'selected' : ''}`}
                  alt={`color-${i}`}
                />
              ))}
            </div>
          </div>

          <div className="product-option mb-4">
            <p className="option-label">SIZE:</p>
            <div className="btn-group" role="group">
              {product.size.map((size, i) => (
                <button
                  key={i}
                  onClick={() => handleSizeSelect(size)}
                  className={`btn btn-outline-primary ${selectedSize === size ? 'active' : ''}`}
                >
                  {size}
                </button>
              ))}
            </div>
            <span className="ms-3 text-decoration-underline text-primary size-guide">Size Guide</span>
          </div>

          <div className="product-option mb-4">
            <p className="option-label">MODEL:</p>
            <div className="btn-group">
              {product.model.map((model, i) => (
                <button key={i} className="btn btn-outline-dark btn-sm disabled">{model}</button>
              ))}
            </div>
          </div>

          <div className="product-option mb-4">
            <p className="option-label">QTY:</p>
            <div className="input-group quantity-control">
              <button className="btn btn-outline-secondary" onClick={() => handleQuantityChange('decrease')}>-</button>
              <input type="text" value={quantity} className="form-control text-center" readOnly />
              <button className="btn btn-outline-secondary" onClick={() => handleQuantityChange('increase')}>+</button>
            </div>
            <small className="text-muted d-block">Max 10 items</small>
          </div>

          <h3 className="text-primary fw-bold price-display">
            ${product.price.toFixed(2)}
          </h3>

          <button onClick={handleAddToCart} className="btn btn-info text-white w-100 d-flex align-items-center justify-content-center gap-2 mt-4 shadow">
            <FaShoppingCart /> ADD TO CART
          </button>

          <p className="mt-4 fw-semibold text-success checkout-note">GUARANTEED SAFE CHECKOUT</p>
        </div>
      </div>

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
}
