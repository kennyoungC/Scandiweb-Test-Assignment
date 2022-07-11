import { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import Products from "./Products"
import { request } from "graphql-request"
import { closeCart, getAllProducts, setError } from "../store/actions"
import { query } from "../queries"

const mapStateToProps = (state) => ({
  allProducts: state.productList.products.products || [],
  category: state.productList.products.name,
  isError: state.productList.isError,
  errorMsg: state.productList.errorMsg,
})
const mapDispatchToProps = (dispatch) => ({
  getProducts: (product) => dispatch(getAllProducts(product)),
  setError: (message) => dispatch(setError(message)),
  closeCart: () => dispatch(closeCart()),
})

class ProductListingPage extends Component {
  state = {
    isLoading: false,
  }

  componentDidMount() {
    const getProducts = async () => {
      this.setState({ isLoading: true })
      try {
        request("http://localhost:4000/", query).then((data) =>
          this.props.getProducts(data.category)
        )
        this.setState({ isLoading: false })
      } catch (error) {
        this.props.setError(error.message)
      }
    }
    getProducts()
    this.props.closeCart()
  }

  render() {
    return (
      <>
        {!this.state.isLoading && (
          <div>
            <h1 className="category"> {this.props.category}</h1>
            <Row>
              {this.props.allProducts.map((product) => (
                <div key={product.id}>
                  <Products product={product} id={product.id} />
                </div>
              ))}
            </Row>
          </div>
        )}
        {this.state.isLoading && <div>Loading...</div>}
        {this.props.isError && !this.state.isLoading && (
          <div>{this.props.errorMsg}</div>
        )}
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListingPage)
const Row = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: auto auto auto;
  row-gap: 48px;
  justify-content: space-between;
`
