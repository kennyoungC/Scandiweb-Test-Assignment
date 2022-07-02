import React, { Component } from "react"
import ProductListingPage from "./ProductListingPage"
import MyNavbar from "./MyNavbar"
import { Route, Routes } from "react-router-dom"
import CartPage from "../pages/CartPage"
import TechPage from "../pages/TechPage"
import ClothesPage from "../pages/ClothesPage"
import ProductPage from "../pages/ProductPage"
import styled from "styled-components"

class Home extends Component {
  render() {
    return (
      <div className="container">
        <Sticky>
          <MyNavbar />
        </Sticky>
        <Routes>
          <Route path="/" element={<ProductListingPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/tech" element={<TechPage />} />
          <Route path="/clothes" element={<ClothesPage />} />
          <Route path="/product/:productId" element={<ProductPage />} />
        </Routes>
      </div>
    )
  }
}

export default Home
const Sticky = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: #fff;
  width: 100%;
  margin: 16px 0;
`
