import React, { useEffect } from "react";
import { useState } from "react";
// import { ChevronLeft, ChevronRight, Star, ShoppingBag } from "lucide-react";

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval); // Clean up on unmount or re-render
  }, []);

  const heroSlides = [
    {
      title: "Summer Collection 2024",
      subtitle: "Discover the hottest trends",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop",
      cta: "Shop Now",
      number: 0,
    },
    {
      title: "New Arrivals",
      subtitle: "Fresh styles just landed",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=600&fit=crop",
      cta: "Explore",
      number: 1,
    },
    {
      title: "Best Sellers",
      subtitle: "What everyone's talking about",
      image:
        "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&h=600&fit=crop",
      cta: "View All",
      number: 2,
    },
  ];

  return (
    <>
      <section className="relative h-[600px] w-screen ">
        {/* !img mapping  */}
        <div className="absolute inset-0 h-full w-full">
          {heroSlides.map((slide, index) => {
            return (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>
            );
          })}
        </div>
        {/* ! hero content */}
        <div className="relative z-10 h-full flex items-center justify-center text-center text-white">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              {heroSlides[currentSlide].title}
            </h1>
            <p
              className="text-xl md:text-2xl mb-8 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              {heroSlides[currentSlide].subtitle}
            </p>
            <button
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              {heroSlides[currentSlide].cta}
            </button>
          </div>
        </div>

        {/* slide indicator  */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {heroSlides.map((slide, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(slide.number)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default Hero;