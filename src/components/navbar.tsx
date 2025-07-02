import { Search, User, ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import { ModeToggle } from "./mode-toggle";
import "../custom-media.css";
import { useCartDrawer } from "../Context/CartDrawerContext";
import { useCart } from "../Context/cartContext";
import { useAuth } from "@/Context/AuthProvider";
// import { useAuthStore } from "@/store";
// import { useMutation } from "@tanstack/react-query";
// import { logout } from "@/http/api";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const { authUser, setAuthUser } = useAuth();
  const location = useLocation();
  const { setOpen } = useCartDrawer();
  const { cartItems } = useCart();

  const totalQuantity = cartItems.reduce((sum, item) => {
    if (!item || typeof item.quantity !== "number") return sum + 1;
    return sum + item.quantity;
  }, 0);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    setAuthUser(undefined);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("ThinkWear");
    setShowLogout(false);
  };

  // const { logout: logoutFromStore } = useAuthStore();
  //   const user = useAuthStore((state) => state.user);
  // const { mutate: logoutMutate } = useMutation({
  //   mutationKey: ["logout"],
  //   mutationFn: logout,
  //   onSuccess: async () => {
  //     logoutFromStore();
  //     return;
  //   },
  // });

  const navLinks = ["/", "/products", "/about"];
  if (!authUser) navLinks.push("/contact");

  return (
    <nav className="backdrop-blur-md border-b sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200"
          >
            ThinkWear
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 mid-ml-8">
            {navLinks.map((path) => (
              <Link
                key={path}
                to={path}
                className={`hover:text-purple-600 transition-colors duration-200 ${
                  isActive(path) ? "text-purple-600 font-medium" : ""
                }`}
              >
                {path === "/" ? "Home" : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            {authUser && (
              <div className="relative">
                <button
                  onClick={() => setShowLogout((prev) => !prev)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 dark:bg-white text-black hover:scale-110"
                >
                  <User className="w-5 h-5" />
                </button>

                {showLogout && (
                  <button
                    onClick={handleLogout}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-4 py-2 bg-red-500 text-white text-sm rounded-md shadow-md hover:bg-red-600 transition-all z-50"
                  >
                    Logout
                  </button>
                )}
              </div>
            )}

            <button
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 relative dark:bg-white text-black hover:scale-112"
              onClick={() => setOpen(true)}
            >
              <ShoppingCart className="w-5 h-5" />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 text-xs bg-red-600 text-white rounded-full px-1.5">
                  {totalQuantity}
                </span>
              )}
            </button>

            <ModeToggle />

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              {navLinks.map((path) => (
                <Link
                  key={path}
                  to={path}
                  className="hover:text-purple-600 transition-colors duration-200"
                >
                  {path === "/" ? "Home" : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
