import React from 'react';

const FilterBar = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Filters</h3>
      <div>
        <label className="block text-sm font-medium mb-2">Category</label>
        <select className="w-full p-2 border border-gray-300 rounded-md mb-4">
          <option>All Categories</option>
          <option>Clothing</option>
          <option>Accessories</option>
          <option>Footwear</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Price Range</label>
        <input type="range" min="0" max="1000" step="10" className="w-full" />
      </div>
    </div>
  );
};

export default FilterBar;
