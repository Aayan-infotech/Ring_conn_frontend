import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './HomeSection2.css';

export default function HomeSection2() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://3.223.253.106:1111/api/Product/getAllProducts");
        const data = await res.json();
        if (data.success) {
          setProducts(data.products);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, []);

  const handleViewProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="home-section-2 container">
      <div className="home-section-header">
        <h2>TRENDING PRODUCTS</h2>
        <div className="category-tabs">
          <span className="active">ALL</span>
          <span>POPULAR</span>
          <span>SALE</span>
          <span>NEW</span>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        navigation
        pagination={{ clickable: true }}
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <div className="product-card mb-5">
              <span className="product-tag">Trending</span>
              <img
                src={product.images[0]}
                alt={product.title}
                className="product-image"
              />
              <h3 className="product-title">{product.title}</h3>
              <div className="product-rating">
                {'★'.repeat(4)}
                {'☆'.repeat(1)}
              </div>
              <p className="product-price">${product.price}</p>
              <button
                className="btn btn-dark mt-2"
                onClick={() => handleViewProduct(product._id)}
              >
                View Product
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
