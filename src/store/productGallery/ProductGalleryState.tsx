import React, { useReducer } from "react";
import { ProductGalleryContext } from "./productGalleryContext";
import { IProductState, productGalleryReducer } from "./productGalleryReducer";
import { productGalleryConstants } from "./constants";
import { ActionType } from "../types";
import axios from "axios";
import { IProduct } from "./IProduct";
import { IFilter } from "./IFilter";

export const ProductGalleryState: React.FC = ({ children }) => {
  const initialState: IProductState = {
    products: [],
    filteredProducts: [],
    pagesNumber: 1,
    activePage: 0,
    loading: false,
    nameFilter: "",
    categoryFilter: "",
  };

  const [state, dispatch] = useReducer(productGalleryReducer, initialState);

  const getProducts = async () => {
    setLoading();

    const response = await axios.get("/products/products.json");
    const products = response.data;

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
      filteredProducts.length / productGalleryConstants.SIZE_PRODUCT_PAGE
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
    nameFilter,
    categoryFilter,
  } = state;

  return (
    <ProductGalleryContext.Provider
      value={{
        getProducts,
        setActivePage,
        setFilter,
        getDescription,
        products,
        filteredProducts,
        activePage,
        pagesNumber,
        loading,
        nameFilter,
      }}
    >
      {children}
    </ProductGalleryContext.Provider>
  );
};
