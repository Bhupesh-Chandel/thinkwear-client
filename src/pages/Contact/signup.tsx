import { useState } from 'react';
import { Mail, User, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useAuth } from '../../Context/AuthProvider';
import { api } from "../../http/client";
// import { useAuthStore } from '@/store';

function SignupForm() {
  const { setAuthUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  //  const { setUser} = useAuthStore();

  const [firstName, setFirstName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function createAccountInBackend(userInfo: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    try {
      console.log(`giving userInfo: ${JSON.stringify(userInfo)}`);
      setIsLoading(true);
      const response = await api.post("/auth/register", userInfo);
      console.log("Account Created:", response.data);

      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      // setAuthUser(response.data);
      localStorage.setItem("ThinkWear", JSON.stringify(response.data));
      setAuthUser(response.data);
      setIsLoading(false);
      setSuccessMessage("Login Successful");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/");
      }, 2000);

    } catch (err: any) {
      if (err.response) {
        console.log(`Error at /auth/register: ${err.response.data.message}`);
        alert(err.response.data.message || "Registration failed");
        setIsLoading(false);
      } else {
        console.log(`Unexpected error: ${err}`);
        alert("Something went wrong");
        setIsLoading(false);
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: any = {};
    if (firstName === "") newErrors.firstName = true;
    if (lastName === "") newErrors.lastName = true;
    if (email === "") newErrors.email = true;
    if (password === "") newErrors.password = true;

    // Email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (email && !emailRegex.test(email)) newErrors.emailInvalid = true;

    // Password validation
    if (password && password.length < 6) newErrors.passwordShort = true;

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    setError({});
    const userInfo = { firstName, lastName, email, password };
    createAccountInBackend(userInfo);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/30">
      {successMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-100 text-green-800 border border-green-300 dark:bg-green-900 dark:text-green-200 dark:border-green-700 px-4 py-2 rounded-md text-sm shadow-md z-50 transition-all duration-300">
          ✅ {successMessage}
        </div>
      )}
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Header */}


          {/* Form Card */}
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-xl border border-pink-200/50 dark:border-purple-700/50 p-8 space-y-6">
            {/* First Name Field */}

            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              {/* <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Email Messenger
            </h1> */}
              <p className="text-gray-600 dark:text-gray-400 text-base">
                Create a new <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-semibold">Account</span>
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                First Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-200" />
                </div>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-pink-200 dark:border-purple-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 text-base"
                />
              </div>
              {error.firstName && (
                <p className="text-pink-500 text-sm flex items-center gap-1 mt-1">
                  <span className="w-1 h-1 bg-pink-500 rounded-full"></span>
                  This field is required
                </p>
              )}
            </div>

            {/* Last Name Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Last Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-200" />
                </div>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-pink-200 dark:border-purple-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 text-base"
                />
              </div>
              {error.lastName && (
                <p className="text-pink-500 text-sm flex items-center gap-1 mt-1">
                  <span className="w-1 h-1 bg-pink-500 rounded-full"></span>
                  This field is required
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-200" />
                </div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-pink-200 dark:border-purple-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 text-base"
                />
              </div>
              {error.email && (
                <p className="text-pink-500 text-sm flex items-center gap-1 mt-1">
                  <span className="w-1 h-1 bg-pink-500 rounded-full"></span>
                  This field is required
                </p>
              )}
              {error.emailInvalid && (
                <p className="text-pink-500 text-sm flex items-center gap-1 mt-1">
                  <span className="w-1 h-1 bg-pink-500 rounded-full"></span>
                  Please enter a valid email address
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-200" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 border border-pink-200 dark:border-purple-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-purple-500 transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {error.password && (
                <p className="text-pink-500 text-sm flex items-center gap-1 mt-1">
                  <span className="w-1 h-1 bg-pink-500 rounded-full"></span>
                  This field is required
                </p>
              )}
              {error.passwordShort && (
                <p className="text-pink-500 text-sm flex items-center gap-1 mt-1">
                  <span className="w-1 h-1 bg-pink-500 rounded-full"></span>
                  Password must be at least 6 characters
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full relative group overflow-hidden rounded-xl py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              {/* <span className="relative z-10 flex items-center justify-center gap-2">
                Create Account
                <User className="w-4 h-4" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div> */}
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating Account...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Create Account
                  <Mail className="w-4 h-4" />
                </span>
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-pink-200 dark:border-purple-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  Already have an account?
                </span>
              </div>
            </div>

            {/* Login Link */}
            <Link
              to="/contact"
              className="w-full flex items-center justify-center gap-2 py-3 px-6 border border-pink-200 dark:border-purple-600 rounded-xl text-gray-700 dark:text-gray-300 font-medium hover:bg-pink-50 dark:hover:bg-purple-700/30 hover:border-pink-300 dark:hover:border-purple-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            >
              Sign in to your account
            </Link>
          </div>

          {/* Footer */}
          {/* <p className="text-center text-xs text-gray-500 dark:text-gray-400">
            By creating an account, you agree to our{" "}
            <Link to="/terms" className="text-purple-600 dark:text-pink-400 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-purple-600 dark:text-pink-400 hover:underline">
              Privacy Policy
            </Link>
          </p> */}
        </form>
      </div>
    </div>
  );
}

export default SignupForm;