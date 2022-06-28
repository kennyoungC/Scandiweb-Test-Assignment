import React, { Component } from "react"
import ProductListingPage from "./ProductListingPage"
import MyNavbar from "./MyNavbar"
import styled from "styled-components"
import { Route, Routes } from "react-router-dom"
import CartPage from "../pages/CartPage"
import TechPage from "../pages/TechPage"
import ClothesPage from "../pages/ClothesPage"
import ProductPage from "../pages/ProductPage"

class Home extends Component {
  render() {
    return (
      <Container>
        <MyNavbar />

        <Routes>
          <Route path="/" element={<ProductListingPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/tech" element={<TechPage />} />
          <Route path="/clothes" element={<ClothesPage />} />
          <Route path="/product/:productId" element={<ProductPage />} />
        </Routes>
      </Container>
    )
  }
}

export default Home

const Container = styled.div`
  background-color: white;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 48px;
`
