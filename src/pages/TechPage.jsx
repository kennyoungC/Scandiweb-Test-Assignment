import React, { Component } from "react"
import styled from "styled-components"

import { connect } from "react-redux"
import Products from "../components/Products"
import { closeCart } from "../store/actions"

const mapStateToProps = (state) => ({
  techProducts: state.productList.products.products.filter(
    (prod) => prod.category === "tech"
  ),
})
const mapDispatchToProps = (dispatch) => ({
  closeCart: () => dispatch(closeCart()),
})
class TechPage extends Component {
  componentDidMount() {
    this.props.closeCart()
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(TechPage)
const Row = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: auto auto auto;
  row-gap: 48px;
  justify-content: space-between;
`
