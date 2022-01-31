import React, { ReactElement, useContext } from "react";

import { OrderContext } from "../../context/order/orderContext";
import { InfoOrder } from "./InfoOrder";
import { MapOrder } from "./MapOrder";
import { CardOrder } from "./CardOrder";

export const Order = () => {
  const { userInfo, userCard, userLocation } = useContext(OrderContext);

  let orderContainer = null;

  if (userInfo == null) {
    orderContainer = <InfoOrder />;
  } else if (userCard == null) {
    orderContainer = <CardOrder />;
  } else if (userLocation == null) {
    orderContainer = <MapOrder />;
  } else {
    console.log("Order is made!");
  }

  return (
    <section className="order">
      <h1 className="order__title">Order</h1>
      {orderContainer}
    </section>
  );
};
