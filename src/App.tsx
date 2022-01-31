import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Products } from "./pages/Products/Products";
import { ProductMenu } from "./components/Menu/ProductMenu";
import { ProductState } from "./context/product/ProductState";
import { ControlMenu } from "./components/Menu/ControlMenu";
import { About } from "./pages/About/About";
import { Cart } from "./pages/Cart/Cart";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import { CartState } from "./context/cart/CartState";
import { OrderState } from "./context/order/OrderState";
import { Order } from "./pages/Order/Order";

declare global {
  interface Window {
    $: typeof jQuery; //It's for FancyBox
  }
}

function App() {
  return (
    <ProductState>
      <CartState>
        <OrderState>
          <BrowserRouter>
            <ProductMenu />
            <ControlMenu />
            <main className="container">
              <Routes>
                <Route path="cart" element={<Cart />} />
                <Route path="order" element={<Order />} />
                <Route path="categories/:id" element={<Products />} />
                <Route path="/about" element={<About />} />
                <Route path="/errorpage" element={<ErrorPage />} />
                <Route path="/" element={<Navigate to="categories/bike" />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </main>
          </BrowserRouter>
        </OrderState>
      </CartState>
    </ProductState>
  );
}

export default App;
