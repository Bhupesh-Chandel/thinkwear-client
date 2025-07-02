import { Link } from "react-router";
import { Home, CheckCircle } from "lucide-react";

export default function Complete() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-fuchsia-50 to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-pink-100 dark:bg-gray-900/80 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors dark:text-gray-300 dark:hover:text-pink-400"
            >
              <Home size={20} />
              <span className="font-medium">Back to Home</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Thank You Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-400 to-green-500 rounded-full mb-6 shadow-lg">
            <CheckCircle size={40} className="text-white" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 via-fuchsia-500 to-blue-500 bg-clip-text text-transparent mb-4">
            Thank You for Your Order!
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto dark:text-gray-300">
            Your payment has been processed successfully. We're excited to get your order ready and delivered to you soon.
          </p>
        </div>
      </div>
    </div>
  );
}
