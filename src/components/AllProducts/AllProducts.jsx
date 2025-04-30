import React, { useEffect, useState } from 'react';
import './AllProducts.css';

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://3.223.253.106:1111/api/Product/getAllProducts');
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
      filtered = filtered.filter(product =>
        product.colorPallets.some(color => color.color === selectedColor)
      );
    }

    if (selectedSize) {
      filtered = filtered.filter(product => product.size.includes(selectedSize));
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
        />

        <select value={selectedSize} onChange={e => setSelectedSize(e.target.value)}>
          <option value="">Filter by Size</option>
          {getAllSizes().map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>

        <select value={selectedColor} onChange={e => setSelectedColor(e.target.value)}>
          <option value="">Filter by Color</option>
          {getAllColors().map(color => (
            <option key={color} value={color}>{color}</option>
          ))}
        </select>
      </div>

      <div className="product-grid">
        {filteredProducts.map(product => (
          <div key={product._id} className="product-card-2">
            <img src={product.images[0]} alt={product.title} className="product-image-2" />
            <h4 className="product-title-2">{product.title}</h4>
            <p className="product-price">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}