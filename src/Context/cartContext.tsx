import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';



interface CartContextType {
  cartItems: any[];
  addToCart: (product: any) => void;
  removeFromCart: (id: string) => void;
  updateQuantity : (id: string, newQty: number)=>void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<any[]>([]);

  const addToCart = (product: any) => {
    setCartItems(prev => {
      const exists = prev.find(item => item._id === product._id);
      if (exists) {
        return prev.map(item =>
          item._id === product._id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item._id !== id));
  };

  function updateQuantity(id: string, newQty: number) {
  setCartItems((prevItems) =>
    prevItems.map((item) =>
      item._id === id ? { ...item, quantity: newQty } : item
    )
  );
}

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity ,clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
