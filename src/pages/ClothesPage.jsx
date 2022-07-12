import React, { Component } from "react"
import styled from "styled-components"

import { connect } from "react-redux"
import Products from "../components/Products"
import { closeCart } from "../store/actions"
import request from "graphql-request"
import { categoryQuery, clothesQuery } from "../queries"

const mapStateToProps = (state) => ({
  clothesProducts: state.productList.products.products.filter(
    (prod) => prod.category === "clothes"
  ),
})
const mapDispatchToProps = (dispatch) => ({
  closeCart: () => dispatch(closeCart()),
})
class ClothesPage extends Component {
  state = {
    products: null,
  }

  componentDidMount() {
    this.props.closeCart()
    this.getClotes()
  }

  getClotes = async () => {
    try {
      const response = await request("http://localhost:4000/", clothesQuery)
      const data = await response.category
      console.log(data)
      this.setState({ ...this.state, products: data })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div>
        <h1 className="category">{this.state.products?.name}</h1>
        {this.state.products === null ? (
          <div>Loading...</div>
        ) : (
          <Row>
            {this.state.products.products.map((product) => (
              <div key={product.id}>
                <Products product={product} id={product.id} />
              </div>
            ))}
          </Row>
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClothesPage)
const Row = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: auto auto auto;
  row-gap: 48px;
  justify-content: space-between;
`
