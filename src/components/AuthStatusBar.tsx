import React from "react";
import { NavLink } from "react-router-dom";

export const AuthStatusBar: React.FC = () => {
  return (
    <div className="authPanel">
      <div>
        <div className="authPanel__title">Local shop</div>
      </div>
      <div>&nbsp;</div>

      <div>
        <NavLink to="/aboutus" className="authPanel__menu-item">
          {({ isActive }) => (
            <span
              className={isActive ? " authPanel__menu-item_active" : undefined}
            >
              About&nbsp;Us
            </span>
          )}
        </NavLink>
      </div>

      <div>
        <NavLink to="/cart" className="authPanel__menu-item">
          {({ isActive }) => (
            <span
              className={isActive ? " authPanel__menu-item_active" : undefined}
            >
              Cart
            </span>
          )}
        </NavLink>
      </div>
    </div>
  );
};
