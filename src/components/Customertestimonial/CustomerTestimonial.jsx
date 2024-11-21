import React from "react";

const testimonials = [
  {
    name: "John Doe",
    role: "CEO of Acme Corp",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    testimonial:
      "This product transformed the way we do business. The quality and support are unparalleled!",
  },
  {
    name: "Jane Smith",
    role: "Marketing Head",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    testimonial:
      "A game-changer! Our team's productivity has soared thanks to this incredible service.",
  },
  {
    name: "Michael Johnson",
    role: "Creative Director",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    testimonial:
      "I can’t imagine working without it. The attention to detail and the user experience is top-notch!",
  },
  {
    name: "Emily Clark",
    role: "Product Manager",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    testimonial:
      "I highly recommend this service to anyone looking to improve their workflow. It's just perfect!",
  },
  {
    name: "Daniel Lee",
    role: "Founder of TechSolutions",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    testimonial:
      "This service made our entire team's operations smoother. The efficiency and support are unmatched.",
  },
  {
    name: "Sophia Turner",
    role: "Creative Lead",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    testimonial:
      "I love the seamless integration! Our design workflow is so much faster thanks to this tool.",
  },
];

const Testimonials = () => {
  return (
    <section className="relative py-20 px-4 md:px-12 text-white overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#1e3a8a] via-[#4f6bfc] to-[#1e3a8a] animate-gradient-x opacity-80"></div>

      {/* Content */}
      <div className="relative max-w-screen-xl mx-auto text-center z-10">
        <h2 className="text-5xl font-semibold mb-12 animate-fadeIn text-gray-100">
          What Our Clients Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-90 border-2 border-gray-300 shadow-xl rounded-lg p-8 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:bg-gray-100"
            >
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-medium text-gray-800">{testimonial.name}</h3>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>

              <p className="text-lg text-gray-700 italic mb-4">{testimonial.testimonial}</p>

              {/* Rating (Stars) */}
              <div className="flex justify-center space-x-1">
                <span className="text-yellow-400">★</span>
                <span className="text-yellow-400">★</span>
                <span className="text-yellow-400">★</span>
                <span className="text-yellow-400">★</span>
                <span className="text-yellow-400">★</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
