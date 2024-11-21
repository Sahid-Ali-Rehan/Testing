import React, { useState } from "react";

const Cart = () => {
  // Example cart data with random images
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Stylish T-shirt",
      price: 50,
      quantity: 1,
      image: "https://source.unsplash.com/200x200/?shirt",
    },
    
    {
      id: 2,
      name: "Elegant Watch",
      price: 30,
      quantity: 2,
      image: "https://source.unsplash.com/200x200/?watch",
    },
   
    
  ]);

  // Calculate the total price
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Function to handle quantity change
  const handleQuantityChange = (id, type) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: type === "increase" ? item.quantity + 1 : item.quantity - 1,
            }
          : item
      )
    );
  };

  // Function to remove item from cart
  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen w-full bg-white py-20 px-8">
      <div className="max-w-screen-xl mx-auto grid lg:grid-cols-2 gap-16">
        {/* Left Side - Cart Items */}
        <div className="bg-white p-12 rounded-3xl shadow-lg border border-gray-300 transform transition-all duration-500 hover:scale-105">
          <h2 className="text-4xl font-bold text-black mb-8">Your Cart</h2>
          {cartItems.length === 0 ? (
            <p className="text-lg text-gray-500">Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-6 border-b border-gray-200 pb-6 hover:shadow-lg transform transition-all duration-500 hover:scale-105"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded-lg shadow-sm transform transition duration-300 ease-in-out hover:scale-110"
                />
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-black">{item.name}</h3>
                  <p className="text-sm text-gray-600">Price: ${item.price}</p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-4">
                      <button
                        className="bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-200"
                        onClick={() => handleQuantityChange(item.id, "decrease")}
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>
                      <span className="text-lg font-semibold text-black">
                        {item.quantity}
                      </span>
                      <button
                        className="bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-200"
                        onClick={() => handleQuantityChange(item.id, "increase")}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="text-red-500 hover:text-red-700 transition duration-200"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Side - Summary & Checkout */}
        <div className="bg-white p-12 rounded-3xl shadow-lg border border-gray-300 text-black">
          <h2 className="text-4xl font-bold mb-8">Order Summary</h2>
          <div className="space-y-6">
            <div className="flex justify-between text-xl">
              <span>Subtotal</span>
              <span>${total}</span>
            </div>
            <div className="flex justify-between text-xl">
              <span>Shipping</span>
              <span>$10</span>
            </div>
            <div className="flex justify-between text-xl">
              <span>Tax</span>
              <span>$5</span>
            </div>
            <div className="flex justify-between font-bold text-2xl">
              <span>Total</span>
              <span>${total + 10 + 5}</span>
            </div>
            <button className="w-full bg-gray-200 text-black py-3 rounded-lg mt-8 hover:bg-gray-300 transition duration-300">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
