import React, { Component } from "react"
import { request, gql } from "graphql-request"
import ProductDetails from "../components/ProductDetails"
const query = (productId) => gql`
    {
      product(id: "${productId}") {
        id
        category
        name
        brand
        gallery
        inStock
        description
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
  `
class ProductPage extends Component {
  state = {
    product: null,
  }

  componentDidMount() {
    const studentId = window.location.href.split("/")[4]
    console.log(studentId)

    request("http://localhost:4000/", query(studentId))
      .then(({ product }) =>
        this.setState({ product: { ...product, quantity: 1 } })
      )
      .catch((err) => console.log(err))
  }
  render() {
    return (
      <div>
        {this.state.product === null ? (
          <div>Loading...</div>
        ) : (
          <ProductDetails product={this.state.product} />
        )}
        {/* <ProductDetails product={this.state.product} />{" "} */}
      </div>
    )
  }
}

export default ProductPage
