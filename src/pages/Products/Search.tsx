import React, { useContext, useState } from "react";
import { ProductContext } from "../../context/product/productContext";

export const Search: React.FC<{ showFilter: boolean }> = (props) => {
  const [value, setValue] = useState<string>("");
  const { setFilter } = useContext(ProductContext);

  const onSubmit = (event: React.KeyboardEvent): void => {
    if (event.key !== "Enter") {
      return;
    }
    setFilterData();
  };

  const filterClasses = ["filter"];
  if (!props.showFilter) {
    filterClasses.push("filter_invisible");
  }

  const setFilterData = () => {
    setFilter({ nameFilter: value.trim() });
  };

  return (
    <div className={filterClasses.join(" ")}>
      <input
        type="text"
        className="filter__input"
        placeholder="Enter a name of the product..."
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setValue(event.target.value)
        }
        onKeyPress={onSubmit}
      />

      <input
        type="button"
        onClick={setFilterData}
        className="filter__button"
        value="Search"
      />
    </div>
  );
};
