import React, { Context, useContext } from "react";

interface IPageNavContext {
  pagesNumber: number;
  activePage: number;
}

interface IPagesNavProps<T> {
  setFilterFunc(pageIndex: number): void;
  context: Context<T>;
}

export const PagesNav = <T extends IPageNavContext>({
  setFilterFunc,
  context,
}: IPagesNavProps<T>) => {
  const { pagesNumber, activePage } = useContext(context);

  if (pagesNumber <= 1) {
    return null;
  }

  return (
    <div className="pagesNav">
      {new Array(pagesNumber).fill("").map((_, index) => {
        if (index === activePage) {
          return (
            <span key={"page" + index} className="pagesNav__link-active">
              {index + 1}
            </span>
          );
        } else {
          return (
            <button
              onClick={() => setFilterFunc(index)}
              key={"page" + index}
              className="pagesNav__link-passive"
            >
              {index + 1}
            </button>
          );
        }
      })}
    </div>
  );
};
