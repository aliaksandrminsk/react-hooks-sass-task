import React, { useReducer } from "react";
import { IOrderState, orderReducer } from "./orderReducer";
import { OrderContext } from "./orderContext";
import { IUserInfo } from "./interfaces/IUserInfo";
import { ActionType } from "../types";
import { IUserCard } from "./interfaces/IUserCard";
import { IUserLocation } from "./interfaces/IUserLocation";

export const OrderState: React.FC = ({ children }) => {
  const initialState: IOrderState = {
    userInfo: null,
    userCard: null,
    userLocation: null,
  };

  const [state, dispatch] = useReducer(orderReducer, initialState);

  const setUserInfo = (userInfo: IUserInfo) => {
    dispatch({
      type: ActionType.SET_USER_INFO,
      userInfo,
    });
  };

  const setUserCard = (userCard: IUserCard) => {
    dispatch({
      type: ActionType.SET_USER_CARD,
      userCard,
    });
  };

  const setUserLocation = (userLocation: IUserLocation) => {
    dispatch({
      type: ActionType.SET_USER_LOCATION,
      userLocation,
    });
  };

  const deleteOrder = () => {
    dispatch({
      type: ActionType.DELETE_ORDER,
    });
  };

  const { userInfo, userCard, userLocation } = state;

  return (
    <OrderContext.Provider
      value={{
        userInfo,
        userCard,
        userLocation,
        setUserInfo,
        setUserCard,
        setUserLocation,
        deleteOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
