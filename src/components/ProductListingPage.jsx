import { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import Products from "./Products"

const mapStateToProps = (state) => ({
  allProducts: state.productList.products.products || [],
  category: state.productList.products.name,
})

class ProductListingPage extends Component {
  render() {
    return (
      <div>
        <h1>Category {this.props.category}</h1>
        <Row>
          {this.props.allProducts.map((product) => (
            <div key={product.id}>
              <Products product={product} id={product.id} />
            </div>
          ))}
        </Row>
      </div>
    )
  }
}

export default connect(mapStateToProps)(ProductListingPage)
const Row = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: auto auto auto;
  row-gap: 48px;
  column-gap: 32px;

  padding: 10px;
`
