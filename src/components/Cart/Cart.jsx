import React, { Component } from "react"
import { connect } from "react-redux"
import CartItems from "./CartItems"
import styles from "./Cart.module.css"

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems || [],
})
class Cart extends Component {
  render() {
    return (
      <div>
        <ul className={styles["cart-list"]}>
          {this.props.cartItems.map((cart) => (
            <CartItems key={cart.id} />
          ))}
        </ul>
        <div>
          <div className={styles.order}>
            <p>
              Tax 21%: <span>$42.00</span>
            </p>
            <p>
              Quantity: <span>3</span>
            </p>
            <p>
              Total: <span>$200.00</span>
            </p>
          </div>
          <button className={styles["order-btn"]}>Order</button>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Cart)
