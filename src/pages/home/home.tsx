import Hero from "./hero"
import NewsLetter from './newsLetter';
import ProductShowcase from "./carousel/ProductShowCase";
import MultiSection from "./MultiSection/multiSection";

function Home() {
  return (
    <>
      <div className="overflow-x-hidden">
        <Hero />
        {/* sdbjsdb */}

        <ProductShowcase />

        <MultiSection />

        <NewsLetter />
      </div>
    </>
  )
}

export default Home