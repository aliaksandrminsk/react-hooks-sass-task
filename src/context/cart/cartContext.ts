import { createContext } from "react";
import { ICartItem } from "./interfaces/ICartItem";
import { IProduct } from "../product/interfaces/IProduct";

interface ICartContext {
  cartItems: Array<ICartItem>;
  addCartItem: (product: IProduct) => void;
  updateCartItem: (key: string, count: number) => void;
  removeCartItems: (keys: Array<string>) => void;
}

export const CartContext = createContext({} as ICartContext);
