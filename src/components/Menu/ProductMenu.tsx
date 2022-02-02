import { NavLink } from "react-router-dom";
import React from "react";

export const ProductMenu: React.FC = () => (
  <div className="productMenu">
    <nav className="productMenu__menu">
      <NavLink to="/categories/washer" className="productMenu__menu-item">
        {({ isActive }) => (
          <span
            className={isActive ? " productMenu__menu-item_active" : undefined}
          >
            Washers
          </span>
        )}
      </NavLink>
      <NavLink to="/categories/bike" className="productMenu__menu-item">
        {({ isActive }) => (
          <span
            className={isActive ? " productMenu__menu-item_active" : undefined}
          >
            Bikes
          </span>
        )}
      </NavLink>

      <NavLink to="/categories/phone" className="productMenu__menu-item">
        {({ isActive }) => (
          <span
            className={isActive ? " productMenu__menu-item_active" : undefined}
          >
            Phones
          </span>
        )}
      </NavLink>
      <NavLink to="/categories/laptop" className="productMenu__menu-item">
        {({ isActive }) => (
          <span
            className={isActive ? " productMenu__menu-item_active" : undefined}
          >
            Laptops
          </span>
        )}
      </NavLink>
      <NavLink to="/categories/book" className="productMenu__menu-item">
        {({ isActive }) => (
          <span
            className={isActive ? " productMenu__menu-item_active" : undefined}
          >
            Books
          </span>
        )}
      </NavLink>
    </nav>
  </div>
);
