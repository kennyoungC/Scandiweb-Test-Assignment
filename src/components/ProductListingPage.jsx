import { Component } from "react"
import { connect } from "react-redux"

const mapStateToProps = (state) => ({
  allProducts: state.productList.products.products || [],
  category: state.productList.products.name,
})

class ProductListingPage extends Component {
  render() {
    return (
      <div>
        <h1>Product Listing Page {this.props.category}</h1>
        {this.props.allProducts.map((product) => (
          <div key={product.id}>{product.id}</div>
        ))}
      </div>
    )
  }
}

export default connect(mapStateToProps)(ProductListingPage)
