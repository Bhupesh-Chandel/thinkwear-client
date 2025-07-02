// import React, { useState } from 'react';
// import { Star, ShoppingCart } from 'lucide-react';
// import type { Product } from './Product';

// import { Eye } from 'lucide-react';

// interface ProductCardProps {
//   product: Product;
// }

// export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
//   // const discountPercentage = product.originalPrice 
//   //   ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
//   //   : 0;

//     const [isHovered, setIsHovered] = useState(false);

//   return (
//     <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group border border-gray-100 overflow-hidden">
//       {/* Image Container */}
//       <div className="relative overflow-hidden">
//         <img 
//           src={product.image} 
//           alt={product.name}
//           className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
//         />

//         {/* Badge */}
//         {product.badge && (
//           <span className={`absolute top-3 left-3 px-2 py-1 text-xs font-semibold rounded-full text-white ${
//             product.badge === 'Best Seller' ? 'bg-blue-500' :
//             product.badge === 'New' ? 'bg-green-500' :
//             product.badge === 'Sale' ? 'bg-red-500' :
//             'bg-purple-500'
//           }`}>
//             {product.badge}
//           </span>
//         )}

//         {/* Discount Badge */}
//         {/* {discountPercentage > 0 && (
//           <span className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-full">
//             -{discountPercentage}%
//           </span>
//         )} */}
//       </div>

//       {/* Content */}
//       <div className="p-4">
//         {/* Product Name */}
//         <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
//           {product.name}
//         </h3>

//         {/* Rating */}
//         <div className="flex items-center gap-1 mb-3">
//           <div className="flex items-center gap-0.5">
//             {[...Array(5)].map((_, i) => (
//               <Star 
//                 key={i} 
//                 size={14} 
//                 className={`${
//                   i < Math.floor(4) 
//                     ? 'fill-yellow-400 text-yellow-400' 
//                     : 'text-gray-300'
//                 }`}
//               />
//             ))}
//           </div>
//           {/* <span className="text-sm text-gray-600 ml-1">
//             {product.rating} ({product.reviews.toLocaleString()})
//           </span> */}
//         </div>

//         {/* Price */}
//         <div className="flex items-center gap-2 mb-4">
//           <span className="text-xl font-bold text-gray-900">
//             ₹{product.price}
//           </span>
//           {product.originalPrice && (
//             <span className="text-sm text-gray-500 line-through">
//               ₹{product.originalPrice}
//             </span>
//           )}
//         </div>


//         <div className={`absolute inset-x-3 bottom-3 flex gap-2 transition-all duration-300 ${
//           isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 z-20'
//         }`}>

//           <button
//             // onClick={() => onQuickView?.(id)}
//             className="flex-1 bg-white/90 backdrop-blur-sm text-gray-800 py-2 px-3 rounded-lg hover:bg-white transition-all duration-200 flex items-center justify-center gap-2 text-sm font-medium"
//           >
//             <Eye className="w-4 h-4" />
//             Quick View
//           </button>
//           <button
//             // onClick={() => onAddToCart?.(id)}
//             className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center gap-2 text-sm font-medium"
//           >
//             <ShoppingCart className="w-4 h-4" />
//             Add to Cart
//           </button>
//         </div>
//       </div>



//         {/* Add to Cart Button
//         <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:bg-purple-600 text-white py-2.5 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 group-hover:purple-600">
//           <ShoppingCart size={18} />
//           Add to Cart
//         </button> */}
//       </div>
//     // </div>
//   );
// };

// import React, { useState } from 'react';
// import { Star, ShoppingCart, Eye } from 'lucide-react';
// import type { Product } from './Product';

// interface ProductCardProps {
//   product: Product;
// }

// export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <div
//       className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group border border-gray-100 overflow-hidden relative"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Image Container */}
//       <div className="relative overflow-hidden">
//         <img
//           src={product.image}
//           alt={product.name}
//           className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
//         />

//         {/* Badge */}
//         {product.badge && (
//           <span
//             className={`absolute top-3 left-3 px-2 py-1 text-xs font-semibold rounded-full text-white ${
//               product.badge === 'Best Seller'
//                 ? 'bg-blue-500'
//                 : product.badge === 'New'
//                 ? 'bg-green-500'
//                 : product.badge === 'Sale'
//                 ? 'bg-red-500'
//                 : 'bg-purple-500'
//             }`}
//           >
//             {product.badge}
//           </span>
//         )}
//       </div>

//       {/* Content */}
//       <div className="p-4">
//         <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
//           {product.name}
//         </h3>

//         <div className="flex items-center gap-1 mb-3">
//           <div className="flex items-center gap-0.5">
//             {[...Array(5)].map((_, i) => (
//               <Star
//                 key={i}
//                 size={14}
//                 className={`${
//                   i < Math.floor(4)
//                     ? 'fill-yellow-400 text-yellow-400'
//                     : 'text-gray-300'
//                 }`}
//               />
//             ))}
//           </div>
//         </div>

//         <div className="flex items-center gap-2 mb-4">
//           <span className="text-xl font-bold text-gray-900">
//             ₹{product.price}
//           </span>
//           {product.originalPrice && (
//             <span className="text-sm text-gray-500 line-through">
//               ₹{product.originalPrice}
//             </span>
//           )}
//         </div>
//       </div>

//       {/* Buttons on Hover */}
//       <div
//         className={`absolute inset-x-3 bottom-4 flex gap-2 transition-all duration-300 ${
//           isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
//         }`}
//       >
//         <button className="flex-1 bg-white/90 backdrop-blur-sm text-gray-800 py-2 px-3 rounded-lg hover:bg-white transition-all duration-200 flex items-center justify-center gap-2 text-sm font-medium">
//           <Eye className="w-4 h-4" />
//           Quick View
//         </button>
//         <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center gap-2 text-sm font-medium">
//           <ShoppingCart className="w-4 h-4" />
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// };

import React, { useState } from 'react';
import { ShoppingCart, Eye } from 'lucide-react';
import type { Product } from './Product';
import { useCart } from "../../../Context/cartContext"

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      ...product,
      quantity: 1,
    });
  };

  // const discountPercentage = product.originalPrice
  //   ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
  //   : 0;

  const [, firstPrice] = Object.entries(
    product.priceConfiguration?.size?.availableOptions || {}
  )[0] || [];

  return (
    <div
      className="group  rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image with aspect ratio */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Discount Badge
        {discountPercentage > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            -{discountPercentage}%
          </div>
        )} */}

        {/* Hover Buttons */}
        <div
          className={`absolute inset-x-3 bottom-3 flex gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
        >
          <button className="flex-1 bg-white/90 backdrop-blur-sm text-gray-800 py-2 px-3 rounded-lg hover:bg-white transition-all duration-200 flex items-center justify-center gap-2 text-sm font-medium">
            <Eye className="w-4 h-4" />
            Quick View
          </button>
          <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center gap-2 text-sm font-medium"  onClick={handleAddToCart}>
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors duration-200 dark:text-white">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < Math.floor(4) ? 'text-yellow-400' : 'text-gray-300'}>
                ★
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-500">(123)</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 ">
          <span className="text-lg font-bold text-gray-900 dark:text-white">₹{firstPrice}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
};

