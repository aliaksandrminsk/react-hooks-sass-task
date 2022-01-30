import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Products } from "./pages/Products/Products";
import { ProductNavbar } from "./components/ProductNavbar";
import { ProductGalleryState } from "./store/productGallery/ProductGalleryState";
import { ControlNavBar } from "./components/ControlNavBar";
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
    <ProductGalleryState>
      <BrowserRouter>
        <ProductNavbar />
        <ControlNavBar />
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
    </ProductGalleryState>
  );
}

export default App;
