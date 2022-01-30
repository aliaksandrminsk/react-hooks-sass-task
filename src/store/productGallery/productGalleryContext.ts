import { createContext } from "react";
import { IProduct } from "./IProduct";
import { IFilter } from "./IFilter";

interface IProductContext {
  isProductJsonLoaded: boolean;
  products: Array<IProduct>;
  filteredProducts: Array<IProduct>;
  nameFilter: string;
  pagesNumber: number;
  activePage: number;
  getProducts: () => void;
  getDescription: (productId: string) => string;
  setActivePage: (activePage: number) => void;
  setFilter: (filter: IFilter) => void;
}

export const ProductGalleryContext = createContext({} as IProductContext);
