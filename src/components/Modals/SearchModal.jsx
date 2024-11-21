import React, { useState } from "react";

const products = [
  { id: 1, name: "Luxury Watch", price: "$1200" },
  { id: 2, name: "Premium Leather Jacket", price: "$1500" },
  { id: 3, name: "Designer Handbag", price: "$2500" },
  // Add more products for testing
];

const SearchModal = ({ closeModal }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-md z-50">
      <div className="relative max-w-md mx-auto mt-20 p-4 bg-white rounded-lg">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
        {searchQuery && (
          <div className="mt-4 max-h-60 overflow-y-auto">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex justify-between items-center py-2"
                >
                  <span>{product.name}</span>
                  <span>{product.price}</span>
                </div>
              ))
            ) : (
              <div>No products found</div>
            )}
          </div>
        )}
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default SearchModal;
