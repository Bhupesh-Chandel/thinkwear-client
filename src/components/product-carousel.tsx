"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Link } from "react-router"


const carouselItems = [
  {
    id: 1,
    title: "Summer Collection 2024",
    subtitle: "Discover the latest trends",
    description: "Explore our new summer collection with up to 50% off on selected items",
    image: "/placeholder.svg?height=600&width=1200",
    cta: "Shop Now",
    href: "/collections/summer-2024",
  },
  {
    id: 2,
    title: "Premium Electronics",
    subtitle: "Tech that inspires",
    description: "Get the latest gadgets and electronics with free shipping worldwide",
    image: "/placeholder.svg?height=600&width=1200",
    cta: "Explore Tech",
    href: "/collections/electronics",
  },
  {
    id: 3,
    title: "Sustainable Fashion",
    subtitle: "Style with purpose",
    description: "Shop our eco-friendly collection made from sustainable materials",
    image: "/placeholder.svg?height=600&width=1200",
    cta: "Go Green",
    href: "/collections/sustainable",
  },
]

export function ProductCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length)
  }

  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden rounded-2xl">
      {carouselItems.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide ? "translate-x-0" : index < currentSlide ? "-translate-x-full" : "translate-x-full"
          }`}
        >
          <div className="relative h-full">
            <img src={item.image || "/placeholder.svg"} alt={item.title}  className="object-cover" />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white space-y-4 max-w-2xl px-4">
                <p className="text-lg md:text-xl opacity-90">{item.subtitle}</p>
                <h2 className="text-3xl md:text-5xl font-bold">{item.title}</h2>
                <p className="text-lg md:text-xl opacity-90">{item.description}</p>
                <Button
                  size="lg"
                  className="mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
                  asChild
                >
                  <Link to={item.href}>{item.cta}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur border-white/30 text-white hover:bg-gradient-to-r hover:from-purple-600/30 hover:to-pink-600/30"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur border-white/30 text-white hover:bg-gradient-to-r hover:from-purple-600/30 hover:to-pink-600/30"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? "bg-white" : "bg-white/50"} dark:bg-black`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}
