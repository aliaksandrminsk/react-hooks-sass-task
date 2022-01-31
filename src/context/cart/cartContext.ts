import { createContext } from "react";
import { ICartItem } from "./interfaces/ICartItem";
import { IProduct } from "../product/interfaces/IProduct";

interface ICartContext {
  cartItems: Array<ICartItem>;
  addCartItem: (product: IProduct) => void;
  updateCartItemCount: (key: string, count: number) => void;
  selectCartItem: (key: string, selected: boolean) => void;
  removeCartItems: (keys: Array<string>) => void;
  isAddedProduct: (key: string) => boolean;
}

export const CartContext = createContext({} as ICartContext);
