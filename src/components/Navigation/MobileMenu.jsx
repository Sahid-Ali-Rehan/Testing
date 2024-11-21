import React, { useState } from "react";
import { Link } from "react-router-dom"; // Assuming you are using react-router for navigation

const MobileMenu = ({ toggleMobileMenu }) => {
  const [activeCategory, setActiveCategory] = useState(null);

  // Handle the toggling of subcategory dropdowns
  const toggleCategory = (category) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-white z-50 flex flex-col shadow-lg">
      <div className="flex justify-between items-center p-5 border-b border-gray-200 bg-gray-100">
        <button
          onClick={toggleMobileMenu}
          className="text-gray-600 font-semibold text-lg focus:outline-none"
        >
          Close
        </button>
      </div>
      <nav className="flex flex-col items-center py-4 space-y-4">
  {/* Existing Categories */}
  {["Men's Clothing", "Women's Clothing", "Accessories", "Sale"].map((category, index) => (
    <div key={index} className="w-full">
      {/* Category buttons and dropdowns */}
    </div>
  ))}
  {/* All Products Button */}
  <Link
    to="/product"
    className="text-lg font-medium text-gray-800 w-full text-left px-5 py-3 transition duration-200 ease-in-out hover:bg-gray-100 rounded-md"
  >
    All Products
  </Link>
</nav>

    </div>
  );
};

export default MobileMenu;
