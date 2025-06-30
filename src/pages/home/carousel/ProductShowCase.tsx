import { sampleProducts } from "./Product"
import { ProductCarousel } from "./ProductCarousel"


function ProductShowcase() {
  return (
    <div>
          <main className="py-8">
        <ProductCarousel products={sampleProducts} title="Featured Products" />
      </main>
    </div>
  )
}

export default ProductShowcase;