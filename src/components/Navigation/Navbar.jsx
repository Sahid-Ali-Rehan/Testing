import React, { useState, useEffect } from "react";
import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineMenu,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import SearchModal from "../Modals/SearchModal";
import CartModal from "../Modals/CartModal"; // Assuming CartModal is being used here
import Dropdown from "./Dropdown";

const categories = [
  { name: "Men's Clothing", subcategories: ["T-shirts", "Jeans", "Jackets", "Shoes"] },
  { name: "Women's Clothing", subcategories: ["Dresses", "Tops", "Skirts", "Shoes"] },
  { name: "Accessories", subcategories: ["Watches", "Bags", "Belts", "Sunglasses"] },
  { name: "Sale", subcategories: ["Clearance", "Discounted Items"] },
];

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userFirstName, setUserFirstName] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const navigate = useNavigate();

  // Check if the user is logged in and fetch user details on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      fetchUserDetails(token);
    }
  }, []);

  const fetchUserDetails = async (token) => {
    if (!token) {
      console.error("No token provided.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/user-profile", {
        headers: {
          Authorization: `Bearer ${token}`, // Ensure the token has 'Bearer' before it
        },
      });
  
      const data = await response.json();
      
      if (response.ok) {
        setUserFirstName(data.firstName || "U");
      } else {
        console.error("Error fetching user details:", data.message);
      }
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleSearchModal = () => setSearchOpen(!searchOpen);
  const toggleCartModal = () => setCartOpen(!cartOpen);

  const handleButtonMouseEnter = (item) => {
    setActiveButton(item);
    setDropdownOpen(true);
  };

  const handleButtonMouseLeave = () => {
    if (!dropdownOpen) setDropdownOpen(false);
  };

  const handleDropdownMouseEnter = () => setDropdownOpen(true);
  const handleDropdownMouseLeave = () => setDropdownOpen(false);

  const isOverlayActive = searchOpen || cartOpen || dropdownOpen;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 backdrop-blur-md z-40 transition-opacity ${
          isOverlayActive ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      ></div>

      {/* Navbar */}
      <header
        className={`fixed top-0 left-0 w-full z-50 shadow-md transition-all ${
          isOverlayActive ? "backdrop-blur-xl bg-white/80" : "backdrop-blur-sm bg-white/50"
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-6 flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="text-black text-xl font-semibold">
            <img src="/Images/Logo.png" alt="Logo" className="h-10" />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-6">
            {categories.map((category) => (
              <a
                key={category.name}
                href="#"
                onMouseEnter={() => handleButtonMouseEnter(category.name)}
                onMouseLeave={handleButtonMouseLeave}
                className="text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors cursor-pointer"
              >
                {category.name}
              </a>
            ))}
            <Link to="/product" className="text-lg font-medium text-gray-800 hover:text-blue-600">
              All Products
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <AiOutlineSearch
              size={24}
              className="cursor-pointer text-gray-800 hover:text-blue-600 transition-colors"
              onClick={toggleSearchModal}
            />
            <AiOutlineShoppingCart
              size={24}
              className="cursor-pointer text-gray-800 hover:text-blue-600 transition-colors"
              onClick={() => navigate("/cart")} // Navigate to /cart when clicked
            />
            {isLoggedIn ? (
              <div className="relative">
                <Link
                  to="/my-profile" // Redirect to /myprofile when clicked
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold shadow-lg hover:scale-105 transition-transform"
                >
                  {userFirstName.charAt(0).toUpperCase()} {/* Display first letter */}
                </Link>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}

            <AiOutlineMenu
              size={24}
              className="cursor-pointer text-gray-800 hover:text-blue-600 transition-colors md:hidden"
              onClick={toggleMobileMenu}
            />
          </div>
        </div>

        {/* Dropdown */}
        {dropdownOpen && (
          <Dropdown
            activeButton={activeButton}
            handleDropdownMouseEnter={handleDropdownMouseEnter}
            handleDropdownMouseLeave={handleDropdownMouseLeave}
          />
        )}

        {/* Modals */}
        {searchOpen && <SearchModal closeModal={toggleSearchModal} />}
        {cartOpen && <CartModal closeModal={toggleCartModal} />}
        {mobileMenuOpen && <MobileMenu toggleMobileMenu={toggleMobileMenu} />}
      </header>
    </>
  );
};

export default Navbar;
