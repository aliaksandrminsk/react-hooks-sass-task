import React, { useReducer } from "react";
import { ProductContext } from "./productContext";
import { IProductState, productReducer } from "./productReducer";
import { productConstants } from "./constants";
import { ActionType } from "../types";
import axios from "axios";
import { IProduct } from "./interfaces/IProduct";
import { IFilter } from "./interfaces/IFilter";

export const ProductState: React.FC = ({ children }) => {
  const initialState: IProductState = {
    products: [],
    filteredProducts: [],
    pagesNumber: 1,
    activePage: 0,
    isProductJsonLoaded: false,
    nameFilter: "",
    categoryFilter: "",
  };

  const [state, dispatch] = useReducer(productReducer, initialState);

  const getProducts = async () => {
    const response = await axios.get("/products/products.json");
    const products = response.data;

    const pagesNumber = Math.ceil(
      products.length / productConstants.SIZE_PRODUCT_PAGE
    );

    dispatch({
      type: ActionType.GET_PRODUCTS,
      products,
      filteredProducts: products,
      pagesNumber,
    });
  };

  const setFilter = (filter: IFilter) => {
    let filteredProducts;
    let category: string;
    let name: string;

    if (filter.categoryFilter != null) {
      category = filter.categoryFilter;
    } else {
      category = categoryFilter;
    }
    filteredProducts = products.filter(function (product: IProduct) {
      return product.category === category;
    });

    if (filter.nameFilter != null) {
      name = filter.nameFilter;
    } else {
      name = nameFilter;
    }
    if (name.length > 0) {
      filteredProducts = filteredProducts.filter(function (product: IProduct) {
        return product.name.toLowerCase().indexOf(name.toLowerCase()) > -1;
      });
    }

    const pagesNumber = Math.ceil(
      filteredProducts.length / productConstants.SIZE_PRODUCT_PAGE
    );

    dispatch({
      type: ActionType.SET_FILTER,
      filteredProducts,
      nameFilter: name,
      categoryFilter: category,
      pagesNumber,
    });
  };

  const setActivePage = (activePage: number) => {
    const pagesNumber = Math.ceil(
      filteredProducts.length / productConstants.SIZE_PRODUCT_PAGE
    );

    if (activePage >= pagesNumber) {
      activePage = 0;
    }

    dispatch({
      type: ActionType.SET_ACTIVE_PAGE,
      activePage,
      pagesNumber,
    });
  };

  const {
    products,
    filteredProducts,
    activePage,
    pagesNumber,
    isProductJsonLoaded,
    nameFilter,
    categoryFilter,
  } = state;

  return (
    <ProductContext.Provider
      value={{
        getProducts,
        setActivePage,
        setFilter,
        products,
        filteredProducts,
        activePage,
        pagesNumber,
        isProductJsonLoaded,
        nameFilter,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
