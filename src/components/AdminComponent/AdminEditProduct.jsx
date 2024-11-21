import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AdminEditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    discount: '',
    category: '',
    subcategory: '',
    stock: '',
    images: ['', '', '', '', ''], // Predefined array with 5 image fields
    sizeChart: '',
    isAvailable: true,
    availableColors: '',
    availableSizes: '',
    productCode: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch product with ID ${id}. Status: ${response.status}`);
        }
        const data = await response.json();
        setProduct(data);
        setFormData({
          name: data.name,
          description: data.description,
          price: data.price,
          discount: data.discount,
          category: data.category,
          subcategory: data.subcategory,
          stock: data.stock,
          images: data.images.concat(new Array(5 - data.images.length).fill('')), // Ensure there are 5 fields
          sizeChart: data.sizeChart,
          isAvailable: data.isAvailable,
          availableColors: data.availableColors?.join(', ') || '',
          availableSizes: data.availableSizes?.join(', ') || '',
          productCode: data.productCode || '',
        });
      } catch (error) {
        console.error('Error fetching product:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const index = name.split('-')[1]; // Extract index from name
    if (name.startsWith('images')) {
      const newImages = [...formData.images];
      newImages[index] = value;
      setFormData({ ...formData, images: newImages });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          images: formData.images.filter((img) => img.trim() !== ''), // Filter out empty fields
          availableColors: formData.availableColors.split(',').map((color) => color.trim()),
          availableSizes: formData.availableSizes.split(',').map((size) => size.trim()),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      // Redirect to the admin products list after successful update
      navigate('/admin/products');
    } catch (error) {
      console.error('Error updating product:', error);
      setError(error.message);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!product) {
    return <div className="text-center">No product found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Edit Product: {product.name}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-lg font-medium">Product Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-lg font-medium">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-lg font-medium">Price</label>
          <input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="discount" className="block text-lg font-medium">Discount</label>
          <input
            id="discount"
            name="discount"
            type="number"
            value={formData.discount}
            onChange={handleChange}
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-lg font-medium">Category</label>
          <input
            id="category"
            name="category"
            type="text"
            value={formData.category}
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="subcategory" className="block text-lg font-medium">Subcategory</label>
          <input
            id="subcategory"
            name="subcategory"
            type="text"
            value={formData.subcategory}
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="stock" className="block text-lg font-medium">Stock</label>
          <input
            id="stock"
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Dynamic Image Fields */}
        {formData.images.map((image, index) => (
          <div key={index}>
            <label htmlFor={`images-${index}`} className="block text-lg font-medium">
              Image {index + 1}
            </label>
            <input
              id={`images-${index}`}
              name={`images-${index}`}
              type="text"
              value={image}
              onChange={handleChange}
              className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        <div>
          <label htmlFor="sizeChart" className="block text-lg font-medium">Size Chart</label>
          <input
            id="sizeChart"
            name="sizeChart"
            type="text"
            value={formData.sizeChart}
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="isAvailable" className="block text-lg font-medium">
            <input
              id="isAvailable"
              name="isAvailable"
              type="checkbox"
              checked={formData.isAvailable}
              onChange={handleChange}
              className="mr-2"
            />
            Available
          </label>
        </div>

        <div>
          <label htmlFor="availableColors" className="block text-lg font-medium">Available Colors (comma separated)</label>
          <input
            id="availableColors"
            name="availableColors"
            type="text"
            value={formData.availableColors}
            onChange={handleChange}
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Add available sizes */}
        <div>
          <label htmlFor="availableSizes" className="block text-lg font-medium">Available Sizes (comma separated)</label>
          <input
            id="availableSizes"
            name="availableSizes"
            type="text"
            value={formData.availableSizes}
            onChange={handleChange}
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="productCode" className="block text-lg font-medium">Product Code</label>
          <input
            id="productCode"
            name="productCode"
            type="text"
            value={formData.productCode}
            onChange={handleChange}
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-md text-lg"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminEditProduct;
