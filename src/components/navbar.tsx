import { Search, User, ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(3); // Mock cart count
  const location = useLocation();

  const isActive = (path:string) => location.pathname === path;

  return (
    <nav className="backdrop-blur-md border-b  sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div>
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200"
            >
              ThinkWear
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 mid:ml-8">
            <Link
              to="/"
              className={`hover:text-purple-600 transition-colors duration-200  ${
                isActive("/") ? "text-purple-600 font-medium" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`hover:text-purple-600 transition-colors duration-200 ${
                isActive("/products")
                  ? "text-purple-600 font-medium"
                  : ""
              }`}
            >
              Products
            </Link>
            <Link
              to="/about"
              className={`hover:text-purple-600 transition-colors duration-200 ${
                isActive("/about")
                  ? "text-purple-600 font-medium"
                  : ""
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`hover:text-purple-600 transition-colors duration-200 ${
                isActive("/contact")
                  ? "text-purple-600 font-medium"
                  : ""
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2  w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
              <User className="w-5 h-5 " />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 relative">
              <ShoppingCart className="w-5 h-5 " />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

              <ModeToggle/>


            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2  w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <Link
                to="/"
                className=" hover:text-purple-600 transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                to="/products"
                className=" hover:text-purple-600 transition-colors duration-200"
              >
                Products
              </Link>
              <Link
                to="/about"
                className=" hover:text-purple-600 transition-colors duration-200"
              >
                About
              </Link>
              <Link
                to="/contact"
                className=" hover:text-purple-600 transition-colors duration-200"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;