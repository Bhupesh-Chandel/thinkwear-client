import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import type { Product } from './Product';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // const discountPercentage = product.originalPrice 
  //   ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
  //   : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group border border-gray-100 overflow-hidden">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-3 left-3 px-2 py-1 text-xs font-semibold rounded-full text-white ${
            product.badge === 'Best Seller' ? 'bg-blue-500' :
            product.badge === 'New' ? 'bg-green-500' :
            product.badge === 'Sale' ? 'bg-red-500' :
            'bg-purple-500'
          }`}>
            {product.badge}
          </span>
        )}

        {/* Discount Badge */}
        {/* {discountPercentage > 0 && (
          <span className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-full">
            -{discountPercentage}%
          </span>
        )} */}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                className={`${
                  i < Math.floor(product.rating) 
                    ? 'fill-yellow-400 text-yellow-400' 
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-1">
            {product.rating} ({product.reviews.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-bold text-gray-900">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:bg-purple-600 text-white py-2.5 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 group-hover:purple-600">
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};