import { CartProvider } from "./components/cart-provider";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import Home from "./pages/home/home";
import ProductPage from "./pages/single-product/page";
import ProductsPage from "./Products/all-products";
import { Route, Routes } from "react-router";
import Contact from "./pages/Contact/contact";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ThemeProvider } from "./components/theme-provider";
import About from "./pages/About/about";
// import { Contact } from "lucide-react";

const queryClient = new QueryClient()

function App() {
  return (
    <>
     <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <CartProvider>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contact/>}/>
        </Routes>

        <Footer/>

      </CartProvider>
      </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
