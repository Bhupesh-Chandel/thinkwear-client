// import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
// // import { XMarkIcon } from "@heroicons/react/24/outline";
// import { useCartDrawer } from "./CartDrawerContext";
// import { useCart } from "./cartContext"

// type Product = {
//   id: number;
//   name: string;
//   href: string;
//   color: string;
//   price: string;
//   quantity: number;
//   imageSrc: string;
//   imageAlt: string;
// };

// const products: Product[] = [
//   {
//     id: 1,
//     name: "Throwback Hip Bag",
//     href: "#",
//     color: "Salmon",
//     price: "$90.00",
//     quantity: 1,
//     imageSrc: "https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
//     imageAlt: "Salmon orange fabric pouch...",
//   },
//   {
//     id: 2,
//     name: "Medium Stuff Satchel",
//     href: "#",
//     color: "Blue",
//     price: "$32.00",
//     quantity: 1,
//     imageSrc: "https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
//     imageAlt: "Front of satchel...",
//   },
// ];

// export default function CartDrawer() {
//   const { open, setOpen } = useCartDrawer();
//   // const { cartItems, removeFromCart } = useCart();

//   return (
//     <Dialog open={open} onClose={setOpen} className="relative z-50">
//       <ul>
//         {/* {cartItems.map(item  => (
//           <li key={item._id}>
//             {item.name} x {item.quantity}
//             <button onClick={() => removeFromCart(item._id)}>Remove</button>
//           </li>
//         ))} */}

//         {products?.length > 0 ? (
//           products.map(item => (
//             <li  key={item.id}>
//               {/* {item.name}  */}
//               {/* x {item.quantity} */}
//               {/* <button onClick={() => removeFromCart(item._id)}>Remove</button> */}
//               <h1>jsdjsbd</h1>
//             </li>
//           ))
//         ) : (
//           <p className="p-4 text-gray-500">Cart is empty</p>
//         )}


//       </ul>
//     </Dialog>
//   );
// }

//!work fine code
// import {
//   Dialog,
//   DialogPanel,
//   DialogTitle,
// } from "@headlessui/react"; // ✅ use DialogPanel

// import { useCartDrawer } from "./CartDrawerContext";
// import { useCart } from "./cartContext";

// export default function CartDrawer() {
//   const { open, setOpen } = useCartDrawer();
//   const { cartItems } = useCart();

//   return (
//     <Dialog open={open} onClose={setOpen} className="relative z-50">
//       {/* Backdrop */}
//       <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

//       {/* Drawer Panel */}
//       <DialogPanel className="fixed top-0 right-0 w-120 h-full bg-white p-4 shadow-lg">
//         <DialogTitle className="text-lg font-bold mb-4">Cart</DialogTitle>

//         <ul>
//           {cartItems.length > 0 ? (
//             cartItems.map((item) => (
//               <li key={item._id } className="mb-2">
//                 {item.name} x {item.quantity}
//                 <img src={item.image} alt={item.name} />
//                 {item.price}
//               </li>
//             ))
//           ) : (
//             <p className="text-gray-500">Cart is empty</p>
//           )}
//         </ul>

//         <button onClick={() => setOpen(false)} className="mt-4 text-sm text-blue-600">
//           Close
//         </button>
//       </DialogPanel>
//     </Dialog>
//   );
// }
//!work fine above code

// import {
//   Dialog,
//   DialogPanel,
//   DialogTitle,
// } from "@headlessui/react";
// import { useCartDrawer } from "./CartDrawerContext";
// import { useCart } from "./cartContext";
// import { X } from "lucide-react";

// export default function CartDrawer() {
//   const { open, setOpen } = useCartDrawer();
//   const { cartItems, removeFromCart } = useCart();

//   function getFirstAvailablePrice(item: CartItem): number {
//   const config = item.priceConfiguration;

//   if (!config) return 0;

//   // Try to get the first key (like "size", "Size", or "length")
//   const configKey = Object.keys(config)[0];

//   if (!configKey) return 0;

//   const options = config[configKey]?.availableOptions;

//   if (!options) return 0;

//   // Get the first size/option like S, M, L...
//   const firstOptionKey = Object.keys(options)[0];

//   return options[firstOptionKey] || 0;
// }


