import React from 'react';

const RelatedProducts = ({ productId }) => {
  // Replace this with an API call to fetch related products
  const relatedProducts = [
    {
      id: '2',
      name: 'Related Product 1',
      price: '$800',
      imageUrl: 'https://via.placeholder.com/300x200',
    },
    {
      id: '3',
      name: 'Related Product 2',
      price: '$600',
      imageUrl: 'https://via.placeholder.com/300x200',
    },
    {
      id: '4',
      name: 'Related Product 3',
      price: '$700',
      imageUrl: 'https://via.placeholder.com/300x200',
    },
  ];

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold mb-6">Related Products</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedProducts.map((product) => (
          <div key={product.id} className="bg-white p-6 rounded-lg shadow-lg">
            <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover mb-4 rounded-lg" />
            <h4 className="text-xl font-semibold mb-2">{product.name}</h4>
            <p className="text-lg font-bold text-gray-900">{product.price}</p>
            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
              View Product
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
