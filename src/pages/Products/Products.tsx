import React, {
  useContext,
  useEffect,
  Fragment,
  useState,
  useRef,
  useMemo,
} from "react";

import { useParams } from "react-router-dom";

import { PhotoViewerContainer } from "./PhotoViewerContainer";
import { ProductGalleryContext } from "../../store/productGallery/productGalleryContext";
import { Search } from "../../components/Search";
import { PagesNav } from "../../components/PagesNav";
import { IProduct } from "../../store/productGallery/IProduct";
import ErrorPage from "../ErrorPage/ErrorPage";

export const Products = () => {
  const SCREEN_SIZE_MOBILE_L = 425;
  const filterOpenBtnRef = useRef<HTMLButtonElement>(null);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [isOpenFilter, setFilterState] = useState<boolean>(false);

  let params = useParams();
  const category = params.id;

  const {
    products,
    pagesNumber,
    isProductJsonLoaded,
    getProducts,
    setActivePage,
    setFilter,
  } = useContext(ProductGalleryContext);

  const isValidateURL = useMemo(() => {
    let arr = [];
    if (category != null && products != null) {
      arr = products.filter(function (product: IProduct) {
        return product.category === category;
      });
    }
    return arr.length > 0;
  }, [category, products]);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", changeWindowSize);

    if (!isProductJsonLoaded) {
      getProducts();
    } else {
      setFilter({ categoryFilter: category });
    }

    return function cleanupListener() {
      window.removeEventListener("resize", changeWindowSize);
    };
  }, [products, category]);

  if (!isProductJsonLoaded) {
    return <p className="text-center">Loading...</p>;
  } else {
    if (!isValidateURL) {
      return <ErrorPage />;
    }
  }

  const changeWindowSize = () => {
    setWindowWidth(window.innerWidth);
  };

  const clickFilterButton = () => {
    if (filterOpenBtnRef == null || filterOpenBtnRef.current == null) return;

    if (isOpenFilter) {
      setFilterState(false);
      filterOpenBtnRef.current.textContent = "+";
      filterOpenBtnRef.current.title = "Open filter";
    } else {
      setFilterState(true);
      filterOpenBtnRef.current.textContent = "-";
      filterOpenBtnRef.current.title = "Hide filter";
    }
  };

  return (
    <Fragment>
      <button
        className="products__filterOpenBtn"
        title="Open filter"
        onClick={clickFilterButton}
        type="button"
        ref={filterOpenBtnRef}
      >
        +
      </button>

      <section className="products">
        <Search
          showFilter={isOpenFilter || windowWidth >= SCREEN_SIZE_MOBILE_L}
        />

        <h1 className="products__title">Shops</h1>
        <hr className="products__hr" />

        {pagesNumber > 1 ? (
          <PagesNav
            setFilterFunc={(pageIndex) => setActivePage(pageIndex)}
            context={ProductGalleryContext}
          />
        ) : null}

        <PhotoViewerContainer />

        {pagesNumber > 1 ? (
          <PagesNav
            setFilterFunc={(pageIndex) => setActivePage(pageIndex)}
            context={ProductGalleryContext}
          />
        ) : null}
      </section>
    </Fragment>
  );
};
