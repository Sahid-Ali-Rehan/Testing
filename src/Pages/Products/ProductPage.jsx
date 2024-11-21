import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../../components/Navigation/Navbar';
import Footer from '../../components/Footer/Footer';

// Sample products data (replace with dynamic data later)
const products = [
  { id: 1, name: 'Luxury Watch', price: '$1200', category: 'watches', description: 'A high-end luxury watch with a classic design.', imageUrl: 'https://via.placeholder.com/600x400?text=Product+1' },
  { id: 2, name: 'Premium Leather Jacket', price: '$1500', category: 'clothing', description: 'A stylish leather jacket perfect for any occasion.', imageUrl: 'https://via.placeholder.com/600x400?text=Product+2' },
  { id: 3, name: 'Designer Handbag', price: '$2500', category: 'bags', description: 'A high-quality designer handbag made with premium materials.', imageUrl: 'https://via.placeholder.com/600x400?text=Product+3' },
  { id: 4, name: 'Smartphone Pro Max', price: '$2000', category: 'electronics', description: 'The latest smartphone with advanced features and performance.', imageUrl: 'https://via.placeholder.com/600x400?text=Product+4' },
  { id: 5, name: 'Luxury Car Shoes', price: '$1000', category: 'shoes', description: 'Elegant and comfortable shoes for sophisticated style.', imageUrl: 'https://via.placeholder.com/600x400?text=Product+5' },
  { id: 6, name: 'Gold Necklace', price: '$3500', category: 'jewelry', description: 'A stunning 24k gold necklace, perfect for special occasions.', imageUrl: 'https://via.placeholder.com/600x400?text=Product+6' },
  // Add more products for testing pagination
  { id: 7, name: 'Elegant Sunglasses', price: '$1100', category: 'accessories', description: 'High-end sunglasses with a modern design.', imageUrl: 'https://via.placeholder.com/600x400?text=Product+7' },
  { id: 8, name: 'Designer Watch', price: '$2200', category: 'watches', description: 'A beautifully crafted designer watch.', imageUrl: 'https://via.placeholder.com/600x400?text=Product+8' },
  { id: 9, name: 'Premium Shoes', price: '$1800', category: 'shoes', description: 'Exclusive shoes designed for comfort and style.', imageUrl: 'https://via.placeholder.com/600x400?text=Product+9' },
  { id: 10, name: 'Luxury Car', price: '$70000', category: 'cars', description: 'A luxury car designed for performance and elegance.', imageUrl: 'https://via.placeholder.com/600x400?text=Product+10' },
  { id: 11, name: 'Luxury Sofa', price: '$3000', category: 'furniture', description: 'An ultra-comfortable luxury sofa for your living room.', imageUrl: 'https://via.placeholder.com/600x400?text=Product+11' },
  { id: 12, name: 'Designer Ring', price: '$2500', category: 'jewelry', description: 'A high-end designer ring, perfect for gifting.', imageUrl: 'https://via.placeholder.com/600x400?text=Product+12' },
];

const PRODUCTS_PER_PAGE = 10;

const ProductsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = new URLSearchParams(location.search).get('page') || 1;
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 5000]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const pageStart = (currentPage - 1) * PRODUCTS_PER_PAGE;

  const filteredProducts = products.filter((product) => {
    const productPrice = parseInt(product.price.replace('$', '').replace(',', ''));
    const isInPriceRange = productPrice >= selectedPriceRange[0] && productPrice <= selectedPriceRange[1];
    const isInCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return isInPriceRange && isInCategory;
  });

  const currentProducts = filteredProducts.slice(pageStart, pageStart + PRODUCTS_PER_PAGE);

  const handlePageChange = (page) => {
    navigate(`?page=${page}`);
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (value < selectedPriceRange[1]) {
      setSelectedPriceRange([0, value]);
    } else {
      setSelectedPriceRange([value, selectedPriceRange[1]]);
    }
  };

  return (
    <div className="bg-white text-black min-h-screen p-8">
    <Navbar/>

      <div className="container mx-auto mt-24"> {/* 100px margin top */}
        <h1 className="text-3xl font-semibold text-center mb-8">Our Premium Products</h1>
        
        {/* Filter Section */}
        <div className="flex justify-between mb-8">
          <div className="w-full md:w-1/4 bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Filter</h2>
            <div className="mb-4">
              <label className="block mb-2">Price Range</label>
              <input
                type="range"
                min="0"
                max="5000"
                value={selectedPriceRange[1]}
                onChange={handlePriceChange}
                className="w-full h-2 bg-gray-300 rounded-md"
              />
              <div className="flex justify-between">
                <span>${selectedPriceRange[0]}</span>
                <span>${selectedPriceRange[1]}</span>
              </div>
            </div>
            <div>
              <label className="block mb-2">Category</label>
              <select
                className="w-full p-2 bg-gray-100 rounded-md"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Products</option>
                <option value="watches">Watches</option>
                <option value="shoes">Shoes</option>
                <option value="jewelry">Jewelry</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="bags">Bags</option>
                <option value="cars">Cars</option>
                <option value="furniture">Furniture</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {currentProducts.map((product) => (
            <div key={product.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-56 object-cover mb-6 rounded-lg"
              />
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-lg font-bold text-gray-900 mb-4">{product.price}</p>
              <p className="text-sm text-gray-600 mb-4">{product.description}</p>
              <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all duration-200">
                View Product
              </button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8 mb-8">
          <button
            className="px-4 py-2 mr-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            Previous
          </button>
          <span className="px-4 py-2 text-xl">{currentPage}</span>
          <button
            className="px-4 py-2 ml-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() => handlePageChange(parseInt(currentPage) + 1)}
            disabled={currentPage * PRODUCTS_PER_PAGE >= filteredProducts.length}
          >
            Next
          </button>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ProductsPage;
