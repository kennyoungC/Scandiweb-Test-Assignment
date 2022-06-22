import React, { Component } from "react"
import { connect } from "react-redux"
import CartItems from "./CartItems"
import styles from "./Cart.module.css"

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems || [],
  totalCartItems: state.cart.totalQuantity,
  totalPrice: state.cart.totalPrice,
  currency: state.currency.currency,
})
class Cart extends Component {
  render() {
    return (
      <div>
        <ul className={styles["cart-list"]}>
          {this.props.cartItems.map((cart, key) => (
            <CartItems index={key} item={cart} key={cart.id} />
          ))}
        </ul>
        <div>
          <div className={styles.order}>
            <p>
              Tax 21%:{" "}
              <span>
                {this.props.currency.symbol}
                {(0.21 * this.props.totalPrice).toFixed(2)}
              </span>
            </p>
            <p>
              Quantity: <span>{this.props.totalCartItems}</span>
            </p>
            <p>
              Total:{" "}
              <span>
                {this.props.currency.symbol}
                {this.props.totalPrice.toFixed(2)}
              </span>
            </p>
          </div>
          <button className={styles["order-btn"]}>Order</button>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Cart)
