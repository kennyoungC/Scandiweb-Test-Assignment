import React, { Component } from "react"
// import { gql } from "@apollo/client"
import { connect } from "react-redux"
import { getAllProducts, setError } from "../store/actions"
import ProductListingPage from "./ProductListingPage"
import MyNavbar from "./MyNavbar"
import styled from "styled-components"
import { Route, Routes } from "react-router-dom"
import CartPage from "../pages/CartPage"
import TechPage from "../pages/TechPage"
import ClothesPage from "../pages/ClothesPage"
import { request, gql } from "graphql-request"
import ProductPage from "../pages/ProductPage"
const mapDispatchToProps = (dispatch) => ({
  getProducts: (product) => dispatch(getAllProducts(product)),
  setError: (message) => dispatch(setError(message)),
})
const query = gql`
  {
    category {
      name
      products {
        category
        id
        name
        brand
        inStock
        gallery
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`
class FetchProducts extends Component {
  // getAllProducts = () => {
  //   this.props.client
  //     .query({
  //       query: gql`
  //         query {
  //           category {
  //             name
  //             products {
  //               category
  //               id
  //               name
  //               brand
  //               inStock
  //               gallery
  //               attributes {
  //                 id
  //                 name
  //                 type
  //                 items {
  //                   displayValue
  //                   value
  //                   id
  //                 }
  //               }
  //               prices {
  //                 currency {
  //                   label
  //                   symbol
  //                 }
  //                 amount
  //               }
  //             }
  //           }
  //         }
  //       `,
  //     })
  //     .then(({ data, load }) => this.props.getProducts(data.category))
  //     .catch((err) => this.props.setError(err.message))
  // }

  // componentDidMount = () => {
  //   this.getAllProducts()
  // }
  componentDidMount() {
    request("http://localhost:4000/", query).then((data) =>
      this.props.getProducts(data.category)
    )
  }

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

export default connect(null, mapDispatchToProps)(FetchProducts)

const Container = styled.div`
  background-color: white;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 48px;
`
