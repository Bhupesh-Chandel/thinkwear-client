import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
// import { CartProvider } from "./components/cart-provider.tsx";
import { AuthProvider } from "./Context/AuthProvider.tsx";
// import { AuthProvider } from 'r';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";



const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  
  <StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
     <AuthProvider>

            <App />

     </AuthProvider>
     </QueryClientProvider>

   
    </BrowserRouter>
    
  </StrictMode>
);
