import React, { useState, useEffect } from "react";

// Data for images, text, buttons, and themes
const slides = [
  {
    image: "https://img.freepik.com/free-psd/urban-fashion-banner-template_23-2148652498.jpg?semt=ais_hybrid",
    title: "Men's Exclusive Collection",
    description: "Upgrade your wardrobe with our premium men's clothing.",
    buttonText: "Shop Men's",
    buttonColor: "bg-blue-600 hover:bg-blue-700",
  },
  {
    image: "https://img.freepik.com/free-psd/banner-urban-fashion-template_23-2148652497.jpg",
    title: "Women's Stylish Outfits",
    description: "Find your perfect look with our chic women's collection.",
    buttonText: "Shop Women's",
    buttonColor: "bg-pink-600 hover:bg-pink-700",
  },
  {
    image: "https://cdn.vectorstock.com/i/500p/72/15/fashion-show-horizontal-banner-vector-47117215.jpg",
    title: "Accessories for Everyone",
    description: "Complete your look with our unique accessories.",
    buttonText: "Browse Accessories",
    buttonColor: "bg-green-600 hover:bg-green-700",
  },
  {
    image: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/fashion-store-facebook-ad-banner-design-template-754121190affdca4b258b77da2984528_screen.jpg?ts=1655421066",
    title: "Massive Discounts Await!",
    description: "Don't miss out on our exclusive sale items.",
    buttonText: "Explore Deals",
    buttonColor: "bg-red-600 hover:bg-red-700",
  },
  {
    image: "https://i.pinimg.com/736x/b4/e9/4f/b4e94f17d5fa7cc6b9d87053414f6c8f.jpg",
    title: "Latest Trends of the Season",
    description: "Discover what's in and stay ahead of the fashion curve.",
    buttonText: "View New Arrivals",
    buttonColor: "bg-purple-600 hover:bg-purple-700",
  },
];

const CategoryBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animateOut, setAnimateOut] = useState(false);

  // Auto-slide functionality with text animations
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateOut(true); // Start animating out
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        setAnimateOut(false); // Reset animation
      }, 1000); // 1-second animation before changing slide
    }, 10000); // 10 seconds between slides
    return () => clearInterval(interval);
  }, []);

  const handleChangeSlide = (index) => {
    setAnimateOut(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setAnimateOut(false);
    }, 1000);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-all duration-1000 ${
            currentIndex === index
              ? "translate-x-0 opacity-100 scale-100"
              : "translate-x-full opacity-0 scale-90"
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

      {/* Text Content */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 transition-all duration-1000 ${
          animateOut ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"
        }`}
      >
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 animate-fadeIn">
          {slides[currentIndex].title}
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-8">{slides[currentIndex].description}</p>
        <button
          className={`px-6 py-3 ${slides[currentIndex].buttonColor} transition-all rounded-full shadow-lg text-lg font-medium`}
        >
          {slides[currentIndex].buttonText}
        </button>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full cursor-pointer transition-all ${
              currentIndex === index
                ? "bg-white scale-125 shadow-lg"
                : "bg-gray-500"
            }`}
            onClick={() => handleChangeSlide(index)}
          ></div>
        ))}
      </div>

      {/* Controls */}
      <div className="absolute inset-0 flex justify-between items-center px-4">
        <button
          className="text-white text-3xl font-bold bg-black/30 hover:bg-black/50 p-4 rounded-full transition-all"
          onClick={() =>
            handleChangeSlide(
              currentIndex === 0 ? slides.length - 1 : currentIndex - 1
            )
          }
        >
          ❮
        </button>
        <button
          className="text-white text-3xl font-bold bg-black/30 hover:bg-black/50 p-4 rounded-full transition-all"
          onClick={() => handleChangeSlide((currentIndex + 1) % slides.length)}
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default CategoryBanner;
