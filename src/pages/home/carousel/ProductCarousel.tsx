import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from './ProductCard';
import type { Product } from './Product';
import { useResponsiveCarousel } from './useResponsiveCarousel';
import { Link } from 'react-router';

interface ProductCarouselProps {
  products: Product[];
  title?: string;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({ 
  products, 
  title = "Featured Products" 
}) => {
  const {
    currentIndex,
    config,
    goNext,
    goPrevious,
    canGoNext,
    canGoPrevious,
    showNavigation
  } = useResponsiveCarousel(products.length);

 

  // Calculate the percentage to move each item
  const itemWidth = 100 / config.itemsPerView;
  const translateX = -(currentIndex * itemWidth);

  return (
      <>
       <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 relative ">
         <div className='flex flex-col gap-2 mx-auto'>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white ">{title}</h2>
           <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mx-auto"></div>
         </div>
        {/* Navigation Buttons */}
        {showNavigation && (
          <div className="flex gap-2">
            <button
              onClick={goPrevious}
              disabled={!canGoPrevious}
              className={`p-2 rounded-full border-2 transition-all duration-200 ${
                canGoPrevious
                  ? 'border-fuchsia-700 text-fuchsia-600-600 hover:bg-purple-600 hover:text-white'
                  : 'border-gray-300 text-gray-300 cursor-not-allowed'
              }`}
              aria-label="Previous products"
            >
              <ChevronLeft size={20} />
            </button>
            
            <button
              onClick={goNext}
              disabled={!canGoNext}
              className={`p-2 rounded-full border-2 transition-all duration-200 ${
                canGoNext
                  ? 'border-fuchsia-700 text-fuchsia-600-600 hover:bg-purple-600 hover:text-white'
                  : 'border-gray-300 text-gray-300 cursor-not-allowed'
              }`}
              aria-label="Next products"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ 
            transform: `translateX(${translateX}%)`,
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="px-2 flex-shrink-0"
              style={{ 
                width: `${itemWidth}%`
              }}
            >
              <Link to={`products/${product._id}`}>
              <ProductCard product={product} />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      {showNavigation && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ 
            length: Math.ceil((products.length - config.itemsPerView) / config.slideBy) + 1 
          }, (_, i) => {
            const dotIndex = i * config.slideBy;
            const isActive = currentIndex === dotIndex || 
              (i === Math.ceil((products.length - config.itemsPerView) / config.slideBy) && 
               currentIndex >= products.length - config.itemsPerView);
            
            return (
              <button
                key={i}
                onClick={() => {
                  const targetIndex = Math.min(dotIndex, products.length - config.itemsPerView);
                  if (targetIndex >= 0) {
                    // This would require exposing setCurrentIndex from the hook
                    // For now, we'll keep dots as indicators only
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  isActive ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            );
          })}
        </div>
      )}
    </div>
      </>
  );
};