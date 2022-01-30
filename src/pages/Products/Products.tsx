import React, {
  useContext,
  useEffect,
  Fragment,
  useState,
  useRef,
} from "react";

import { useParams } from "react-router-dom";

import { PhotoViewerContainer } from "./PhotoViewerContainer";
import { ProductGalleryContext } from "../../store/productGallery/productGalleryContext";
import { Search } from "../../components/Search";
import { PagesNav } from "../../components/PagesNav";

export const Products = () => {
  const SCREEN_SIZE_MOBILE_L = 425;
  const filterOpenBtnRef = useRef<HTMLButtonElement>(null);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [isOpenFilter, setFilterState] = useState<boolean>(false);

  let params = useParams();
  const category = params.id;

  const {
    filteredProducts,
    products,
    activePage,
    pagesNumber,
    loading,
    getProducts,
    setActivePage,
    setFilter,
    nameFilter,
  } = useContext(ProductGalleryContext);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", changeWindowSize);

    if (products.length === 0) {
      getProducts();
    } else {
      setFilter({ categoryFilter: category });
    }

    return function cleanupListener() {
      window.removeEventListener("resize", changeWindowSize);
    };
  }, [products, category]);

  const changeWindowSize = () => {
    setWindowWidth(window.innerWidth);
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

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
          <Fragment>
            <PagesNav
              setFilterFunc={(pageIndex) => setActivePage(pageIndex)}
              context={ProductGalleryContext}
            />
          </Fragment>
        ) : null}

        <div className="products__items">
          <PhotoViewerContainer />
        </div>

        {pagesNumber > 1 ? (
          <Fragment>
            <PagesNav
              setFilterFunc={(pageIndex) => setActivePage(pageIndex)}
              context={ProductGalleryContext}
            />
          </Fragment>
        ) : null}
      </section>
    </Fragment>
  );
};
