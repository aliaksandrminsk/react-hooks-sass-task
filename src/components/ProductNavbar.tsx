import { NavLink } from "react-router-dom";
import React from "react";

export const ProductNavbar: React.FC = () => (
  <div className="menuPanel">
    <nav className="menuPanel__menu">
      <NavLink to="/categories/clothes" className="menuPanel__menu-item">
        {({ isActive }) => (
          <span
            className={isActive ? " menuPanel__menu-item_active" : undefined}
          >
            Clothes
          </span>
        )}
      </NavLink>
      <NavLink to="/categories/bike" className="menuPanel__menu-item">
        {({ isActive }) => (
          <span
            className={isActive ? " menuPanel__menu-item_active" : undefined}
          >
            Bikes
          </span>
        )}
      </NavLink>

      <NavLink to="/categories/phone" className="menuPanel__menu-item">
        {({ isActive }) => (
          <span
            className={isActive ? " menuPanel__menu-item_active" : undefined}
          >
            Phones
          </span>
        )}
      </NavLink>
      <NavLink to="/categories/laptop" className="menuPanel__menu-item">
        {({ isActive }) => (
          <span
            className={isActive ? " menuPanel__menu-item_active" : undefined}
          >
            Laptops
          </span>
        )}
      </NavLink>
      <NavLink to="/categories/book" className="menuPanel__menu-item">
        {({ isActive }) => (
          <span
            className={isActive ? " menuPanel__menu-item_active" : undefined}
          >
            Books
          </span>
        )}
      </NavLink>
    </nav>
  </div>
);