//   const subtotal = cartItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   return (
//     <Dialog open={open} onClose={setOpen} className="relative z-50">
//       {/* Backdrop */}
//       <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

//       {/* Drawer Panel */}
//       <div className="fixed inset-0 flex justify-end">
//         <DialogPanel className="w-[400px] h-full bg-white p-6 shadow-xl flex flex-col">
//           {/* Header */}
//           <div className="flex items-center justify-between mb-6">
//             <DialogTitle className="text-xl font-bold">Your Cart</DialogTitle>
//             <button onClick={() => setOpen(false)}>
//               <X className="h-5 w-5 text-gray-600" />
//             </button>
//           </div>

//           {/* Cart Items */}
//           <div className="flex-1 overflow-y-auto space-y-6">
//             {cartItems.length > 0 ? (
//               cartItems.map((item) => (
//                 <div key={item._id} className="flex gap-4 items-center border-b pb-4">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-16 h-16 object-cover rounded"
//                   />
//                   <div className="flex-1">
//                     <p className="font-medium text-sm">{item.name}</p>
//                     <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
//                     const price = getFirstAvailablePrice(item);
//                     <p className="text-sm font-semibold mt-1">₹{price}</p>
//                   </div>
//                   <button
//                     onClick={() => removeFromCart(item._id)}
//                     className="text-red-500 text-xs"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500 text-center mt-10">Your cart is empty.</p>
//             )}
//           </div>

//           {/* Footer */}
//           <div className="mt-6 border-t pt-4">
//             <div className="flex justify-between mb-4">
//               <span className="font-medium">Subtotal</span>
//               <span className="font-bold">₹{subtotal.toFixed(2)}</span>
//             </div>

//             <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
//               Proceed to Checkout
//             </button>
//             <button
//               onClick={() => setOpen(false)}
//               className="w-full mt-2 text-sm text-gray-600 hover:underline"
//             >
//               Continue Shopping
//             </button>
//           </div>
//         </DialogPanel>
//       </div>
//     </Dialog>
//   );
// }

// import {
//   Dialog,
//   DialogPanel,
//   DialogTitle,
// } from "@headlessui/react";
// import { useCartDrawer } from "./CartDrawerContext";
// import { useCart } from "./cartContext";
// import { X } from "lucide-react";

// export default function CartDrawer() {
//   const { open, setOpen } = useCartDrawer();
//   const { cartItems, removeFromCart } = useCart();

//   function getFirstAvailablePrice(item: CartItem): number {
//     const config = item.priceConfiguration;

//     if (!config) return 0;

//     const configKey = Object.keys(config)[0];
//     if (!configKey) return 0;

//     const options = config[configKey]?.availableOptions;
//     if (!options) return 0;

//     const firstOptionKey = Object.keys(options)[0];
//     return options[firstOptionKey] || 0;
//   }

//   const subtotal = cartItems.reduce((acc, item) => {
//     const price = getFirstAvailablePrice(item);
//     return acc + price * item.quantity;
//   }, 0);

//   return (
//     <Dialog open={open} onClose={setOpen} className="relative z-50">
//       {/* Backdrop */}
//       <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

//       {/* Drawer Panel */}
//       <div className="fixed inset-0 flex justify-end">
//         <DialogPanel className="w-[400px] h-full bg-white p-6 shadow-xl flex flex-col">
//           {/* Header */}
//           <div className="flex items-center justify-between mb-6">
//             <DialogTitle className="text-xl font-bold">Your Cart</DialogTitle>
//             <button onClick={() => setOpen(false)}>
//               <X className="h-5 w-5 text-gray-600" />
//             </button>
//           </div>

//           {/* Cart Items */}
//           <div className="flex-1 overflow-y-auto space-y-6">
//             {cartItems.length > 0 ? (
//               cartItems.map((item) => {
//                 const price = getFirstAvailablePrice(item);

//                 return (
//                   <div
//                     key={item._id}
//                     className="flex gap-4 items-center border-b pb-4"
//                   >
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-16 h-16 object-cover rounded"
//                     />
//                     <div className="flex-1">
//                       <p className="font-medium text-sm">{item.name}</p>
//                       <p className="text-gray-500 text-xs">
//                         Qty: {item.quantity}
//                       </p>
//                       <p className="text-sm font-semibold mt-1">
//                         ₹{price}
//                       </p>
//                     </div>
//                     <button
//                       onClick={() => removeFromCart(item._id)}
//                       className="text-red-500 text-xs"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 );
//               })
//             ) : (
//               <p className="text-gray-500 text-center mt-10">
//                 Your cart is empty.
//               </p>
//             )}
//           </div>

