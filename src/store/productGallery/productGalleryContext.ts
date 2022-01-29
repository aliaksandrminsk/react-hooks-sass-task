import { createContext } from "react";
import { IProduct } from "./IProduct";

interface IProductGalleryContext {
  loading: boolean;
  filter: string;
  products: Array<IProduct>;
  filteredProducts: Array<IProduct>;
  pagesNumber: number;
  activePage: number;
  getProducts: () => void;
  getDescription: (productId: string) => string;
  setActivePage: (activePage: number) => void;
  setLoading: () => void;
  setFilter: (filter: string) => void;
}

export const ProductGalleryContext = createContext<IProductGalleryContext>({
  loading: false,
  filter: "",
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
