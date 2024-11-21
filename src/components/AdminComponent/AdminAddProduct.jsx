import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Switch } from '@headlessui/react';

const AdminAddProduct = () => {
  const [isAvailable, setIsAvailable] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [productName, setProductName] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [imageURLs, setImageURLs] = useState(['']);
  const [sizeChartURL, setSizeChartURL] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [description, setDescription] = useState('');  
  const [availableColors, setAvailableColors] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [productCode, setProductCode] = useState('');

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    if (newColor && !availableColors.includes(newColor)) {
      if (availableColors.length < 5) {
        setAvailableColors([...availableColors, newColor]);
      } else {
        alert('You can only add up to 5 colors');
      }
    }
    console.log('Available Colors:', availableColors); // Log available colors
  };
  
  const handleSizeChange = (e) => {
    const newSize = e.target.value;
    if (newSize && !availableSizes.includes(newSize)) {
      if (availableSizes.length < 5) {
        setAvailableSizes([...availableSizes, newSize]);
      } else {
        alert('You can only add up to 5 sizes');
      }
    }
    console.log('Available Sizes:', availableSizes); // Log available sizes
  };
  

  // Handle removing color tag
  const handleRemoveColor = (color) => {
    setAvailableColors(availableColors.filter((item) => item !== color));
  };

  // Handle removing size tag
  const handleRemoveSize = (size) => {
    setAvailableSizes(availableSizes.filter((item) => item !== size));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate that all fields are filled
    if (!productName || !price || !stockQuantity || !selectedCategory || !selectedSubcategory || !description) {
      setErrorMessage("All fields are required");
      return;
    }
  
    const productData = {
      name: productName,
      price,
      discount,
      category: selectedCategory,
      subcategory: selectedSubcategory,
      stock: stockQuantity,
      images: imageURLs,
      sizeChart: sizeChartURL,
      description,
      colors: availableColors,
      sizes: availableSizes,
      isAvailable,
      productCode,  // Added here
    };
    
  
    try {
      const response = await fetch('http://localhost:5000/api/products/add-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setSuccessMessage('Product added successfully!');
        setErrorMessage('');
        // Reset form fields
        setProductName('');
        setDescription('');
        setPrice('');
        setStockQuantity('');
        setImageURLs([]);
        setSizeChartURL('');
        setAvailableColors([]);
        setAvailableSizes([]);
        setIsAvailable(true);
      } else {
        setErrorMessage(data.message || 'Error adding product');
        setSuccessMessage('');
        console.error(data);  
      }
    } catch (error) {
      setErrorMessage('Error adding product');
      setSuccessMessage('');
      console.error(error);  
    }
  };
  

  const categories = {
    Clothing: ['Men', 'Women', 'Kids'],
    Electronics: ['Phones', 'Laptops', 'Accessories'],
    Home: ['Furniture', 'Decor', 'Kitchen'],
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setSubcategories(categories[category] || []);
  };

  const handleSubcategoryChange = (e) => {
    setSelectedSubcategory(e.target.value);
  };

  const handleAddImage = () => {
    if (imageURLs.length < 5) {
      setImageURLs([...imageURLs, '']);
    }
  };

  const handleImageURLChange = (index, value) => {
    const newImageURLs = [...imageURLs];
    newImageURLs[index] = value;
    setImageURLs(newImageURLs);
  };

  const handleRemoveImage = (index) => {
    setImageURLs(imageURLs.filter((_, i) => i !== index));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100 flex items-center justify-center p-6"
    >
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-4xl">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
          Add New Product
        </h1>

        {successMessage && (
          <div className="mb-4 text-green-600 font-semibold">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="mb-4 text-red-600 font-semibold">{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Product Name */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Product Name
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full border-gray-300 rounded-lg shadow-md p-4 text-gray-800 focus:ring-2 focus:ring-gray-500 focus:outline-none"
              placeholder="E.g., Premium Leather Jacket"
            />
          </div>

          {/* Product Description */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Product Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border-gray-300 rounded-lg shadow-md p-4 text-gray-800 focus:ring-2 focus:ring-gray-500 focus:outline-none"
              placeholder="Describe the product here"
              rows="4"
            />
          </div>

          {/* Price & Discount */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Price (৳)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border-gray-300 rounded-lg shadow-md p-4 text-gray-800 focus:ring-2 focus:ring-gray-500 focus:outline-none"
                placeholder="E.g., 1200"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Discount (%)
              </label>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="w-full border-gray-300 rounded-lg shadow-md p-4 text-gray-800 focus:ring-2 focus:ring-gray-500 focus:outline-none"
                placeholder="E.g., 10"
              />
              <p className="text-sm text-gray-500 mt-1">
                Discounted Price: {price && discount ? `৳${price - (price * discount) / 100}` : 'N/A'}
              </p>
            </div>
          </div>

          {/* Category & Subcategory */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Category
            </label>
            <select
              className="w-full border-gray-300 rounded-lg shadow-md p-4 text-gray-800 focus:ring-2 focus:ring-gray-500 focus:outline-none"
              onChange={handleCategoryChange}
              value={selectedCategory}
            >
              <option value="" disabled>
                Select a category
              </option>
              {Object.keys(categories).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {subcategories.length > 0 && (
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Subcategory
              </label>
              <select
                className="w-full border-gray-300 rounded-lg shadow-md p-4 text-gray-800 focus:ring-2 focus:ring-gray-500 focus:outline-none"
                onChange={handleSubcategoryChange}
                value={selectedSubcategory}
              >
                <option value="" disabled>
                  Select a subcategory
                </option>
                {subcategories.map((subcategory) => (
                  <option key={subcategory} value={subcategory}>
                    {subcategory}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Available Colors */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Available Colors
            </label>
            <div className="flex flex-wrap gap-2">
              <input
                type="text"
                placeholder="Add color"
                onBlur={handleColorChange}
                className="border-gray-300 rounded-lg shadow-md p-2"
              />
              {availableColors.map((color, index) => (
                <span key={index} className="bg-gray-300 text-gray-700 rounded-full px-4 py-2">
                  {color}{' '}
                  <button
                    type="button"
                    onClick={() => handleRemoveColor(color)}
                    className="text-red-500 ml-2"
                  >
                    x
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Available Sizes */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Available Sizes
            </label>
            <div className="flex flex-wrap gap-2">
              <input
                type="text"
                placeholder="Add size"
                onBlur={handleSizeChange}
                className="border-gray-300 rounded-lg shadow-md p-2"
              />
              {availableSizes.map((size, index) => (
                <span key={index} className="bg-gray-300 text-gray-700 rounded-full px-4 py-2">
                  {size}{' '}
                  <button
                    type="button"
                    onClick={() => handleRemoveSize(size)}
                    className="text-red-500 ml-2"
                  >
                    x
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Stock Quantity */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Stock Quantity
            </label>
            <input
              type="number"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
              className="w-full border-gray-300 rounded-lg shadow-md p-4 text-gray-800 focus:ring-2 focus:ring-gray-500 focus:outline-none"
              placeholder="E.g., 50"
            />
          </div>

          {/* Product Images */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Product Images (Max 5)
            </label>
            <div className="space-y-4">
              {imageURLs.map((url, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => handleImageURLChange(index, e.target.value)}
                    className="w-full border-gray-300 rounded-lg shadow-md p-4 text-gray-800 focus:ring-2 focus:ring-gray-500 focus:outline-none"
                    placeholder="Image URL"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddImage}
                className="text-blue-500"
              >
                Add Image
              </button>
            </div>
          </div>

          {/* Size Chart URL */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Size Chart URL (Optional)
            </label>
            <input
              type="url"
              value={sizeChartURL}
              onChange={(e) => setSizeChartURL(e.target.value)}
              className="w-full border-gray-300 rounded-lg shadow-md p-4 text-gray-800 focus:ring-2 focus:ring-gray-500 focus:outline-none"
              placeholder="E.g., https://example.com/size-chart"
            />
          </div>

          <div>
  <label className="block text-lg font-semibold text-gray-700 mb-2">
    Product Code
  </label>
  <input
    type="text"
    value={productCode}
    onChange={(e) => setProductCode(e.target.value)}
    className="w-full border-gray-300 rounded-lg shadow-md p-4 text-gray-800 focus:ring-2 focus:ring-gray-500 focus:outline-none"
    placeholder="E.g., PROD-001"
  />
</div>


          {/* Availability */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Available
            </label>
            <Switch
              checked={isAvailable}
              onChange={setIsAvailable}
              className={`${isAvailable ? 'bg-blue-600' : 'bg-gray-200'}
                relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Availability</span>
              <span
                className={`${
                  isAvailable ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default AdminAddProduct;
