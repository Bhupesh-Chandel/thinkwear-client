import { useState, useEffect } from 'react';

interface CarouselConfig {
  itemsPerView: number;
  slideBy: number;
}

export const useResponsiveCarousel = (totalItems: number) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [config, setConfig] = useState<CarouselConfig>({ itemsPerView: 2, slideBy: 1 });

  useEffect(() => {
    const updateConfig = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        // Desktop: show 4, slide by 3
        setConfig({ itemsPerView: 4, slideBy: 3 });
      } else if (width >= 768) {
        // Tablet: show 3, slide by 2
        setConfig({ itemsPerView: 3, slideBy: 2 });
      } else {
        // Mobile: show 2, slide by 1
        setConfig({ itemsPerView: 2, slideBy: 1 });
      }
    };

    updateConfig();
    window.addEventListener('resize', updateConfig);
    return () => window.removeEventListener('resize', updateConfig);
  }, []);

  // Reset currentIndex when config changes to prevent out-of-bounds
  useEffect(() => {
    const maxIndex = Math.max(0, totalItems - config.itemsPerView);
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [config, totalItems, currentIndex]);

  const maxIndex = Math.max(0, totalItems - config.itemsPerView);
  
  const goNext = () => {
    if (currentIndex >= maxIndex) return;
    
    const nextIndex = Math.min(currentIndex + config.slideBy, maxIndex);
    setCurrentIndex(nextIndex);
  };

  const goPrevious = () => {
    if (currentIndex <= 0) return;
    
    const prevIndex = Math.max(0, currentIndex - config.slideBy);
    setCurrentIndex(prevIndex);
  };

  const canGoNext = currentIndex < maxIndex;
  const canGoPrevious = currentIndex > 0;
  const showNavigation = totalItems > config.itemsPerView;

  return {
    currentIndex,
    config,
    goNext,
    goPrevious,
    canGoNext,
    canGoPrevious,
    showNavigation,
    maxIndex
  };
};