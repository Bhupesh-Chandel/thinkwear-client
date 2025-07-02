// import { CartProvider } from "./components/cart-provider";
// import Footer from "./components/footer";
// import Navbar from "./components/navbar";
// import Home from "./pages/home/home";
// import ProductPage from "./pages/single-product/page";
// import ProductsPage from "./Products/all-products";
// import { Route, Routes } from "react-router";
// import Contact from "./pages/Contact/contact";
// import { Outlet } from "react-router"; // If using React Router
// import { CartDrawerProvider } from "./Context/CartDrawerContext"
// import CartDrawer from "./Context/CartDrawer";

// import {
//   QueryClient,
//   QueryClientProvider,
// } from '@tanstack/react-query'
// import { ThemeProvider } from "./components/theme-provider";
// import About from "./pages/About/about";
// // import { Contact } from "lucide-react";

// const queryClient = new QueryClient()

// function App() {
//   return (
//     <>
//      <QueryClientProvider client={queryClient}>
//       <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
//       <CartProvider>
//         <Navbar />

//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/products" element={<ProductsPage />} />
//           <Route path="/products/:id" element={<ProductPage />} />
//           <Route path="/about" element={<About/>}/>
//           <Route path="/contact" element={<Contact/>}/>
//         </Routes>

//         <Footer/>

//       </CartProvider>
//       </ThemeProvider>
//       </QueryClientProvider>
//     </>
//   );
// }

// export default App;


// import { CartProvider } from "./components/cart-provider";
// import Footer from "./components/footer";
// import Navbar from "./components/navbar";
import Home from "./pages/home/home";
import ProductPage from "./pages/single-product/page";
import ProductsPage from "./Products/all-products";
import Contact from "./pages/Contact/contact";
import About from "./pages/About/about";

import { Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./components/theme-provider";

import { CartDrawerProvider } from "./Context/CartDrawerContext";
import CartDrawer from "./Context/CartDrawer";
import { CartProvider } from "./Context/cartContext";
import ShippingAddressForm from "./pages/Destination";
import MainLayout from "./layout/MainLayout";
import PaymentPage from "./pages/payment";
import Complete from './pages/complete';

const queryClient = new QueryClient();

// function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
//         <CartProvider>
//           <CartDrawerProvider>
//             <CartProvider>


//             <Navbar />

//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/products" element={<ProductsPage />} />
//               <Route path="/products/:id" element={<ProductPage />} />
//               <Route path="/about" element={<About />} />
//               <Route path="/contact" element={<Contact />} />
//             </Routes>

//             <Footer />

//             {/* 🔽 This stays outside the Routes so it’s always mounted */}

//             <CartDrawer />
//               </CartProvider>
//           </CartDrawerProvider>
//         </CartProvider>
//       </ThemeProvider>
//     </QueryClientProvider>
//   );
// }



function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <CartProvider> {/* ✅ Wrap once */}
          <CartDrawerProvider>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                {/* <Route path="/destination" element={<ShippingAddressForm />} /> */}
              </Route>
              <Route path="/destination" element={<ShippingAddressForm />} />
              <Route path="/payment" element={<PaymentPage/>} />
              <Route path="/complete" element={<Complete/>} />
            </Routes>
            {/* ✅ Always visible */}
            <CartDrawer />
          </CartDrawerProvider>
        </CartProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
export default App;