//           {/* Footer */}
//           <div className="mt-6 border-t pt-4">
//             <div className="flex justify-between mb-4">
//               <span className="font-medium">Subtotal</span>
//               <span className="font-bold">₹{subtotal.toFixed(2)}</span>
//             </div>

//             <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
//               Proceed to Checkout
//             </button>
//             <button
//               onClick={() => setOpen(false)}
//               className="w-full mt-2 text-sm text-gray-600 hover:underline"
//             >
//               Continue Shopping
//             </button>
//           </div>
//         </DialogPanel>
//       </div>
//     </Dialog>
//   );
// }

// import {
//   Dialog,
//   DialogPanel,
//   DialogTitle,
// } from "@headlessui/react";
// import { useCartDrawer } from "./CartDrawerContext";
// import { useCart } from "./cartContext";
// import { X } from "lucide-react";
// import { Link } from 'react-router';

// export default function CartDrawer() {
//   const { open, setOpen } = useCartDrawer();
//   const { cartItems, removeFromCart, updateQuantity } = useCart();

//   function getFirstAvailablePrice(item: CartItem): number {
//     const config = item.priceConfiguration;
//     if (!config) return 0;
//     const configKey = Object.keys(config)[0];
//     if (!configKey) return 0;
//     const options = config[configKey]?.availableOptions;
//     if (!options) return 0;
//     const firstOptionKey = Object.keys(options)[0];
//     return options[firstOptionKey] || 0;
//   }

//   const subtotal = cartItems.reduce((acc, item) => {
//     const price = getFirstAvailablePrice(item);
//     return acc + price * item.quantity;
//   }, 0);

//   const handleQuantityChange = (itemId: string, delta: number) => {
//     const item = cartItems.find((item) => item._id === itemId);
//     if (!item) return;
//     const newQuantity = item.quantity + delta;
//     if (newQuantity >= 1) {
//       updateQuantity(itemId, newQuantity);
//     }
//   };

//   return (
//     <Dialog open={open} onClose={setOpen} className="relative z-50">
//       <div className="fixed inset-0 bg-black/30" aria-hidden="true " />
//       <div className="fixed inset-0 flex justify-end">
//         <DialogPanel className="w-[340px] h-full bg-white p-6 shadow-xl flex flex-col dark:bg-black shadow-accent-foreground">
//           <div className="flex items-center justify-between mb-6">
//             <DialogTitle className="text-xl font-bold">Your Cart</DialogTitle>
//             <button onClick={() => setOpen(false)}>
//               <X className="h-5 w-5 text-gray-600" />
//             </button>
//           </div>

//           <div className="flex-1 overflow-y-auto space-y-6">
//             {cartItems.length > 0 ? (
//               cartItems.map((item) => {
//                 const price = getFirstAvailablePrice(item);
//                 const itemSubtotal = price * item.quantity;

//                 return (
//                   <div
//                     key={item._id}
//                     className="flex gap-4 items-center border-b pb-4"
//                   >
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-18 h-18 object-cover rounded"
//                     />
//                     <div className="flex-1 ">
//                       <p className="font-medium text-sm">{item.name}</p>
//                       <div className="flex items-center gap-2 mt-1">
//                         <button
//                           onClick={() => handleQuantityChange(item._id, -1)}
//                           className="px-2 py-1 border rounded text-sm dark:border border-white"
//                         >
//                           -
//                         </button>
//                         <span className="text-sm">{item.quantity}</span>
//                         <button
//                           onClick={() => handleQuantityChange(item._id, 1)}
//                           className="px-2 py-1 border rounded text-sm  dark:border border-white" 
//                         >
//                           +
//                         </button>
//                       </div>
//                       <p className="text-sm font-semibold mt-1">
//                         ₹{itemSubtotal.toFixed(2)}
//                       </p>
//                     </div>
//                     <button
//                       onClick={() => removeFromCart(item._id)}
//                       className="text-red-500 text-xs"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 );
//               })
//             ) : (
//               <p className="text-gray-500 text-center mt-10">
//                 Your cart is empty.
//               </p>
//             )}
//           </div>

