import React, { useContext, useEffect } from "react";
import { OrderContext } from "../../context/order/orderContext";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cart/cartContext";

export const ResultOrder: React.FC = () => {
  const { userInfo, userCard, userLocation } = useContext(OrderContext);

  const { cartItems, removeCartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const dataForServer = {
    location: userLocation?.location,
    name: userInfo?.name,
    email: userInfo?.email,
    phone: userInfo?.phone,
    card: userCard?.card,
  };

  useEffect(() => {
    const keys = new Array<string>();
    for (const item of cartItems) {
      if (item.selected) keys.push(item.id);
    }
    removeCartItems(keys);
  }, []);

  const onClickHandler = () => {
    navigate(`/`);
  };

  return (
    <section className="resultOrder">
      <h1 className="resultOrder__title">
        Thank you for shopping with us. We’ll send a confirmation when your
        items ship.
      </h1>
      {dataForServer ? (
        <div className="resultOrder__data">
          {"Data was sent to server:" +
            JSON.stringify(dataForServer, undefined, 2)}
        </div>
      ) : null}

      <div>
        <button type="submit" onClick={onClickHandler} className="normalButton">
          Back to shop
        </button>
      </div>
    </section>
  );
};
