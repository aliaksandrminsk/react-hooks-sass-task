import { ActionType } from "../types";
import { IUserInfo } from "./interfaces/IUserInfo";
import { IUserLocation } from "./interfaces/IUserLocation";
import { IUserCard } from "./interfaces/IUserCard";

export interface IOrderState {
  userInfo: IUserInfo | null;
  userCard: IUserCard | null;
  userLocation: IUserLocation | null;
}

type SetUserInfoAction = {
  type: ActionType.SET_USER_INFO;
  userInfo: IUserInfo;
};

type SetUserCardAction = {
  type: ActionType.SET_USER_CARD;
  userCard: IUserCard;
};

type SetUserLocationAction = {
  type: ActionType.SET_USER_LOCATION;
  userLocation: IUserLocation;
};

type DeleteOrderAction = {
  type: ActionType.DELETE_ORDER;
};

type Action =
  | SetUserInfoAction
  | SetUserCardAction
  | SetUserLocationAction
  | DeleteOrderAction;

const handlers = {
  [ActionType.SET_USER_INFO]: (state: IOrderState, action: Action) => ({
    ...state,
    userInfo: (action as SetUserInfoAction).userInfo,
  }),
  [ActionType.SET_USER_CARD]: (state: IOrderState, action: Action) => ({
    ...state,
    userCard: (action as SetUserCardAction).userCard,
  }),
  [ActionType.SET_USER_LOCATION]: (state: IOrderState, action: Action) => ({
    ...state,
    userLocation: (action as SetUserLocationAction).userLocation,
  }),
  [ActionType.DELETE_ORDER]: (state: IOrderState) => ({
    ...state,
    userLocation: null,
    userCard: null,
    userInfo: null,
  }),
  DEFAULT: (state: IOrderState) => state,
};

export const orderReducer = (
  state: IOrderState,
  action: Action
): IOrderState => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
