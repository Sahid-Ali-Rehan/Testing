import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-900 py-16 px-4 md:px-12 relative overflow-hidden">
      {/* Curved Top Corners */}
      <div className="absolute top-0 left-0 w-full h-40 bg-[#f1f1f1] rounded-b-[50%] z-0"></div>

      <div className="relative z-10">
        {/* Main Content of the Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 mb-16">
          {/* Column 1: About Us */}
          <div>
            <h3 className="text-3xl font-semibold mb-6">About Us</h3>
            <p className="text-lg leading-relaxed text-gray-600">
              We are a leading provider of innovative solutions, dedicated to helping businesses grow in the digital era.
            </p>
            <div className="flex space-x-6 mt-6">
              <a href="#" className="hover:text-[#f3a847] transition-all duration-300" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="hover:text-[#f3a847] transition-all duration-300" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="hover:text-[#f3a847] transition-all duration-300" aria-label="LinkedIn">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-3xl font-semibold mb-6">Quick Links</h3>
            <ul>
              <li className="mb-4 hover:text-[#f3a847] transition-all duration-300">
                <a href="#">Home</a>
              </li>
              <li className="mb-4 hover:text-[#f3a847] transition-all duration-300">
                <a href="#">Services</a>
              </li>
              <li className="mb-4 hover:text-[#f3a847] transition-all duration-300">
                <a href="#">Portfolio</a>
              </li>
              <li className="mb-4 hover:text-[#f3a847] transition-all duration-300">
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-3xl font-semibold mb-6">Contact Info</h3>
            <p className="text-lg mb-4">Address: 1234 Digital St, Tech City, CA 94000</p>
            <p className="text-lg mb-4">Phone: (+1) 800-123-4567</p>
            <p className="text-lg mb-4">Email: support@yourcompany.com</p>
            <p className="text-lg mb-4">Fax: (+1) 800-765-4321</p>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-3xl font-semibold mb-6">Subscribe to Our Newsletter</h3>
            <p className="text-lg mb-4">Stay updated with the latest news, offers, and updates.</p>
            <form>
              <input
                type="email"
                className="w-full p-3 rounded-l-lg bg-gray-200 text-gray-900 mb-4"
                placeholder="Your Email"
              />
              <button
                type="submit"
                className="p-3 bg-[#f3a847] text-white rounded-r-lg hover:bg-[#e2943d] transition-all duration-300"
                aria-label="Subscribe"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Google Maps Section (Embedded with Provided Location) */}
        <div className="relative w-full h-[400px] bg-[#f9f9f9] rounded-xl mt-12 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            <iframe
              className="w-full h-full border-0"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d116887.1945842563!2d90.2899195!3d23.7215186!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7351c5b1ba7%3A0x8564f7396612e528!2sAarshi%20Designs!5e0!3m2!1sen!2sbd!4v1731854052660!5m2!1sen!2sbd"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="bg-[#f1f1f1] py-6 text-center mt-16">
        <p className="text-lg text-gray-900">
          &copy; 2024 Elantrix. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
