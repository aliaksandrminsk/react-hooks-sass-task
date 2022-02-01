import React, { useContext } from "react";
import { OrderContext } from "../../context/order/orderContext";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cart/cartContext";

interface IServerData {
  location: string;
  name: string;
  email: string;
  phone: string;
  card: string;
}

export const ResultOrder: React.FC = () => {
  const { userInfo, userCard, userLocation } = useContext(OrderContext);

  const { cartItems, removeCartItems } = useContext(CartContext);
  let navigate = useNavigate();

  let dataForServer = null;
  if (userLocation && userInfo && userCard) {
    dataForServer = {
      location: userLocation?.location,
      name: userInfo?.name,
      email: userInfo?.email,
      phone: userInfo?.phone,
      card: userCard?.card,
    };
  }

  const onClickHandler = () => {
    const keys = new Array<string>();
    for (const item of cartItems) {
      if (item.selected) keys.push(item.id);
    }
    removeCartItems(keys);
    navigate(`/`);
  };

  return (
    <section className="resultOrder">
      <h1 className="resultOrder__title">Order is made</h1>
      {dataForServer ? (
        <div className="resultOrder__data">
          {"Data was sent to server:" +
            JSON.stringify(dataForServer, undefined, 2)}
        </div>
      ) : null}

      <div className="resultOrder__button">
        <button type="submit" onClick={onClickHandler}>
          Back
        </button>
      </div>
    </section>
  );
};