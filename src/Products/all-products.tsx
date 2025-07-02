"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { debounce } from "lodash";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Search,
  Filter,
  Grid3X3,
  Grid2X2,
  SlidersHorizontal,
} from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { useCart } from "@/Context/cartContext";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getCategories, getProducts } from "@/http/api";

const priceRanges = [
  { label: "Under ₹150", min: 0, max: 150 },
  { label: "₹150 - ₹300", min: 150, max: 300 },
  { label: "₹300 - ₹500", min: 300, max: 500 },
  { label: "Over ₹500", min: 500, max: Number.POSITIVE_INFINITY },
];

export default function ProductsPage() {
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [selectedCategoryNames, setSelectedCategoryNames] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("All Prices");
  const [sortBy, setSortBy] = useState("featured");
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  const [, setCurrentPage] = useState(1);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const { addToCart } = useCart();

  const [queryParams, setQueryParams] = useState<{
    perPage: number;
    currentPage: number;
    categoryId?: string;
    q: string;
  }>({
    perPage: 30,
    currentPage: 1,
    categoryId: undefined,
    q: "",
  });

  const [searchTerm, setSearchTerm] = useState(queryParams.q);

  const debouncedQUpdate = useMemo(() => {
    return debounce((value: string | undefined) => {
      setQueryParams((prev) => ({ ...prev, q: value as string, currentPage: 1 }));
    }, 500);
  }, []);

  useEffect(() => {
    return () => debouncedQUpdate.cancel();
  }, [debouncedQUpdate]);

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await getCategories("");
      return res.data.data;
    },
  });

  const handleCategoryChange = (
    categoryId: string,
    categoryName: string,
    checked: boolean
  ) => {
    if (checked) {
      setSelectedCategoryIds([categoryId]);
      setSelectedCategoryNames([categoryName]);
      setQueryParams((prev) => ({
        ...prev,
        categoryId: categoryId,
        currentPage: 1,
      }));
    } else {
      setSelectedCategoryIds([]);
      setSelectedCategoryNames([]);
      setQueryParams((prev) => ({
        ...prev,
        categoryId: undefined,
        currentPage: 1,
      }));
    }

    setCurrentPage(1);
  };

  // const handleAddToCart = (product: any) => {
  //   addToCart({
  //     _id: product.id,
  //     name: product.name,
  //     price,
  //     image: product.image,
  //   });
  // };

  const handleAddToCart = (product: any) => {
    const price = getFirstPrice(product);
    addToCart({
      _id: product.id,
      name: product.name,
      price,
      image: product.image,
    });
  };


  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategoryIds([]);
    setSelectedCategoryNames([]);
    setSelectedPriceRange("All Prices");
    setCurrentPage(1);
    setQueryParams((prev) => ({ ...prev, categoryId: "", q: "", currentPage: 1 }));
  };

  const FiltersContent = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="search">Search</Label>
        <div className="relative mt-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            id="search"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => {
              const value = e.target.value;
              setSearchTerm(value);
              debouncedQUpdate(value);
            }}
            className="pl-10"
          />
        </div>
      </div>

      <div>
        <Label>Categories</Label>
        <div className="space-y-2 mt-2">
          {categoriesData && categoriesData.length > 0 ? (
            categoriesData.map((category: any) => (
              <div key={category._id} className="flex items-center space-x-2">
                <Checkbox
                  id={category._id}
                  checked={selectedCategoryIds.includes(category._id)}
                  onCheckedChange={(checked) =>
                    handleCategoryChange(category._id, category.name, checked as boolean)
                  }
                />
                <Label htmlFor={category._id} className="text-sm font-normal">
                  {category.name}
                </Label>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">Loading categories...</p>
          )}
        </div>
      </div>

      {/* <div>
        <Label>Price Range</Label>
        <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
          <SelectTrigger className="mt-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Prices">All Prices</SelectItem>
            {priceRanges.map((range) => (
              <SelectItem key={range.label} value={range.label}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div> */}

      <Button
        variant="outline"
        className="w-full bg-transparent"
        onClick={clearFilters}
      >
        Clear Filters
      </Button>
    </div>
  );

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", queryParams],
    queryFn: () => {
      const filteredParams = Object.fromEntries(
        Object.entries(queryParams).filter(
          ([_, value]) => value !== undefined && value !== null && value !== ""
        )
      );
      const queryString = new URLSearchParams(
        filteredParams as Record<string, string>
      ).toString();
      return getProducts(queryString).then((res) => res.data);
    },
    placeholderData: keepPreviousData,
  });

  const getFirstPrice = (product: any): number => {
    const options = product.availableOptions || {};
    const validKeys = Object.keys(options).filter(key => /^[a-zA-Z]+$/.test(key));
    const firstKey = validKeys[0];
    const price = firstKey ? options[firstKey] : 0;
    return typeof price === "number" && !isNaN(price) ? price : 0;
  };

  // const getFirstPrice = (product: any): number => {
  //   const options = product.availableOptions || {};

  //   // Extract values that are numbers
  //   const values = Object.values(options).filter(
  //     (value) => typeof value === "number" && !isNaN(value)
  //   );

  //   // Return the first numeric price
  //   return values.length > 0 ? values[0] : 0;
  // };




  const sortedProducts = useMemo(() => {
    if (!products?.data) return [];

    let filtered = [...products.data];

    // Apply Price Range Filter
    if (selectedPriceRange !== "All Prices") {
      const selectedRange = priceRanges.find((range) => range.label === selectedPriceRange);
      if (selectedRange) {
        filtered = filtered.filter((product) => {
          const price = getFirstPrice(product);
          return price >= selectedRange.min && price < selectedRange.max;
        });
      }
    }

    // Apply Sorting
    switch (sortBy) {
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "price-low":
        filtered.sort((a, b) => getFirstPrice(a) - getFirstPrice(b));
        break;
      case "price-high":
        filtered.sort((a, b) => getFirstPrice(b) - getFirstPrice(a));
        break;
      case "featured":
      default:
        break;
    }

    return filtered;
  }, [products?.data, sortBy, selectedPriceRange]);



  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">All Products</h1>
        <p className="text-muted-foreground">
          Discover our complete collection of premium products
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="hidden lg:block lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FiltersContent />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-muted-foreground">
                Showing all products
              </span>
              {(selectedCategoryNames.length > 0 ||
                selectedPriceRange !== "All Prices" ||
                searchTerm) && (
                  <div className="flex gap-2 flex-wrap">
                    {selectedCategoryNames.map((category) => (
                      <Badge key={category} variant="secondary">
                        {category}
                      </Badge>
                    ))}
                    {selectedPriceRange !== "All Prices" && (
                      <Badge variant="secondary">{selectedPriceRange}</Badge>
                    )}
                    {searchTerm && (
                      <Badge variant="secondary">"{searchTerm}"</Badge>
                    )}
                  </div>
                )}
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <Dialog open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="lg:hidden bg-transparent border-purple-200 text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50"
                  >
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Filters</DialogTitle>
                  </DialogHeader>
                  <FiltersContent />
                </DialogContent>
              </Dialog>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">All</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  {/* <SelectItem value="price-low">Price: Low to High</SelectItem> */}
                  {/* <SelectItem value="price-high">Price: High to Low</SelectItem> */}
                </SelectContent>
              </Select>

              <div className="flex border rounded-md">
                <Button
                  variant={gridCols === 3 ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setGridCols(3)}
                  className={`rounded-r-none ${gridCols === 3 ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white" : ""
                    }`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={gridCols === 4 ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setGridCols(4)}
                  className={`rounded-l-none ${gridCols === 4 ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white" : ""
                    }`}
                >
                  <Grid2X2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* {sortedProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No products found matching your criteria.
              </p>
            </div>
          ) : (
            <div
              className={`grid gap-6 ${gridCols === 3
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                }`}
            >
              {!isLoading &&
                sortedProducts.map((product: any, index: number) => (
                  <ProductCard
                    key={index}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
            </div>
          )} */}
          {isLoading ? (
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
          ) : sortedProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No products found matching your criteria.
              </p>
            </div>
          ) : (
            <div
              className={`grid gap-6 ${gridCols === 3
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                }`}
            >
              {sortedProducts.map((product: any, index: number) => (
                <ProductCard
                  key={index}
                  product={{ ...product, price: getFirstPrice(product) }}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}

          {/* yha tak */}
        </div>
      </div>
    </div>
  );
}
