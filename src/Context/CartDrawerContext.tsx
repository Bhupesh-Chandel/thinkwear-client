import { createContext, useContext, useState } from "react";
import type {ReactNode} from "react";

type CartDrawerContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const CartDrawerContext = createContext<CartDrawerContextType | undefined>(undefined);

export const CartDrawerProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <CartDrawerContext.Provider value={{ open, setOpen }}>
      {children}
    </CartDrawerContext.Provider>
  );
};

export const useCartDrawer = (): CartDrawerContextType => {
  const context = useContext(CartDrawerContext);
  if (!context) {
    throw new Error("useCartDrawer must be used within a CartDrawerProvider");
  }
  return context;
};
