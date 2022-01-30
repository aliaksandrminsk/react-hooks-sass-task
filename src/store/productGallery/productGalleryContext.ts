import { createContext } from "react";
import { IProduct } from "./IProduct";
import { IFilter } from "./IFilter";

interface IProductGalleryContext {
  loading: boolean;
  nameFilter: string;
  categoryFilter: string;
  products: Array<IProduct>;
  filteredProducts: Array<IProduct>;
  pagesNumber: number;
  activePage: number;
  getProducts: () => void;
  getDescription: (productId: string) => string;
  setActivePage: (activePage: number) => void;
  setLoading: () => void;
  setFilter: (filter: IFilter) => void;
}

export const ProductGalleryContext = createContext<IProductGalleryContext>({
  loading: false,
  nameFilter: "",
  categoryFilter: "",
  products: [],
  filteredProducts: [],
  pagesNumber: 0,
  activePage: 0,
  getProducts: () => {},
  getDescription: () => "",
  setActivePage: () => {},
  setLoading: () => {},
  setFilter: () => {},
});
