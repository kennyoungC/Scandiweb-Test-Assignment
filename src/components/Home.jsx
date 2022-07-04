import React, { Component } from "react"
import ProductListingPage from "./ProductListingPage"
import MyNavbar from "./MyNavbar"
import { Route, Switch } from "react-router-dom"
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
        <Switch>
          <Route exact path="/">
            <ProductListingPage />
          </Route>
          <Route exact path="/cart">
            <CartPage />
          </Route>
          <Route exact path="/tech">
            <TechPage />
          </Route>
          <Route exact path="/clothes">
            <ClothesPage />
          </Route>
          <Route path="/product/:productId">
            <ProductPage />
          </Route>
          <Route path="*">
            <h1>404(Page Not Found)</h1>
          </Route>
        </Switch>
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
