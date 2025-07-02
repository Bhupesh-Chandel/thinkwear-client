// "use client"

// // import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart} from "lucide-react"
// // import Link from "next/link"
import { useCart } from "../Context/cartContext";
import { Link } from "react-router";
// import { CartItem } from './cart-provider';

interface Product {
  _id: string; // MongoDB ObjectId as string
  id?: number; // Optional if using MongoDB _id
  name: string;
  description?: string;
  image: string;

  // Derived price (you can compute it from priceConfiguration)
  price: number;
  originalPrice?: number;

  rating: number;
  reviews: number;
  badge?: string;

  priceConfiguration?: {
    Size?: {
      priceType: string;
      availableOptions: Record<string, number>; // e.g. { S: 300, M: 340 }
    };
    size?: {
      priceType: string;
      availableOptions: Record<string, number>; // e.g. { S: 300, M: 340 }
    };
  };
  
  //  quantity: number;


  categoryId?: string;
  attributes?: Array<any>;
  isPublish?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
}


// export function ProductCard({ product, onAddToCart }: ProductCardProps) {
//   return (
//     <Card className="product-card group overflow-hidden border shadow-sm hover:shadow-lg transition-all duration-300 bg-card">
//       <div className="relative aspect-square overflow-hidden">
//         <a href={`/products/${product._id}`}>
//           <img
//             src={product.image || "/placeholder.svg"}
//             alt={product.name}
//             // fill
//             className="object-cover transition-transform duration-500 group-hover:scale-110"
//           />
//         </a>

//         {/* Badges */}
//         <div className="absolute top-2 left-2 flex flex-col gap-1">
//           {true && (
//             <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">New</Badge>
//           )}
//           {true && <Badge variant="destructive">Sale</Badge>}
//         </div>

//         {/* Quick Actions */}
//         <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//           <Button size="icon" variant="secondary" className="h-8 w-8 bg-background/80 backdrop-blur">
//             <Heart className="h-4 w-4" />
//           </Button>
//         </div>

//         {/* Quick Add to Cart */}
//         <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//           <Button
//             className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
//             size="sm"
//             onClick={() => onAddToCart?.(product)}
//           >
//             <ShoppingCart className="h-4 w-4 mr-2" />
//             Add to Cart
//           </Button>
//         </div>
//       </div>

//       <CardContent className="p-4">
//         <div className="space-y-2">
//           <p className="text-sm text-muted-foreground">4335</p>
//           <a href={`/products/${product._id}`}>
//             <h3 className="font-medium line-clamp-2 hover:text-primary transition-colors">{product.name}</h3>
//           </a>
//           <div className="flex items-center gap-2">
//             <span className="font-semibold">${0}</span>
//             200
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }

// type CartItem = Product & {
//   quantity: number;
// };

export function ProductCard({ product}: ProductCardProps) {
  const { addToCart } = useCart();
  const handleAdd = () => {
    addToCart({
      ...product,
      quantity: 1, // always start with 1
    });
  };
  return (
    <Card className="product-card group overflow-hidden border shadow-sm hover:shadow-lg transition-all duration-300 bg-card p-0 flex flex-col">
      {/* Fixed height image container */}
      <div className="relative w-full h-52 overflow-hidden rounded-t-md">
        <Link to={`/products/${product._id}`}>
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 block"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {true && (
            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
              New
            </Badge>
          )}
          {true && <Badge variant="destructive">Sale</Badge>}
        </div>

        {/* Wishlist button */}
        {/* <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 bg-background/80 backdrop-blur"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div> */}

        {/* Add to Cart button */}
        <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <Button
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
            size="sm"
            // onClick={() => addToCart(product)}
            onClick={handleAdd}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Info Section */}
      <CardContent className="p-4 flex-1 flex flex-col">
        <div className="flex flex-col h-full">
          <a href={`/products/${product._id}`}>
            <h3 className="font-medium line-clamp-2 hover:text-primary transition-colors">
              {product.name}
            </h3>
          </a>

          <div className="mt-auto pt-2">
            {(() => {
              const config = product.priceConfiguration;
              if (!config || typeof config !== "object") return null;

              const firstKey = Object.keys(config)[0];
              const entry = (config as Record<string, { availableOptions: Record<string, number> }>)[firstKey];
              const variants = entry?.availableOptions;
              const firstPrice = variants ? Object.values(variants)[0] : null;

              return firstPrice !== null ? (
                <span className="font-semibold text-lg text-gray-900 dark:text-white">₹{firstPrice}</span>
              ) : null;
            })()}
          </div>
        </div>
      </CardContent>

    </Card>
  );
}

