// import { Navigate, Route, Routes } from "react-router";
// // import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ThemeProvider } from "./components/theme-provider";
// import { CartProvider } from "./Context/cartContext";
// import { CartDrawerProvider } from "./Context/CartDrawerContext";
// import CartDrawer from "./Context/CartDrawer";

// import Home from "./pages/home/home";
// import ProductPage from "./pages/single-product/page";
// import ProductsPage from "./Products/all-products";
// import Contact from "./pages/Contact/contact";
// import About from "./pages/About/about";
// import SignupForm from "./pages/Contact/signup";
// import ShippingAddressForm from "./pages/Destination";
// import PaymentPage from "./pages/payment";
// import Complete from "./pages/complete";
// import MainLayout from "./layout/MainLayout";

// import { useAuth } from "./Context/AuthProvider";
// import { useLoadingWithRefresh } from "./hooks/useLoadingWithRefresh";
// import { useAuthStore } from "./store";

// // const queryClient = new QueryClient();

// function App() {
//   // const { authUser } = useAuth();
//   const {loading} = useLoadingWithRefresh();

//   if(loading)  return (<>loading</>);

//     const user = useAuthStore((state) => state.user);

//   return (
//     // <QueryClientProvider client={queryClient}>
//       <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
//         <CartProvider>
//           <CartDrawerProvider>
//             <Routes>
//               <Route element={<MainLayout />}>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/products" element={<ProductsPage />} />
//                 <Route path="/products/:id" element={<ProductPage />} />
//                 <Route path="/about" element={<About />} />
//                 <Route
//                   path="/contact"
//                   element={user ? <Navigate to="/" /> : <Contact />}
//                 />
//                 <Route
//                   path="/signup"
//                   element={user ? <Navigate to="/" /> : <SignupForm />}
//                 />
//               </Route>

//               <Route path="/destination" element={<ShippingAddressForm />} />
//               <Route path="/payment" element={<PaymentPage />} />
//               <Route path="/complete" element={<Complete />} />
//             </Routes>

//             {/* Always visible */}
//             <CartDrawer />
//           </CartDrawerProvider>
//         </CartProvider>
//       </ThemeProvider>
//     // </QueryClientProvider>
//   );
// }

// export default App;


import { Navigate, Route, Routes } from "react-router";
import { ThemeProvider } from "./components/theme-provider";
import { CartProvider } from "./Context/cartContext";
import { CartDrawerProvider } from "./Context/CartDrawerContext";
import CartDrawer from "./Context/CartDrawer";

import Home from "./pages/home/home";
import ProductPage from "./pages/single-product/page";
import ProductsPage from "./Products/all-products";
import Contact from "./pages/Contact/contact";
import About from "./pages/About/about";
import SignupForm from "./pages/Contact/signup";
import ShippingAddressForm from "./pages/Destination";
import PaymentPage from "./pages/payment";
import Complete from "./pages/complete";
import MainLayout from "./layout/MainLayout";

import { useAuth } from "./Context/AuthProvider";
// import { useLoadingWithRefresh } from "./hooks/useLoadingWithRefresh";
// import { useAuthStore } from "./store";
// import { useAuth } from './Context/AuthProvider';

function App() {
  // Call all hooks unconditionally at the top level
  // const { loading } = useLoadingWithRefresh();
  // const user = useAuthStore((state) => state.user);
     const { authUser}  = useAuth();
  // if (loading) return <>
  //     <div className="flex justify-center items-center min-h-[500px]">
  //             <svg
  //               className="animate-spin h-8 w-8 text-purple-600"
  //               xmlns="http://www.w3.org/2000/svg"
  //               fill="none"
  //               viewBox="0 0 24 24"
  //             >
  //               <circle
  //                 className="opacity-25"
  //                 cx="12"
  //                 cy="12"
  //                 r="10"
  //                 stroke="currentColor"
  //                 strokeWidth="4"
  //               />
  //               <path
  //                 className="opacity-75"
  //                 fill="currentColor"
  //                 d="M4 12a8 8 0 018-8v8H4z"
  //               />
  //             </svg>
  //           </div>
  //   </>;

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <CartProvider>
        <CartDrawerProvider>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductPage />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/contact"
                element={authUser ? <Navigate to="/" /> : <Contact />}
              />
              <Route
                path="/signup"
                element={authUser ? <Navigate to="/" /> : <SignupForm />}
              />
            </Route>

            <Route path="/destination" element={<ShippingAddressForm />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/complete" element={<Complete />} />
          </Routes>

          {/* Always visible */}
          <CartDrawer />
        </CartDrawerProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
