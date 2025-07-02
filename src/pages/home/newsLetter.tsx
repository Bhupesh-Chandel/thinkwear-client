import {ShoppingBag } from "lucide-react"
import { Link } from "react-router"

function NewsLetter() {
  return (
     <>
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <ShoppingBag className="w-16 h-16 mx-auto mb-6 animate-bounce" />
          <h2 className="text-4xl font-bold mb-4">Stay in the Loop</h2>
          <p className="text-xl mb-8 opacity-90">
            Be the first to know about new collections, exclusive deals, and fashion trends.
          </p>
          {/* <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className=" bg-white flex-1 px-6 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-white/30"
            />
            <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200">
              Subscribe
            </button>
          </div> */}
                  <Link to={"/products"}>
               <button className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105">
              Shop Now
              </button>
           </Link>
        </div>
      </section>

     </>
  )
}

export default NewsLetter