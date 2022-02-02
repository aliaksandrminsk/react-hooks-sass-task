import React, { useContext } from "react";
import { CartContext } from "../../context/cart/cartContext";
import { ICartItem } from "../../context/cart/interfaces/ICartItem";
import { Link } from "react-router-dom";

export const Cart = () => {
  const { cartItems, updateCartItemCount, removeCartItems, getSelectedItems } =
    useContext(CartContext);

  return (
    <section className="cart">
      <h1 className="cart__title">Shopping cart</h1>
      {cartItems.length === 0 ? (
        <div className="cart__message-empty">Your cart is empty.</div>
      ) : (
        <div className="cart__items">
          {cartItems.map((cartItem: ICartItem) => {
            return (
              <div className="cart__item" key={"cartItem" + cartItem.id}>
                <div className="cart__column-toggle">
                  <input
                    type="checkbox"
                    defaultChecked={cartItem.selected}
                    onChange={(event) =>
                      updateCartItemCount(cartItem.id, {
                        selected: !cartItem.selected,
                      })
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
                    value={cartItem.quantity}
                    onChange={(event) =>
                      updateCartItemCount(cartItem.id, {
                        quantity: +event.target.value,
                      })
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
      )}

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
          onClick={() => removeCartItems(getSelectedItems())}
          disabled={getSelectedItems().length === 0}
        />
      </div>
    </section>
  );
};
