import React, { useReducer } from "react";
import { ProductGalleryContext } from "./productGalleryContext";
import { IState, productGalleryReducer } from "./productGalleryReducer";
import { productGalleryConstants } from "./constants";
import { ActionType } from "../types";
import axios from "axios";
import { IProduct } from "./IProduct";

export const ProductGalleryState: React.FC = ({ children }) => {
  const initialState: IState = {
    products: [],
    filteredProducts: [],
    pagesNumber: 1,
    activePage: 0,
    loading: false,
    filter: "",
  };

  const [state, dispatch] = useReducer(productGalleryReducer, initialState);

  const getProducts = async () => {
    setLoading();

    const response = await axios.get("/products.json");

    const products = response.data;
    const pagesNumber = Math.ceil(
      products.length / productGalleryConstants.SIZE_PRODUCT_PAGE
    );

    dispatch({
      type: ActionType.GET_PRODUCTS,
      products,
      filteredProducts: products,
      pagesNumber,
      activePage: 0,
    });
  };

  const setActivePage = (activePage: number) => {
    const pagesNumber = Math.ceil(
      filteredProducts.length / productGalleryConstants.SIZE_PRODUCT_PAGE
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

  const setFilter = (filter: string) => {
    let filteredProducts;
    if (filter.trim().length > 0) {
      filteredProducts = products.filter(function (product: IProduct) {
        return (
          product.shortDesc.toLowerCase().indexOf(filter.toLowerCase()) > -1
        );
      });
    } else {
      filteredProducts = products;
    }

    const pagesNumber = Math.ceil(
      filteredProducts.length / productGalleryConstants.SIZE_PRODUCT_PAGE
    );

    dispatch({
      type: ActionType.SET_FILTER,
      filteredProducts,
      filter,
      pagesNumber,
    });
  };

  const getDescription = (productId: string) => {
    for (const item of products) {
      if (productId === item.id) {
        return item.desc;
      }
    }
    return "";
  };

  const setLoading = () => dispatch({ type: ActionType.SET_LOADING });

  const {
    products,
    filteredProducts,
    activePage,
    pagesNumber,
    loading,
    filter,
  } = state;

  return (
    <ProductGalleryContext.Provider
      value={{
        getProducts,
        setActivePage,
        setFilter,
        getDescription,
        setLoading,
        products,
        filteredProducts,
        activePage,
        pagesNumber,
        loading,
        filter,
      }}
    >
      {children}
    </ProductGalleryContext.Provider>
  );
};
