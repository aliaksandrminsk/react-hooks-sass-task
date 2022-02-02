import React from "react";
import { NavLink } from "react-router-dom";

export const ControlMenu: React.FC = () => {
  return (
    <div className="controlMenu">
      <div>
        <div className="controlMenu__title">Local shop</div>
      </div>
      <div>&nbsp;</div>

      <div>
        <NavLink to="/about" className="controlMenu__menu-item">
          {({ isActive }) => (
            <span
              className={
                isActive ? " controlMenu__menu-item_active" : undefined
              }
            >
              About&nbsp;Us
            </span>
          )}
        </NavLink>
      </div>

      <div>
        <NavLink to="/cart" className="controlMenu__menu-item">
          {({ isActive }) => (
            <span
              className={
                isActive ? " controlMenu__menu-item_active" : undefined
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
