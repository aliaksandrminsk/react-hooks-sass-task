import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Products } from "./pages/Products/Products";
import { Navbar } from "./components/Navbar";
import { ProductGalleryState } from "./store/productGallery/ProductGalleryState";
import { AuthStatusBar } from "./components/AuthStatusBar";
import { AboutUs } from "./pages/AboutUs/AboutUs";
import { Cart } from "./pages/Cart/Cart";

declare global {
  interface Window {
    $: typeof jQuery; //It's for FancyBox
  }
}

function App() {
  return (
    <ProductGalleryState>
      <BrowserRouter>
        <Navbar />
        <AuthStatusBar />
        <main className="container">
          <Routes>
            <Route path="cart" element={<Cart />} />
            <Route path="categories/:id" element={<Products />} />
            <Route path="aboutus" element={<AboutUs />} />
            <Route path="*" element={<AboutUs />} />
          </Routes>
        </main>
      </BrowserRouter>
    </ProductGalleryState>
  );
}

export default App;
