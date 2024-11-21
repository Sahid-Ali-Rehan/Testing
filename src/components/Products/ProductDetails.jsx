import React from 'react';

const ProductDetails = ({ product }) => {
  return (
    <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
      <img src={product.imageUrl} alt={product.name} className="w-full h-72 object-cover mb-6 rounded-lg" />
      <h2 className="text-2xl font-semibold mb-4">{product.name}</h2>
      <p className="text-lg mb-4">{product.description}</p>
      <div className="text-xl font-bold text-gray-900 mb-4">{product.price}</div>
      
      <h3 className="text-lg font-semibold mb-2">Features:</h3>
      <ul className="list-disc pl-6">
        {product.features.map((feature, index) => (
          <li key={index} className="mb-2">{feature}</li>
        ))}
      </ul>
      
      <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetails;
