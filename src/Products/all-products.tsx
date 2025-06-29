/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
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
import { Pagination } from "@/components/pagination";
import { useCart } from "@/components/cart-provider";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { 
  
  // getCategories, 
  
  getProducts } from "@/http/api";

const allProducts = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 199.99,
    originalPrice: 249.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Electronics",
    isNew: true,
    isSale: true,
  },
  {
    id: "2",
    name: "Minimalist Watch Collection",
    price: 149.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Accessories",
    isNew: true,
  },
  {
    id: "3",
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Clothing",
  },
  {
    id: "4",
    name: "Smart Home Speaker",
    price: 89.99,
    originalPrice: 119.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Electronics",
    isSale: true,
  },
  {
    id: "5",
    name: "Leather Wallet",
    price: 59.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Accessories",
  },
  {
    id: "6",
    name: "Wireless Charging Pad",
    price: 39.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Electronics",
  },
  {
    id: "7",
    name: "Designer Sunglasses",
    price: 129.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Accessories",
  },
  {
    id: "8",
    name: "Comfortable Hoodie",
    price: 79.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Clothing",
  },
  {
    id: "9",
    name: "Bluetooth Earbuds",
    price: 99.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Electronics",
  },
  {
    id: "10",
    name: "Canvas Backpack",
    price: 69.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Accessories",
  },
  {
    id: "11",
    name: "Running Shoes",
    price: 119.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Clothing",
  },
  {
    id: "12",
    name: "Desk Lamp",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Home & Garden",
  },
];

const categories = ["Electronics", "Clothing", "Accessories", "Home & Garden"];
const priceRanges = [
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $200", min: 100, max: 200 },
  { label: "Over $200", min: 200, max: Number.POSITIVE_INFINITY },
];

const PRODUCTS_PER_PAGE = 12;

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] =
    useState<string>("All Prices");
  const [sortBy, setSortBy] = useState("featured");
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const { addItem } = useCart();


  // const { data: categoriesData } = useQuery({
  //   queryKey: ["categories"],
  //   queryFn: () => {
  //     return getCategories("");
  //   },
  // });


  const [queryParams, setQueryParams] = useState({
    perPage: 30,
    currentPage: 1,
    categoryId: "686011195c182fd4d672001f",
    q:""
  });

  const debouncedQUpdate = useMemo(() => {
    return debounce((value: string | undefined) => {
      setQueryParams((prev) => ({ ...prev, q: value as string, currentPage: 1 }));
    }, 500);
  }, []);

  const filteredProducts = allProducts
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

      let matchesPrice = true;
      if (selectedPriceRange !== "All Prices") {
        const range = priceRanges.find((r) => r.label === selectedPriceRange);
        if (range) {
          matchesPrice =
            product.price >= range.min && product.price <= range.max;
        }
      }

      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories((prev) => [...prev, category]);
    } else {
      setSelectedCategories((prev) => prev.filter((c) => c !== category));
    }
    setCurrentPage(1);
  };

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setSelectedPriceRange("All Prices");
    setCurrentPage(1);
  };

  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <Label htmlFor="search">Search</Label>
        <div className="relative mt-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            id="search"
            placeholder="Search products..."
            defaultValue={queryParams.q || ""}
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
            onChange={(e) => {
              debouncedQUpdate(e.target.value);
            }}
            className="pl-10"
          />
        </div>
      </div>

      {/* Categories */}
      <div>
        <Label>Categories</Label>
        <div className="space-y-2 mt-2">
          {categories?.map((category: any) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) =>
                  handleCategoryChange(category, checked as boolean)
                }
              />
              <Label htmlFor={category} className="text-sm font-normal">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <Label>Price Range</Label>
        <Select
          value={selectedPriceRange}
          onValueChange={setSelectedPriceRange}
        >
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
      </div>

      {/* Clear Filters */}
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
        Object.entries(queryParams).filter((item) => !!item[1])
      );

      const queryString = new URLSearchParams(
        filteredParams as unknown as Record<string, string>
      ).toString();
      return getProducts(queryString).then((res) => res.data);
    },
    placeholderData: keepPreviousData,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">All Products</h1>
        <p className="text-muted-foreground">
          Discover our complete collection of premium products
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Desktop Filters Sidebar */}
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

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-muted-foreground">
                Showing {paginatedProducts.length} of {filteredProducts.length}{" "}
                products
              </span>
              {(selectedCategories.length > 0 ||
                selectedPriceRange !== "All Prices" ||
                searchTerm) && (
                  <div className="flex gap-2 flex-wrap">
                    {selectedCategories.map((category) => (
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
              {/* Mobile Filters */}
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

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>

              {/* Grid Layout Toggle */}
              <div className="flex border rounded-md">
                <Button
                  variant={gridCols === 3 ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setGridCols(3)}
                  className={`rounded-r-none ${gridCols === 3
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                      : ""
                    }`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={gridCols === 4 ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setGridCols(4)}
                  className={`rounded-l-none ${gridCols === 4
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                      : ""
                    }`}
                >
                  <Grid2X2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Products */}
          {paginatedProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No products found matching your criteria.
              </p>
            </div>
          ) : (
            <>
              <div
                className={`grid gap-6 ${gridCols === 3
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  }`}
              >
                {!isLoading &&
                  products.data.map((product: any, index: number) => (
                    <ProductCard
                      key={index}
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
