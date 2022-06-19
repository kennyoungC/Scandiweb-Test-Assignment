import React, { Component } from "react"
import styled from "styled-components"

import { connect } from "react-redux"
import Products from "../components/Products"

const mapStateToProps = (state) => ({
  techProducts: state.productList.products.products.filter(
    (prod) => prod.category === "tech"
  ),
})

class TechPage extends Component {
  render() {
    return (
      <div>
        <h1 className="category"> {this.props.techProducts[0].category}</h1>
        <Row>
          {this.props.techProducts.map((product) => (
            <div key={product.id}>
              <Products product={product} id={product.id} />
            </div>
          ))}
        </Row>
      </div>
    )
  }
}

export default connect(mapStateToProps)(TechPage)
const Row = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: auto auto auto;
  row-gap: 48px;
  column-gap: 32px;

  padding: 10px;
`
