import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AllProducts.css';

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://18.209.91.97:1111/api/Product/getAllProducts');
        const data = await res.json();
        if (data.success) {
          setProducts(data.products);
          setFilteredProducts(data.products);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedColor) {
      filtered = filtered
        .filter(product =>
          product.colorPallets.some(c => c.color === selectedColor)
        )
        .map(product => ({
          ...product,
          images: [
            product.colorPallets.find(c => c.color === selectedColor)?.images
          ],
          colorPallets: product.colorPallets.filter(c => c.color === selectedColor)
        }));
    }

    if (selectedSize) {
      filtered = filtered.filter(product =>
        product.size.includes(selectedSize)
      );
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedColor, selectedSize, products]);

  const getAllSizes = () => [...new Set(products.flatMap(p => p.size))];
  const getAllColors = () => [...new Set(products.flatMap(p => p.colorPallets.map(c => c.color)))];

  return (
    <div className="all-products container">
      <h2 className="mb-4 text-center">All Products</h2>

      <div className="filters mb-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={selectedSize}
          onChange={e => setSelectedSize(e.target.value)}
          className="filter-select"
        >
          <option value="">Filter by Size</option>
          {getAllSizes().map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>

        <select
          value={selectedColor}
          onChange={e => setSelectedColor(e.target.value)}
          className="filter-select"
        >
          <option value="">Filter by Color</option>
          {getAllColors().map(color => (
            <option key={color} value={color}>{color}</option>
          ))}
        </select>

        {(selectedColor || selectedSize || searchTerm) && (
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedColor('');
              setSelectedSize('');
            }}
            className="clear-filters"
          >
            Clear Filters
          </button>
        )}
      </div>

      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product._id} className="product-card-2">
              <img
                src={
                  product.colorPallets.length > 0
                    ? product.colorPallets[0].images
                    : product.images[0]
                }
                alt={product.title}
                className="product-image-2"
              />
              <h4 className="product-title-2">{product.title}</h4>
              <p className="product-price">${product.price}</p>
              <div className="product-colors">
                Color: {product.colorPallets.map(c => c.color).join(', ')}
              </div>
              <button
                className="view-product-btn"
                onClick={() => navigate(`/product/${product._id}`)}
              >
                View Product
              </button>
            </div>
          ))
        ) : (
          <div className="no-results">
            No products match your filters. Try adjusting your search criteria.
          </div>
        )}
      </div>
    </div>
  );
}