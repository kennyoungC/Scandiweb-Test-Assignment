import React, { Component } from "react"
import styled from "styled-components"
import { withRouter } from "react-router-dom"
import { compose } from "redux"
import { connect } from "react-redux"
import Products from "../components/Products"
import { closeCart } from "../store/actions"
import request from "graphql-request"
import { catQuery } from "../queries"

const mapDispatchToProps = (dispatch) => ({
  closeCart: () => dispatch(closeCart()),
})
class TechPage extends Component {
  state = {
    products: null,
  }

  componentDidMount() {
    this.props.closeCart()
    this.getTech()
  }
  getTech = async () => {
    try {
      const response = await request(
        "http://localhost:4000/",
        catQuery(this.props.match.path.slice(1))
      )
      const data = await response.category

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

export default compose(
  withRouter,
  connect((s) => s, mapDispatchToProps)
)(TechPage)
const Row = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 48px;
  justify-content: space-between;
`
