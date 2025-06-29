import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface Tenant {
  id: number;
  name: string;
  address: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  tenant?: Tenant;
}

interface AuthState {
  user: null | User;
  loaded:boolean;
  setUser: (user: User) => void;
  setLoading: (val: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools((set) => ({
    user: null,
    loaded:false,
    setUser: (user) => set({ user }),
    setLoading: (val:boolean) => set({ loaded:val }),
    logout: () => set({ user: null }),
  }))
);
