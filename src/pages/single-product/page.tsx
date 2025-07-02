import { useMemo, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Heart, Share2, ShoppingCart } from "lucide-react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getSingleProduct } from "@/http/api";
// import { Spinner } from "@/components/ui/spinner";
import { useCart } from "../../Context/cartContext";

const reviews = [
  {
    id: 1,
    name: "John Doe",
    rating: 5,
    date: "2024-01-15",
    comment: "Excellent",
    verified: true,
  },
  {
    id: 2,
    name: "Jane Smith",
    rating: 4,
    date: "2024-01-10",
    comment: "Great",
    verified: true,
  },
  {
    id: 3,
    name: "Mike Johnson",
    rating: 5,
    date: "2024-01-05",
    comment: "Value For Money",
    verified: true,
  },
];

export default function ProductPage() {
  const { addToCart } = useCart();
  const params = useParams();
  const productId = params.id;

  const [selectedColor, setSelectedColor] = useState("");
  const [quantity] = useState(1);
  const [fixedPrice, setFixedPrice] = useState(0);

  const { data: productData, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getSingleProduct(productId as string).then((res) => res.data),
  });

  const defaultConfiguration = useMemo(() => {
    if (!productData || !productData.priceConfiguration) return [];

    const typedConfig = productData.priceConfiguration as Record<
      string,
      { availableOptions: Record<string, number> }
    >;

    return Object.entries(typedConfig).map(([key, value]) => ({
      name: key,
      variants: value.availableOptions,
    }));
  }, [productData]);

  useEffect(() => {
    if (!productData || defaultConfiguration.length === 0) return;

    const firstVariantObject = defaultConfiguration[0].variants;
    const firstEntry = Object.entries(firstVariantObject)[0];
    if (firstEntry) {
      const [firstKey, firstValue] = firstEntry;
      setSelectedColor(firstKey);
      setFixedPrice(firstValue as number);
    }
  }, [productData, defaultConfiguration]);

  const handleAddToCart = () => {
    if (!productData || !selectedColor || fixedPrice === 0) return;

    addToCart({
      ...productData,
      selectedVariant: selectedColor,
      price: fixedPrice,
      quantity,
    });
  };

  if (isLoading) {
    // return (
    //   <div className="flex justify-center items-center min-h-[50vh]">
    //     <Spinner className="h-10 w-10 text-black dark:text-white" />
    //   </div>
    // );
    return(
      <div className="flex justify-center items-center min-h-[300px]">
              <svg
                className="animate-spin h-8 w-8 text-purple-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
            </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-lg border">
            <img
              src={productData.image || "/placeholder.svg"}
              alt={productData.name}
              className="object-cover w-full h-full"
            />
            <Badge className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              Sale
            </Badge>
            <Badge className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              New
            </Badge>
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-4">{productData.name}</h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < 5 ? "fill-primary text-primary" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">5 (3 reviews)</span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold">₹{fixedPrice}</span>
            </div>

            <p className="text-muted-foreground mb-6">{productData.description}</p>
          </div>

          {/* Variants */}
          {defaultConfiguration.map((priceConfiguration) => (
            <div className="space-y-4" key={priceConfiguration.name}>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  {priceConfiguration.name}
                </label>
                <div className="flex gap-2">
                  {Object.keys(priceConfiguration.variants).map((color: any) => (
                    <Button
                      key={color}
                      variant={selectedColor === color ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedColor(color)}
                      className={
                        selectedColor === color
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0"
                          : ""
                      }
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              {/* <div>
                <label className="text-sm font-medium mb-2 block">Quantity</label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div> */}
            </div>
          ))}

          {/* Actions */}
          <div className="space-y-16 mt-16">
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="lg" className="flex-1 bg-transparent">
                <Heart className="h-5 w-5 mr-2" />
                Add to Wishlist
              </Button>
              <Button variant="outline" size="lg" className="flex-1 bg-transparent">
                <Share2 className="h-5 w-5 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="reviews">Reviews (3)</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground leading-relaxed">{productData.description}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{review.name}</span>
                          {review.verified && (
                            <Badge variant="secondary" className="text-xs">
                              Verified Purchase
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < review.rating
                                  ? "fill-primary text-primary"
                                  : "text-gray-300"
                                  }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
