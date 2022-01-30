import { createContext } from "react";
import { IProduct } from "./interfaces/IProduct";
import { IFilter } from "./interfaces/IFilter";

interface IProductContext {
  isProductJsonLoaded: boolean;
  products: Array<IProduct>;
  filteredProducts: Array<IProduct>;
  nameFilter: string;
  pagesNumber: number;
  activePage: number;
  getProducts: () => void;
  setActivePage: (activePage: number) => void;
  setFilter: (filter: IFilter) => void;
}

export const ProductContext = createContext({} as IProductContext);