//           <div className="mt-6 border-t pt-4">
//             <div className="flex justify-between mb-4">
//               <span className="font-medium">Subtotal</span>
//               <span className="font-bold">₹{subtotal.toFixed(2)}</span>
//             </div>
//             {cartItems.length > 0 ? (
//             <Link to="/destination">
//               <button
//                 className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 dark:dark:bg-gray-800"
//                 onClick={() => setOpen(false)}
//               >
//                 Proceed to Checkout
//               </button>
//             </Link>
//             ) : (
//             <button
//               disabled
//               className="w-full bg-gray-400 text-white py-2 rounded cursor-not-allowed"
//             >
//               Proceed to Checkout
//             </button>
//            )}
//             <button
//               onClick={() => setOpen(false)}
//               className="w-full mt-2 text-sm text-gray-600 hover:underline dark:text-slate-400" 
//             >
//               Continue Shopping
//             </button>
//           </div>
//         </DialogPanel>
//       </div>
//     </Dialog>
//   );
// }

import {
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useCartDrawer } from "./CartDrawerContext";
import { useCart } from "./cartContext";
import { X } from "lucide-react";
import { Link } from "react-router";

export default function CartDrawer() {
  const { open, setOpen } = useCartDrawer();
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  function getFirstAvailablePrice(item : any): number {
    const config = item.priceConfiguration;
    if (!config) return 0;
    const configKey = Object.keys(config)[0];
    if (!configKey) return 0;
    const options = config[configKey]?.availableOptions;
    if (!options) return 0;
    const firstOptionKey = Object.keys(options)[0];
    return options[firstOptionKey] || 0;
  }

  const subtotal = cartItems.reduce((acc, item) => {
    const price = getFirstAvailablePrice(item);
    return acc + price * item.quantity;
  }, 0);

  const handleQuantityChange = (itemId: string, delta: number) => {
    const item = cartItems.find((item) => item._id === itemId);
    if (!item) return;
    const newQuantity = item.quantity + delta;
    if (newQuantity >= 1) {
      updateQuantity(itemId, newQuantity);
    }
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex justify-end">
        <DialogPanel className="w-[340px] h-full bg-white p-6 shadow-xl flex flex-col dark:bg-black shadow-accent-foreground">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <DialogTitle className="text-xl font-bold">Your Cart</DialogTitle>
            <button onClick={() => setOpen(false)}>
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto space-y-6">
            {cartItems.length > 0 ? (
              cartItems.map((item) => {
                const price = getFirstAvailablePrice(item);
                const itemSubtotal = price * item.quantity;

                return (
                  <div
                    key={item._id}
                    className="flex items-start gap-4 border-b pb-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded shrink-0"
                    />
                    <div className="flex-1 space-y-2 pl-5">
                      <p className="font-medium text-sm">{item.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() => handleQuantityChange(item._id, -1)}
                          className="w-8 h-8 flex items-center justify-center border rounded text-sm dark:border-white border-gray-300"
                        >
                          -
                        </button>
                        <span className="text-sm">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item._id, 1)}
                          className="w-8 h-8 flex items-center justify-center border rounded text-sm dark:border-white border-gray-300"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-sm font-semibold mt-1">
                        ₹{itemSubtotal.toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500 text-xs ml-2"
                    >
                      Remove
                    </button>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 text-center mt-10">
                Your cart is empty.
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between mb-4 text-sm">
              <span className="font-medium">Subtotal</span>
              <span className="font-bold">₹{subtotal.toFixed(2)}</span>
            </div>

            {cartItems.length > 0 ? (
              <Link to="/destination">
                <button
                  className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 dark:bg-gray-800 transition"
                  onClick={() => setOpen(false)}
                >
                  Proceed to Checkout
                </button>
              </Link>
            ) : (
              <button
                disabled
                className="w-full bg-gray-400 text-white py-2 rounded cursor-not-allowed"
              >
                Proceed to Checkout
              </button>
            )}

            <button
              onClick={() => setOpen(false)}
              className="w-full mt-2 text-sm text-gray-600 hover:underline dark:text-slate-400"
            >
              Continue Shopping
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

