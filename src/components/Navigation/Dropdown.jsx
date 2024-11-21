import React from "react";

// Categories for easy customization, including custom sizes
const categories = {
  "Men's Clothing": [
    { img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoaBkWLyDKfogwjaOaGOInFqTS3GwfvtfBE91I2TQqsNodM3v8X7HzIiI&s", name: "Shirt" },
    { img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi4kXZ9tgtm8eNAm7b5Fu6TOlupEAEcVipOovEzNzP6PRwdqFOzyjKVtcJyA&s", name: "Jeans" },
    { name: "Jacket" },  // Added item with no image
    { name: "T-shirt" },  // Added item with no image
  ],
  "Women's Clothing": [
    { img: "https://kimurakami.com/cdn/shop/files/kimono-traditional-dress_1080x.jpg?v=1716524353", name: "Dress", size: { height: 250, width: 200 } },
    { img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY8IAiW05HB17ufvUB-Xbll4Yob2BLcnG1utrd5C8aIPimDr46xXbrr98MAFZL59_JYp7Uow&s", name: "Tops" },
    { img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkUxQumIvG4xY9EaekKgtmnk1PRFDd0R9ZOLcbATRdgd5iAHlts7i0o0k&s", name: "Salwar" },
    { name: "Skirt" },  // Added item with no image
    { name: "Pant" }, // Added item with no image
  ],
  Accessories: [
    { img: "https://smartdeal.com.bd/public/uploads/all/Azu6hg0hiKh7fPNAKikWaJBTHqgLBdJY5WvhBqHs.jpg", name: "Watches" },
    { img: "https://m.media-amazon.com/images/I/61GpT8+nFXL._AC_SL1008_.jpg", name: "Bags" },
    { name: "Sunglasses" }, // Added item with no image
    { name: "Hats" }, // Added item with no image
  ],
  Sale: [
    { img: "https://static.vecteezy.com/system/resources/thumbnails/015/340/713/small_2x/sale-promotion-label-for-marketing-concept-png.png", name: "Discounted", size: { height: 150 }  },
    { name: "Clearance" }, // Added item with no image
  ],
};

const Dropdown = ({
  activeButton,
  handleDropdownMouseEnter,
  handleDropdownMouseLeave,
  defaultHeight = 200, // Default height if no custom size is provided
  defaultWidth = 200, // Default width if no custom size is provided
}) => {
  return (
    <div
      onMouseEnter={handleDropdownMouseEnter}
      onMouseLeave={handleDropdownMouseLeave}
      className="absolute top-16 left-0 w-full bg-white shadow-lg border-t border-gray-200 z-50"
    >
      <div className="max-w-screen-xl mx-auto px-6 py-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Left Content */}
          <div>
            <h2 className="text-lg font-bold text-gray-800">Explore More</h2>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              {categories[activeButton]?.map((product, idx) => (
                <li key={idx}>
                  <a href="#" className="block hover:text-blue-600">{product.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Content with Product Images */}
          <div className="flex flex-wrap justify-between space-x-4">
            {categories[activeButton]?.map((product, idx) => {
              const { img, name, size } = product;
              const { height = defaultHeight, width = defaultWidth } = size || {};

              return (
                <div key={idx} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                  {img ? (
                    <img
                      src={img}
                      alt={name}
                      className="object-cover rounded-lg transition-all"
                      style={{
                        height: `${height}px`, // Dynamic height
                        width: `${width}px`,   // Dynamic width
                      }}
                    />
                  ) : (
                    <div className="h-48"></div> // Empty div, no effect
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
