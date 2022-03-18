import React, { useContext, useEffect } from "react";
import { OrderContext } from "../../context/order/orderContext";
import { CartContext } from "../../context/cart/cartContext";
import { useNavigate } from "react-router-dom";
import { LoadingOrder } from "./LoadingOrder";

const InfoOrder = React.lazy(() => import("./InfoOrder"));
const CardOrder = React.lazy(() => import("./CardOrder"));
const LocationOrder = React.lazy(() => import("./LocationOrder"));
const ResultOrder = React.lazy(() => import("./ResultOrder"));

export const Order: React.FC = () => {
  const { userInfo, userCard, userLocation, deleteOrder } =
    useContext(OrderContext);

  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const keys = [];
    for (const item of cartItems) {
      if (item.selected) keys.push(item.id);
    }
    //If order is empty then move to cart page
    if (keys.length === 0) {
      navigate(`/cart`);
    }
    return deleteOrder; //Delete all information from order state if we leave order page.
  }, []);

  let container;
  if (userInfo == null) {
    container = <InfoOrder />; //Showing an order panel (step 1).
  } else if (userCard == null) {
    container = <CardOrder />; //Showing an order panel (step 2).
  } else if (userLocation == null) {
    container = <LocationOrder />; //Showing an order panel (step 3).
  } else {
    container = <ResultOrder />; //Showing result of order
  }
  return (
    <React.Suspense fallback={<LoadingOrder />}>{container}</React.Suspense>
  );
};
