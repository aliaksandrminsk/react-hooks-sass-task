import React, { ForwardRefRenderFunction } from "react";

type Props = {
  onClick: () => void;
};

export type Ref = HTMLButtonElement;

const FilterButton: ForwardRefRenderFunction<Ref, Props> = (props, ref) => {
  return (
    <button
      className="filterOpenBtn"
      title="Open filter"
      onClick={props.onClick}
      type="button"
      ref={ref}
    >
      +
    </button>
  );
};

export default React.forwardRef<Ref, Props>(FilterButton);
