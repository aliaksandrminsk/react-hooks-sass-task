import { NavLink } from "react-router-dom";
import React from "react";

export const ProductMenu: React.FC = () => (
  <div className="productPanel">
    <nav className="productPanel__menu">
      <NavLink to="/categories/washer" className="productPanel__menu-item">
        {({ isActive }) => (
          <span
            className={isActive ? " productPanel__menu-item_active" : undefined}
          >
            Washers
          </span>
        )}
      </NavLink>
      <NavLink to="/categories/bike" className="productPanel__menu-item">
        {({ isActive }) => (
          <span
            className={isActive ? " productPanel__menu-item_active" : undefined}
          >
            Bikes
          </span>
        )}
      </NavLink>

      <NavLink to="/categories/phone" className="productPanel__menu-item">
        {({ isActive }) => (
          <span
            className={isActive ? " productPanel__menu-item_active" : undefined}
          >
            Phones
          </span>
        )}
      </NavLink>
      <NavLink to="/categories/laptop" className="productPanel__menu-item">
        {({ isActive }) => (
          <span
            className={isActive ? " productPanel__menu-item_active" : undefined}
          >
            Laptops
          </span>
        )}
      </NavLink>
      <NavLink to="/categories/book" className="productPanel__menu-item">
        {({ isActive }) => (
          <span
            className={isActive ? " productPanel__menu-item_active" : undefined}
          >
            Books
          </span>
        )}
      </NavLink>
    </nav>
  </div>
);
