import { ActionType } from "../types";
import { IProduct } from "./interfaces/IProduct";

export interface IProductState {
  products: Array<IProduct>;
  filteredProducts: Array<IProduct>;
  pagesNumber: number;
  activePage: number;
  isProductJsonLoaded: boolean;
  categoryFilter: string;
  nameFilter: string;
}

type GetProductsAction = {
  type: ActionType.GET_PRODUCTS;
  products: Array<IProduct>;
  filteredProducts: Array<IProduct>;
  pagesNumber: number;
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
  categoryFilter: string;
  nameFilter: string;
};

type Action = GetProductsAction | SetActivePageAction | SetFilterAction;

const handlers = {
  [ActionType.GET_PRODUCTS]: (state: IProductState, action: Action) => ({
    ...state,
    products: (action as GetProductsAction).products,
    filteredProducts: (action as GetProductsAction).filteredProducts,
    pagesNumber: (action as GetProductsAction).pagesNumber,
    activePage: 0,
    isProductJsonLoaded: true,
  }),
  [ActionType.SET_ACTIVE_PAGE]: (
    state: IProductState,
    action: Action
  ): IProductState => ({
    ...state,
    activePage: (action as SetActivePageAction).activePage,
    pagesNumber: (action as SetActivePageAction).pagesNumber,
  }),
  [ActionType.SET_FILTER]: (
    state: IProductState,
    action: Action
  ): IProductState => ({
    ...state,
    filteredProducts: (action as SetFilterAction).filteredProducts,
    nameFilter: (action as SetFilterAction).nameFilter,
    categoryFilter: (action as SetFilterAction).categoryFilter,
    pagesNumber: (action as SetFilterAction).pagesNumber,
    activePage: 0,
  }),
  DEFAULT: (state: IProductState) => state,
};

export const productReducer = (
  state: IProductState,
  action: Action
): IProductState => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
