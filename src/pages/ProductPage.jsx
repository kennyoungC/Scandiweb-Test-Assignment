import React, { Component } from "react"
import { request } from "graphql-request"
import ProductDetails from "../components/ProductDetails"
import { withRouter } from "react-router-dom"
import { productDetailsQuery } from "../queries"

class ProductPage extends Component {
  state = {
    product: null,
  }

  componentDidMount() {
    const studentId = this.props.match.params.productId

    request("http://localhost:4000/", productDetailsQuery(studentId))
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
      </div>
    )
  }
}

export default withRouter(ProductPage)
