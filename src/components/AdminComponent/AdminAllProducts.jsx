import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const AdminAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize navigate function

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        
        if (response.ok) {
          setProducts(data); // Assuming data is an array of products
        } else {
          setErrorMessage('Failed to fetch products');
        }
      } catch (error) {
        setErrorMessage('Error fetching products');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {errorMessage && (
        <div className="mb-4 text-red-600 font-semibold">{errorMessage}</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length === 0 ? (
          <p>No products found</p>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <img
                src={product.images[0]} // Assuming the first image is the main image
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{product.description}</p>
              <p className="text-xl font-bold text-gray-900">৳{product.price}</p>
              {product.discount && (
                <p className="text-sm text-red-600">
                  Discounted: ৳{product.price - (product.price * product.discount) / 100}
                </p>
              )}
              <div className="mt-4 flex justify-between items-center">
                <span
                  className={`${
                    product.isAvailable ? 'text-green-600' : 'text-red-600'
                  } text-sm font-semibold`}
                >
                  {product.isAvailable ? 'Available' : 'Out of Stock'}
                </span>
                <button
  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
  onClick={() => navigate(`/edit-product/${product._id}`)} // Correct path to edit the product
>
  Edit
</button>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminAllProducts;
