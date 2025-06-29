import { CartProvider } from "./components/cart-provider";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import Home from "./pages/home/home";
import ProductPage from "./pages/single-product/page";
import ProductsPage from "./Products/all-products";
import { Route, Routes } from "react-router";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <>
     <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductPage />} />
        </Routes>

        <Footer/>

      </CartProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
