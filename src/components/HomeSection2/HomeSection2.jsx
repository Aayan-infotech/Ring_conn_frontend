import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './HomeSection2.css';
import prod1 from './images/gen_2.webp';
import prod2 from './images/ringconn_gen_1.webp';
import prod3 from './images/ringconn_gen_2_air_new.webp';

const products = [
  {
    name: 'RINGCONN GEN 1',
    price: '$34.00',
    image: prod1,
    rating: 5,
  },
  {
    name: 'RINGCONN GEN 2',
    price: '$34.00',
    image: prod2,
    rating: 4,
  },
  {
    name: 'RINGCONN GEN 2 AIR',
    price: '$34.00',
    image: prod3,
    rating: 5,
  },
  {
    name: 'RINGCONN GEN 1',
    price: '$34.00',
    image: prod1,
    rating: 5,
  },
  {
    name: 'RINGCONN GEN 2',
    price: '$34.00',
    image: prod2,
    rating: 4,
  },
  {
    name: 'RINGCONN GEN 2 AIR',
    price: '$34.00',
    image: prod3,
    rating: 5,
  },
  {
    name: 'RINGCONN GEN 1',
    price: '$34.00',
    image: prod1,
    rating: 5,
  },
  {
    name: 'RINGCONN GEN 2',
    price: '$34.00',
    image: prod2,
    rating: 4,
  },
  {
    name: 'RINGCONN GEN 2 AIR',
    price: '$34.00',
    image: prod3,
    rating: 5,
  },
];

export default function HomeSection2() {
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
              <img src={product.image} alt={product.name} className="product-image" />
              <h3 className="product-title">{product.name}</h3>
              <div className="product-rating">
                {'★'.repeat(product.rating)}
                {'☆'.repeat(5 - product.rating)}
              </div>
              <p className="product-price">{product.price}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
