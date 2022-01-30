import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Products } from "./pages/Products/Products";
import { ProductMenu } from "./components/Menu/ProductMenu";
import { ProductState } from "./context/product/ProductState";
import { ControlMenu } from "./components/Menu/ControlMenu";
import { AboutUs } from "./pages/AboutUs/AboutUs";
import { Cart } from "./pages/Cart/Cart";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

declare global {
  interface Window {
    $: typeof jQuery; //It's for FancyBox
  }
}

function App() {
  return (
    <ProductState>
      <BrowserRouter>
        <ProductMenu />
        <ControlMenu />
        <main className="container">
          <Routes>
            <Route path="cart" element={<Cart />} />
            <Route path="categories/:id" element={<Products />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/errorpage" element={<ErrorPage />} />
            <Route path="/" element={<Navigate to="categories/bike" />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </ProductState>
  );
}

export default App;
