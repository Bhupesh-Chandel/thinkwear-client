
// export interface Product {
//   _id: any;
//   id: number;
//   name: string;
//   price: number;
//   originalPrice?: number;
//   image: string;
//   rating: number;
//   reviews: number;
//   badge?: string;
// }

export interface Product {
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
    size?: {
      priceType: string;
      availableOptions: Record<string, number>; // e.g. { S: 300, M: 340 }
    };
  };

  categoryId?: string;
  attributes?: Array<any>;
  isPublish?: boolean;
  createdAt?: string;
  updatedAt?: string;
}


// export const sampleProducts: Product[] = [
//   {
//     id: 1,
//     name: "Premium Wireless Headphones",
//     price: 299.99,
//     originalPrice: 399.99,
//     image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400",
//     rating: 4.8,
//     reviews: 1248,
//     badge: "Best Seller"
//   },
//   {
//     id: 2,
//     name: "Smart Fitness Watch",
//     price: 199.99,
//     image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400",
//     rating: 4.6,
//     reviews: 892
//   },
//   {
//     id: 3,
//     name: "Professional Camera Lens",
//     price: 549.99,
//     originalPrice: 649.99,
//     image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400",
//     rating: 4.9,
//     reviews: 456,
//     badge: "New"
//   },
//   {
//     id: 4,
//     name: "Mechanical Gaming Keyboard",
//     price: 159.99,
//     image: "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=400",
//     rating: 4.7,
//     reviews: 2103
//   },
//   {
//     id: 5,
//     name: "Wireless Mouse Pro",
//     price: 89.99,
//     originalPrice: 119.99,
//     image: "https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=400",
//     rating: 4.5,
//     reviews: 756
//   },
//   {
//     id: 6,
//     name: "4K Monitor Ultra Wide",
//     price: 699.99,
//     image: "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=400",
//     rating: 4.8,
//     reviews: 341,
//     badge: "Premium"
//   },
//   {
//     id: 7,
//     name: "Smartphone Stand",
//     price: 29.99,
//     originalPrice: 39.99,
//     image: "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=400",
//     rating: 4.4,
//     reviews: 1829
//   },
//   {
//     id: 8,
//     name: "Bluetooth Speaker",
//     price: 79.99,
//     image: "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=400",
//     rating: 4.6,
//     reviews: 923
//   },
//   {
//     id: 9,
//     name: "USB-C Hub",
//     price: 49.99,
//     image: "https://images.pexels.com/photos/163117/circuit-circuit-board-resistor-computer-163117.jpeg?auto=compress&cs=tinysrgb&w=400",
//     rating: 4.3,
//     reviews: 567
//   },
//   {
//     id: 10,
//     name: "Laptop Cooling Pad",
//     price: 39.99,
//     originalPrice: 59.99,
//     image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400",
//     rating: 4.2,
//     reviews: 1456,
//     badge: "Sale"
//   }
// ];