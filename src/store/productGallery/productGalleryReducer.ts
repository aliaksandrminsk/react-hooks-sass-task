import { ActionType } from "../types";
import { IProduct } from "./IProduct";

export interface IState {
  products: Array<IProduct>;
  filteredProducts: Array<IProduct>;
  pagesNumber: number;
  activePage: number;
  loading: boolean;
  filter: string;
}

type GetProductsAction = {
  type: ActionType.GET_PRODUCTS;
  products: Array<IProduct>;
  filteredProducts: Array<IProduct>;
  pagesNumber: number;
  activePage: number;
};

type SetActivePageAction = {
  type: ActionType.SET_ACTIVE_PAGE;
  pagesNumber: number;
  activePage: number;
};

type SetFilterAction = {
  type: ActionType.SET_FILTER;
  filteredProducts: Array<IProduct>;
  pagesNumber: number;
  filter: string;
};

type SetLoadingAction = {
  type: ActionType.SET_LOADING;
};

type Action =
  | GetProductsAction
  | SetActivePageAction
  | SetLoadingAction
  | SetFilterAction;

const handlers = {
  [ActionType.GET_PRODUCTS]: (state: IState, action: Action) => ({
    ...state,
    products: (action as GetProductsAction).products,
    filteredProducts: (action as GetProductsAction).filteredProducts,
    pagesNumber: (action as GetProductsAction).pagesNumber,
    activePage: (action as GetProductsAction).activePage,
    loading: false,
  }),
  [ActionType.SET_ACTIVE_PAGE]: (state: IState, action: Action): IState => ({
    ...state,
    activePage: (action as SetActivePageAction).activePage,
    pagesNumber: (action as SetActivePageAction).pagesNumber,
  }),
  [ActionType.SET_FILTER]: (state: IState, action: Action): IState => ({
    ...state,
    filteredProducts: (action as SetFilterAction).filteredProducts,
    filter: (action as SetFilterAction).filter,
    pagesNumber: (action as SetFilterAction).pagesNumber,
    activePage: 0,
  }),
  [ActionType.SET_LOADING]: (state: IState, action: Action): IState => ({
    ...state,
    loading: true,
  }),
  DEFAULT: (state: IState) => state,
};

export const productGalleryReducer = (
  state: IState,
  action: Action
): IState => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
