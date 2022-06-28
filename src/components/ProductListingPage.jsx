import { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import Products from "./Products"
import { request, gql } from "graphql-request"
import { getAllProducts, setError } from "../store/actions"

const mapStateToProps = (state) => ({
  allProducts: state.productList.products.products || [],
  category: state.productList.products.name,
  isError: state.productList.isError,
  errorMsg: state.productList.errorMsg,
})
const mapDispatchToProps = (dispatch) => ({
  getProducts: (product) => dispatch(getAllProducts(product)),
  setError: (message) => dispatch(setError(message)),
})
const query = gql`
  {
    category {
      name
      products {
        category
        id
        name
        brand
        inStock
        gallery
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
  }
`
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
  column-gap: 32px;
  padding: 10px;
`
