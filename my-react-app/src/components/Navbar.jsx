import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Search, User, ShoppingBag, Menu, X, LogOut, Heart } from 'lucide-react';
import { logout } from '../redux/slices/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { totalItems } = useSelector((state) => state.cart);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);

  const categories = [
    { name: 'Women', subcategories: ['Tops', 'Dresses', 'Bottoms', 'Footwear'] },
    { name: 'Men', subcategories: ['Shirts', 'T-Shirts', 'Jeans', 'Shoes'] },
    { name: 'Kids', subcategories: ['Boys', 'Girls', 'Baby'] },
    { name: 'Home', subcategories: ['Bedding', 'Decor', 'Kitchen'] },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    setDropdownOpen(null);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gray-900">
            WestStyle
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {categories.map((category, index) => (
              <div
                key={index}
                className="relative group"
                onMouseEnter={() => setDropdownOpen(index)}
                onMouseLeave={() => setDropdownOpen(null)}
              >
                <Link
                  to={`/shop?category=${category.name.toLowerCase()}`}
                  className="text-gray-700 font-medium hover:text-blue-500 transition-colors"
                >
                  {category.name}
                </Link>

                {/* Dropdown Menu */}
                {dropdownOpen === index && (
                  <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 py-2">
                    {category.subcategories.map((sub, i) => (
                      <Link
                        key={i}
                        to={`/shop?category=${category.name.toLowerCase()}&subcategory=${sub.toLowerCase()}`}
                        className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-blue-500 transition-colors"
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent w-64"
              />
            </div>
          </form>

          {/* Icons Section */}
          <div className="flex items-center space-x-4">
            {/* User Menu */}
            <div className="relative">
              {isAuthenticated ? (
                <div
                  className="relative"
                  onMouseEnter={() => setDropdownOpen('user')}
                  onMouseLeave={() => setDropdownOpen(null)}
                >
                  <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-500 transition-colors">
                    <User className="w-5 h-5" />
                    <span className="hidden sm:block text-sm">{user?.name}</span>
                  </button>

                  {dropdownOpen === 'user' && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 py-2">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        My Orders
                      </Link>
                      <Link
                        to="/wishlist"
                        className="block px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        Wishlist
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-500 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:block text-sm">Login</span>
                </Link>
              )}
            </div>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative text-gray-700 hover:text-blue-500 transition-colors"
            >
              <Heart className="w-5 h-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative text-gray-700 hover:text-blue-500 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700 hover:text-blue-500 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mt-4 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
            </form>

            {/* Mobile Navigation Links */}
            <div className="space-y-2">
              {categories.map((category, index) => (
                <div key={index}>
                  <Link
                    to={`/shop?category=${category.name.toLowerCase()}`}
                    className="block py-2 text-gray-700 font-medium hover:text-blue-500 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;