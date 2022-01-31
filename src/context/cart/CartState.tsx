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
      imageUrl: `/products/${product.category}/${product.file}`,
      name: product.name,
      price: product.price,
      count: 1,
      selected: true,
    };

    dispatch({
      type: ActionType.UPDATE_CART_ITEMS,
      cartItems: [...cartItems, cartItem],
    });
  };

  const updateCartItemCount = (key: string, count: number) => {
    const newCartItems = [...cartItems];

    if (count > 99) count = 99;
    if (count < 0) count = 0;

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

  const selectCartItem = (key: string, selected: boolean) => {
    const newCartItems = [...cartItems];
    for (const item of newCartItems) {
      if (item.id === key) {
        item.selected = selected;
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

  const isAddedProduct = (key: string) => {
    for (const item of cartItems) {
      if (item.id === key) {
        return true;
      }
    }
    return false;
  };

  const { cartItems } = state;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addCartItem,
        updateCartItemCount,
        selectCartItem,
        removeCartItems,
        isAddedProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
