// import { sampleProducts } from "./Product"
import { ProductCarousel } from "./ProductCarousel"
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/http/api";
// import { sampleProducts } from "./Product";

function ProductShowcase() {

    const { data } = useQuery({
    queryKey: ["FeaturedProducts"],
    queryFn: () => {
      const query = new URLSearchParams({
        categoryId: "68628d9a25796db1cfbfdf2f",
        perPage: "4", // You can change this as needed
      }).toString();

      return getProducts(query).then((res) => res.data);
    },
  });

  const featuredProducts = data?.data || [];
  // console.log(`featuredproduct : ${featuredProducts}`)

  return (
    <div>
          <main className="py-8">
        {/* <a href={`/products/${FeaturedProducts._id}`}> */}
          <ProductCarousel products={featuredProducts} title="Featured Products"  />
        {/* </a> */}
      </main>
    </div>
  )
}

export default ProductShowcase;