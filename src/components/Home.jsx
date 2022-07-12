import React, { Component } from "react"
import ProductListingPage from "./ProductListingPage"
import MyNavbar from "./MyNavbar"
import { Route, Switch } from "react-router-dom"
import CartPage from "../pages/CartPage"
import TechPage from "../pages/TechPage"
import ClothesPage from "../pages/ClothesPage"
import ProductPage from "../pages/ProductPage"
import WelcomePage from "../pages/WelcomePage"
import request from "graphql-request"
import { categoriesQuery } from "../queries"
import { withRouter } from "react-router-dom"

class Home extends Component {
  state = {
    categories: [],
  }

  componentDidMount() {
    this.getCategories()
  }

  getCategories = async () => {
    try {
      const response = await request("http://localhost:4000/", categoriesQuery)
      const data = await response.categories
      this.setState({ ...this.state, categories: data })
    } catch (error) {
      console.log(error)
    }
  }
  showNavBar = () => {
    if (this.props.match.path === "/" && this.props.location.pathname === "/") {
      return <h1>Welcome to the Scandiweb Test Assignment</h1>
    }
    if (this.props.location.pathname !== "/") {
      return <MyNavbar categories={this.state.categories} />
    }
  }

  render() {
    return (
      <div className="container">
        {this.showNavBar()}
        <Switch>
          <Route exact path="/">
            <WelcomePage />
          </Route>
          <Route exact path="/all">
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

export default withRouter(Home)
