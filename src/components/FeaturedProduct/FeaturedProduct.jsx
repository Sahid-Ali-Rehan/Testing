import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import "./FeaturedProduct.css";

const FeaturedProduct = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center">
      {/* Background Shapes */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-tr from-blue-400 to-green-300 rounded-full blur-3xl opacity-30 animate-spin-slow"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-red-400 to-yellow-300 rounded-full blur-2xl opacity-40 animate-pulse"></div>

      {/* Diagonal Stripes */}
      <div className="absolute w-[200%] h-[200%] -rotate-45 bg-gradient-to-r from-white/10 to-transparent top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-slide"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-10 px-6 lg:px-20 text-center lg:text-left">
        {/* Product Image */}
        <div className="relative">
          <div className="w-80 h-80 md:w-96 md:h-96 bg-gradient-to-tr from-purple-400 to-pink-300 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center">
            <img
              src="/Images/Featured.jpg"
              alt="Featured Product"
              className="w-60 h-60 md:w-72 md:h-72 rounded-full border-4 border-white shadow-xl"
            />
          </div>
          {/* Floating Badge */}
          <div className="absolute -top-6 -right-6 w-16 h-16 bg-gold text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md animate-bounce">
            NEW
          </div>
        </div>

        {/* Product Info */}
        <div className="max-w-2xl">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white drop-shadow-md leading-snug">
            Winter Vibes Collection
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Redefine your Winter style with our exclusive, lightweight, and trendy apparel. Designed to make you shine under the sun.
          </p>
          <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">
            <button className="bg-white text-purple-600 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-purple-600 hover:text-white transition-all duration-300">
              Shop Now
            </button>
            <button className="bg-transparent border-2 border-white text-white py-3 px-8 rounded-full hover:bg-white hover:text-purple-600 transition-all duration-300 flex items-center gap-2">
              <FaShoppingCart />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;
