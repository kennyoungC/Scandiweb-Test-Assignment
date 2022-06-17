import React, { Component } from "react"
import { gql } from "@apollo/client"
import { connect } from "react-redux"
import { getAllProducts, setError } from "../store/actions"
import ProductListingPage from "./ProductListingPage"
import MyNavbar from "./MyNavbar"
import styled from "styled-components"

const mapDispatchToProps = (dispatch) => ({
  getProducts: (product) => dispatch(getAllProducts(product)),
  setError: (message) => dispatch(setError(message)),
})

class FetchProducts extends Component {
  getAllProducts = () => {
    this.props.client
      .query({
        query: gql`
          query {
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
        `,
      })
      .then(({ data }) => this.props.getProducts(data.category))
      .catch((err) => this.props.setError(err.message))
  }

  componentDidMount = () => {
    this.getAllProducts()
  }

  render() {
    return (
      <Container>
        <MyNavbar />
        <ProductListingPage />
      </Container>
    )
  }
}

export default connect(null, mapDispatchToProps)(FetchProducts)

const Container = styled.div`
  background-color: white;
  height: 100vh;
  max-width: 1220px;
  margin: 0 auto;
  padding: 0 48px;
`
