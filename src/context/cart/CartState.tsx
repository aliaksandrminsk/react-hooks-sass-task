import React, { useEffect, useReducer } from "react";
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
      desc: product.desc,
      imageUrl: `/products/${product.category}/${product.file}`,
      name: product.name,
      price: product.price,
      quantity: 1,
      selected: true,
    };
    const newCartItems = [...cartItems, cartItem];

    localStorage.setItem("cart", JSON.stringify(newCartItems));
    dispatch({
      type: ActionType.UPDATE_CART_ITEMS,
      cartItems: newCartItems,
    });
  };

  const updateCartItemCount = (key: string, values: Partial<ICartItem>) => {
    const newCartItems = [...cartItems];

    let quantity;
    if (values.quantity != null) {
      if (values.quantity > 9) {
        quantity = 9;
      } else if (values.quantity < 1) {
        quantity = 1;
      } else {
        quantity = values.quantity;
      }
    }
    for (const item of newCartItems) {
      if (item.id === key) {
        if (quantity != null) item.quantity = quantity;
        if (values.selected != null) item.selected = values.selected;
        break;
      }
    }
    localStorage.setItem("cart", JSON.stringify(newCartItems));
    dispatch({
      type: ActionType.UPDATE_CART_ITEMS,
      cartItems: newCartItems,
    });
  };

  const removeCartItems = (keys: Set<string>) => {
    let newCartItems = [...cartItems];

    keys.forEach((key) => {
      newCartItems = newCartItems.filter((item) => {
        return !(item.id === key);
      });
    });

    localStorage.setItem("cart", JSON.stringify(newCartItems));
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

  const getSelectedItems = () => {
    const keys = new Set<string>();
    for (const item of cartItems) {
      if (item.selected) keys.add(item.id);
    }
    return keys;
  };

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart != null) {
      const cartItems: Array<ICartItem> = JSON.parse(savedCart);
      dispatch({
        type: ActionType.UPDATE_CART_ITEMS,
        cartItems: cartItems,
      });
    }
  }, []);

  const { cartItems } = state;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addCartItem,
        updateCartItemCount,
        removeCartItems,
        isAddedProduct,
        getSelectedItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
