import { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiUser, FiShoppingBag } from "react-icons/fi";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const categories = [
    { name: "Women", subcategories: ["Tops", "Dresses", "Bottoms", "Footwear"] },
    { name: "Men", subcategories: ["Shirts", "T-Shirts", "Jeans", "Shoes"] },
    { name: "Kids", subcategories: ["Boys", "Girls", "Baby"] },
    { name: "Home", subcategories: ["Bedding", "Decor", "Kitchen"] },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-900">WestStyle</Link>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          {categories.map((category, index) => (
            <li
              key={index}
              className="relative group"
              onMouseEnter={() => setDropdownOpen(index)}
              onMouseLeave={() => setDropdownOpen(null)}
            >
              <Link to={`/shop/${category.name.toLowerCase()}`} className="hover:text-blue-500">
                {category.name}
              </Link>

              {/* Dropdown Menu */}
              {dropdownOpen === index && (
                <div className="absolute left-0 mt-2 w-40 bg-white shadow-md rounded-lg">
                  {category.subcategories.map((sub, i) => (
                    <Link
                      key={i}
                      to={`/shop/${category.name.toLowerCase()}/${sub.toLowerCase()}`}
                      className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-blue-500"
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Icons Section */}
        <div className="flex items-center space-x-4 text-gray-700">
          <FiSearch className="text-xl cursor-pointer hover:text-blue-500" />
          <Link to="/profile">
            <FiUser className="text-xl cursor-pointer hover:text-blue-500" />
          </Link>
          <Link to="/cart">
            <FiShoppingBag className="text-xl cursor-pointer hover:text-blue-500" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
