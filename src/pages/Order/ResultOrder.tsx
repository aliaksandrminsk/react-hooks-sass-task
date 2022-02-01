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
  const { userInfo, userCard, userLocation, deleteOrder } =
    useContext(OrderContext);

  const { removeCartItems } = useContext(CartContext);
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

  //React.useEffect(() => {
  //******Sent data to Server***************************
  // let dataForServer: IServerData;
  // if (userLocation && userInfo && userCard) {
  //   dataForServer = {
  //     location: userLocation?.location,
  //     name: userInfo?.name,
  //     email: userInfo?.email,
  //     phone: userInfo?.phone,
  //     card: userCard?.card,
  //   };
  // alert(
  //   "Data was sent to server:" + JSON.stringify(dataForServer, undefined, 2)
  // );
  //}
  //});

  const onClickHandler = () => {
    deleteOrder();
    //removeCartItems(); Зрабиць метад ачысткі пасля заказа!!!!!!!!!!!!!!
    navigate(`/`);
  };

  return (
    <section className="resultOrder">
      <h1 className="resultOrder__title">Order is made</h1>
      {dataForServer ? (
        <div>
          {"Data was sent to server:" +
            JSON.stringify(dataForServer, undefined, 2)}
        </div>
      ) : null}

      <button type="submit" onClick={onClickHandler}>
        Back
      </button>
    </section>
  );
};
