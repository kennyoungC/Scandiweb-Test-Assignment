import React, { Component } from "react"
import styled from "styled-components"

import { connect } from "react-redux"
import Products from "../components/Products"

const mapStateToProps = (state) => ({
  clothesProducts: state.productList.products.products.filter(
    (prod) => prod.category === "clothes"
  ),
})

class ClothesPage extends Component {
  render() {
    return (
      <div>
        <h1 className="category"> {this.props.clothesProducts[0].category}</h1>
        <Row>
          {this.props.clothesProducts.map((product) => (
            <div key={product.id}>
              <Products product={product} id={product.id} />
            </div>
          ))}
        </Row>
      </div>
    )
  }
}

export default connect(mapStateToProps)(ClothesPage)
const Row = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: auto auto auto;
  row-gap: 48px;
  column-gap: 32px;

  padding: 10px;
`
