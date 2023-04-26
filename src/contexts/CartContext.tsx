import { createContext } from 'react';

type CartContextTypes = {
  cart: boolean;
  setCart: React.Dispatch<React.SetStateAction<boolean>>;
  cartSubTotal: number;
  setCartSubTotal: React.Dispatch<React.SetStateAction<number>>;
  cartCount: number;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
  localCartItems: any[];
  setLocalCartItems: React.Dispatch<React.SetStateAction<any[]>>;
};

export const CartContext = createContext<CartContextTypes | null>(null);
