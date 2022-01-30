import React from "react";
import { NavLink } from "react-router-dom";

export const ControlMenu: React.FC = () => {
  return (
    <div className="controlPanel">
      <div>
        <div className="controlPanel__title">Local shop</div>
      </div>
      <div>&nbsp;</div>

      <div>
        <NavLink to="/aboutus" className="controlPanel__menu-item">
          {({ isActive }) => (
            <span
              className={
                isActive ? " controlPanel__menu-item_active" : undefined
              }
            >
              About&nbsp;Us
            </span>
          )}
        </NavLink>
      </div>

      <div>
        <NavLink to="/cart" className="controlPanel__menu-item">
          {({ isActive }) => (
            <span
              className={
                isActive ? " controlPanel__menu-item_active" : undefined
              }
            >
              Cart
            </span>
          )}
        </NavLink>
      </div>
    </div>
  );
};
