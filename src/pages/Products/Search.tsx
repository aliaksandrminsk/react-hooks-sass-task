import React, { useContext } from "react";
import { ProductContext } from "../../context/product/productContext";

export const Search: React.FC<{ showFilter: boolean }> = (props) => {
  const { nameFilter, setFilter } = useContext(ProductContext);

  const filterClasses = ["filter"];
  if (!props.showFilter) {
    filterClasses.push("filter_invisible");
  }

  return (
    <div className={filterClasses.join(" ")}>
      <input
        type="text"
        className="filter__input"
        placeholder="Enter a name of the product..."
        value={nameFilter}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setFilter({ nameFilter: event.target.value })
        }
      />
    </div>
  );
};
