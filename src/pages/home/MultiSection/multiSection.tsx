// import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./productCard";
// import axios from "axios";
import { getProducts } from "@/http/api";
import { Link } from "react-router";

function MultiSection() {

  // const latestProducts = [
  //   { id: 5, name: "Vintage Leather Jacket", price: 159, image: `https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop`, rating: 4.8, reviews: 203 },
  //   { id: 6, name: "Designer Handbag", price: 199, originalPrice: 250, image: `https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop`, rating: 4.6, reviews: 178 },
  //   { id: 7, name: "Casual Sneakers", price: 89, image: `https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop`, rating: 4.4, reviews: 267 },
  //   { id: 8, name: "Silk Scarf", price: 49, originalPrice: 65, image: `https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=400&fit=crop`, rating: 4.5, reviews: 134 },
  // ];

  // const topSellers = [
  //   { id: 9, name: "Classic White T-Shirt", price: 25, image: `https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop`, rating: 4.9, reviews: 512 },
  //   { id: 10, name: "Denim Jeans", price: 79, originalPrice: 99, image: `https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop`, rating: 4.7, reviews: 389 },
  //   { id: 11, name: "Wool Sweater", price: 95, image: `https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop`, rating: 4.6, reviews: 223 },
  //   { id: 12, name: "Sports Watch", price: 149, originalPrice: 180, image: `https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop`, rating: 4.8, reviews: 156 },
  // ];

  // useEffect(() => {
  //   axios.post("http://localhost:PORT/products/latestProducts", {
  //     categoryName: "Latest"
  //   }, {
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   })
  //     .then(response => {
  //       console.log("Products:", response.data);
  //     })
  //     .catch(error => {
  //       console.error("Error fetching products:", error);
  //     });
  // },[])


    const { data, isLoading, error } = useQuery({
    queryKey: ["latestProducts"],
    queryFn: () => {
      const query = new URLSearchParams({
        categoryId: "68621293384f751638fa70da",
        perPage: "8", // You can change this as needed
      }).toString();

      return getProducts(query).then((res) => res.data);
    },
  });

  const latestProducts = data?.data || [];

  const {
    data: topData,
    isLoading: topLoading,
    error: topError,
  } = useQuery({
    queryKey: ["topSellers"],
    queryFn: () => {
      const query = new URLSearchParams({
        categoryId: "686212d8384f751638fa70e0", // Top Sellers
        perPage: "8",
      }).toString();
      return getProducts(query).then((res) => res.data);
    },
  });

  const topSellers = topData?.data || [];

  return (
    <>

      {/* <section className="py-16 px-4 max-w-7xl mx-auto bg-white rounded-3xl mx-4 shadow-sm">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Latest Products
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              className="animate-fade-in"
            // style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </div>
      </section>



      Top Sellers
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Top Sellers
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topSellers.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              className="animate-fade-in"
            // style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </div>
      </section> */}



      {/* Latest Products Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto  rounded-3xl shadow-sm mt-0">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold  mb-4">
            Latest Products
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full"></div>
        </div>

        {isLoading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">Failed to load products.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestProducts.map((product: any) => (
               <Link to={`/products/${product._id}`}>
              <ProductCard key={product._id} product={product} />
              </Link>
            ))}
          </div>
        )}
      </section>



      {/* Top Sellers (keep hardcoded for now unless needed dynamic) */}
    <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 dark:text-white">Top Sellers</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full" />
        </div>

        {topLoading ? (
          <p className="text-center text-gray-500 ">Loading top sellers...</p>
        ) : topError ? (
          <p className="text-center text-red-500">Failed to load top sellers.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topSellers.map((product: any) => (
              <a href={`/products/${product._id}`}>
                <ProductCard key={product._id} product={product} />
              </a>
            ))}
          </div>
        )}
      </section>

    </>
  )
}

export default MultiSection