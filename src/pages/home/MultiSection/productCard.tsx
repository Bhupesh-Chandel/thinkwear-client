import { ShoppingCart, Eye } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  onQuickView?: (id: number) => void;
  onAddToCart?: (id: number) => void;
  className?: string;
}

const ProductCard = ({ 
  id, 
  name, 
  price, 
  originalPrice, 
  image, 
  rating, 
  reviews, 
  onQuickView, 
  onAddToCart,
  className = ""
}: ProductCardProps) => {
  // const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const discountPercentage = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <div 
      className={`group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container - Fixed Aspect Ratio */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            -{discountPercentage}%
          </div>
        )}

        {/* Like Button */}
        {/* <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200 shadow-sm"
        >
          <Heart 
            className={`w-4 h-4 transition-colors duration-200 ${
              isLiked ? 'text-red-500 fill-red-500' : 'text-gray-600'
            }`} 
          />
        </button> */}

        {/* Hover Actions */}
        <div className={`absolute inset-x-3 bottom-3 flex gap-2 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <button
            onClick={() => onQuickView?.(id)}
            className="flex-1 bg-white/90 backdrop-blur-sm text-gray-800 py-2 px-3 rounded-lg hover:bg-white transition-all duration-200 flex items-center justify-center gap-2 text-sm font-medium"
          >
            <Eye className="w-4 h-4" />
            Quick View
          </button>
          <button
            onClick={() => onAddToCart?.(id)}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center gap-2 text-sm font-medium"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors duration-200">
          {name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}>
                ★
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-500">({reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">${price}</span>
          {originalPrice && (
            <span className="text-sm text-gray-500 line-through">${originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;