import { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import Products from "./Products"
import { request } from "graphql-request"
import { closeCart, getAllProducts, setError } from "../store/actions"
import { catQuery } from "../queries"
import { withRouter } from "react-router-dom"
import { compose } from "redux"

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
    this.setState({ isLoading: true })
    const getProducts = async () => {
      try {
        request(
          "http://localhost:4000/",
          catQuery(this.props.match.slice(1))
        ).then((data) => this.props.getProducts(data.category))
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
        {this.state.isLoading && <div>Loading...</div>}
        {this.props.isError && !this.state.isLoading && (
          <div>{this.props.errorMsg}</div>
        )}
      </>
    )
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ProductListingPage)
const Row = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: auto auto auto;
  row-gap: 48px;
  justify-content: space-between;
`
