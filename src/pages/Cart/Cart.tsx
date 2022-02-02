import React, { useContext } from "react";
import { CartContext } from "../../context/cart/cartContext";
import { IProduct } from "../../context/product/interfaces/IProduct";
import { ICartItem } from "../../context/cart/interfaces/ICartItem";
import { Link } from "react-router-dom";

export const Cart = () => {
  const { cartItems, updateCartItemCount, selectCartItem, removeCartItems } =
    useContext(CartContext);

  const getSelectedItems = () => {
    const keys = new Array<string>();
    for (const item of cartItems) {
      if (item.selected) keys.push(item.id);
    }
    return keys;
  };

  const deleteItems = () => {
    removeCartItems(getSelectedItems());
  };

  if (cartItems.length === 0) {
    return <div>No Items in cart</div>;
  }

  return (
    <section className="cart">
      <h1 className="cart__title">Shopping cart</h1>
      <div className="cart__items">
        {cartItems.map((cartItem: ICartItem) => {
          return (
            <div className="cart__item" key={"cartItem" + cartItem.id}>
              <div className="cart__column-toggle">
                <input
                  type="checkbox"
                  defaultChecked={cartItem.selected}
                  onChange={(event) =>
                    selectCartItem(cartItem.id, !cartItem.selected)
                  }
                />
              </div>
              <div className="cart__column-image">
                <img src={cartItem.imageUrl} />
              </div>
              <div className="cart__column-name">{cartItem.name}</div>
              <div className="cart__column-count">
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  max="99"
                  maxLength={1}
                  value={cartItem.count}
                  onChange={(event) =>
                    updateCartItemCount(cartItem.id, +event.target.value)
                  }
                />
              </div>
              <div className="cart__column-price">
                {cartItem.price}&nbsp;USD
              </div>
            </div>
          );
        })}
      </div>
      <div className="cart__button">
        <Link to="/order">
          <input
            type="button"
            value="Order"
            disabled={getSelectedItems().length === 0}
          />
        </Link>
      </div>
      <div className="cart__button">
        <input
          type="button"
          value="Delete"
          onClick={deleteItems}
          disabled={getSelectedItems().length === 0}
        />
      </div>
    </section>
  );
};
