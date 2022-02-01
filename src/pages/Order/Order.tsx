import React, { useContext } from "react";

import { OrderContext } from "../../context/order/orderContext";
import { InfoOrder } from "./InfoOrder";
import { LocationOrder } from "./LocationOrder";
import { CardOrder } from "./CardOrder";
import { ResultOrder } from "./ResultOrder";

export const Order = () => {
  const { userInfo, userCard, userLocation } = useContext(OrderContext);

  let orderContainer = null;

  if (userInfo == null) {
    orderContainer = <InfoOrder />;
  } else if (userCard == null) {
    orderContainer = <CardOrder />;
  } else if (userLocation == null) {
    orderContainer = <LocationOrder />;
  } else {
    orderContainer = <ResultOrder />;
  }

  return orderContainer;
};
