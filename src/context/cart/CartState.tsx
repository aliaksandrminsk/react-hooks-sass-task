import React, { useReducer } from "react";
import { ActionType } from "../types";
import { CartContext } from "./cartContext";
import { cartReducer, ICartState } from "./cartReducer";
import { ICartItem } from "./interfaces/ICartItem";
import { IProduct } from "../product/interfaces/IProduct";

export const CartState: React.FC = ({ children }) => {
  const initialState: ICartState = {
    cartItems: [],
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addCartItem = (product: IProduct) => {
    const cartItem: ICartItem = {
      id: product.id,
      file: product.file,
      name: product.name,
      price: product.price,
      count: 1,
    };

    dispatch({
      type: ActionType.UPDATE_CART_ITEMS,
      cartItems: [...cartItems, cartItem],
    });
  };

  const updateCartItem = (key: string, count: number) => {
    const newCartItems = [...cartItems];
    for (const item of newCartItems) {
      if (item.id === key) {
        item.count = count;
        break;
      }
    }
    dispatch({
      type: ActionType.UPDATE_CART_ITEMS,
      cartItems: newCartItems,
    });
  };

  const removeCartItems = (keys: Array<string>) => {
    let newCartItems = [...cartItems];
    for (const key of keys) {
      newCartItems = newCartItems.filter((item) => {
        return !(item.id === key);
      });
    }

    dispatch({
      type: ActionType.UPDATE_CART_ITEMS,
      cartItems: newCartItems,
    });
  };

  const { cartItems } = state;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addCartItem,
        updateCartItem,
        removeCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
