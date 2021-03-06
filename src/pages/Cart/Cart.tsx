import React, { Fragment, useContext } from "react";
import { CartContext } from "../../context/cart/cartContext";
import { ICartItem } from "../../context/cart/interfaces/ICartItem";
import { Link } from "react-router-dom";
import { openFancyBox } from "../../lib/fancyBox";

export const Cart = () => {
  const { cartItems, updateCartItemCount, removeCartItems, getSelectedItems } =
    useContext(CartContext);
  const selectedCartItems = getSelectedItems();

  return (
    <section className="cart">
      <h1 className="cart__title">Shopping cart</h1>
      <hr className="cart__hr" />
      {cartItems.length === 0 ? (
        <div className="cart__empty-message">Your cart is empty.</div>
      ) : (
        <div className="cart__items">
          {cartItems.map((cartItem: ICartItem) => {
            return (
              <Fragment key={cartItem.id}>
                <div>
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      defaultChecked={cartItem.selected}
                      onChange={() =>
                        updateCartItemCount(cartItem.id, {
                          selected: !cartItem.selected,
                        })
                      }
                    />
                    <span className="checkmark"></span>
                  </label>
                </div>
                <div className="cart__column-image">
                  <img
                    alt={cartItem.name}
                    src={cartItem.imageUrl}
                    onClick={() =>
                      openFancyBox(cartItem.imageUrl, cartItem.desc)
                    }
                  />
                </div>
                <div className="cart__column-name">{cartItem.name}</div>
                <div className="cart__column-quantity">
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    max="9"
                    maxLength={1}
                    value={cartItem.quantity}
                    onChange={(event) =>
                      updateCartItemCount(cartItem.id, {
                        quantity: +event.target.value,
                      })
                    }
                  />
                </div>
                <div>{cartItem.price * cartItem.quantity}&nbsp;USD</div>
              </Fragment>
            );
          })}
        </div>
      )}

      <div className="cart__buttons">
        <div>
          <Link to="/order">
            <input
              className="normalButton"
              type="button"
              value="Buy"
              disabled={selectedCartItems.size === 0}
            />
          </Link>
        </div>
        <div>
          <input
            className="normalButton"
            type="button"
            value="Delete"
            onClick={() => removeCartItems(selectedCartItems)}
            disabled={selectedCartItems.size === 0}
          />
        </div>
      </div>
    </section>
  );
};
