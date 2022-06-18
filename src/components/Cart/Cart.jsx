import React, { Component } from "react"
import { connect } from "react-redux"
import CartItems from "./CartItems"

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems || [],
})
class Cart extends Component {
  render() {
    return (
      <ul>
        {this.props.cartItems.map((cart) => (
          <CartItems key={cart.id} />
        ))}
      </ul>
    )
  }
}

export default connect(mapStateToProps)(Cart)
