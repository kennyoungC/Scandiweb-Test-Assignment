import React, { Component } from "react"
import { connect } from "react-redux"
import CartItems from "./CartItems"
import styles from "./Cart.module.css"
import { clearCart, closeCart } from "../../store/actions"

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems || [],
  totalCartItems: state.cart.totalQuantity,
  totalPrice: state.cart.AlltotalPrice,
  currency: state.currency.currency,
})
const mapDispatchToProps = (dispatch) => ({
  closeCart: () => dispatch(closeCart()),
  clearCart: () => dispatch(clearCart()),
})
class Cart extends Component {
  componentDidMount() {
    this.props.closeCart()
  }

  render() {
    return (
      <div>
        <ul className={styles["cart-list"]}>
          {this.props.cartItems.map((cart, key) => (
            <CartItems index={key} item={cart} key={key} />
          ))}
        </ul>
        <div>
          <div className={styles.order}>
            <p>
              Tax 21%:{" "}
              {this.props.cartItems.length === 0 ? (
                0
              ) : (
                <span>
                  {this.props.currency.symbol}
                  {(0.21 * this.props.totalPrice).toFixed(2)}
                </span>
              )}
            </p>
            <p>
              Quantity: <span>{this.props.totalCartItems}</span>
            </p>
            <p>
              Total:{" "}
              {this.props.cartItems.length === 0 ? (
                0
              ) : (
                <span>
                  {this.props.currency.symbol}
                  {this.props.totalPrice.toFixed(2)}
                </span>
              )}
            </p>
          </div>
          <button
            onClick={() => this.props.clearCart()}
            className={styles["order-btn"]}
          >
            Order
          </button>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
