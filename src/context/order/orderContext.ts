import { createContext } from "react";
import { IUserInfo } from "./interfaces/IUserInfo";
import { IUserCard } from "./interfaces/IUserCard";
import { IUserLocation } from "./interfaces/IUserLocation";

interface IOrderContext {
  userInfo: IUserInfo | null;
  userCard: IUserCard | null;
  userLocation: IUserLocation | null;
  setUserInfo: (userInfo: IUserInfo) => void;
  setUserCard: (userCard: IUserCard) => void;
  setUserLocation: (userLocation: IUserLocation) => void;
}
export const OrderContext = createContext({} as IOrderContext);
