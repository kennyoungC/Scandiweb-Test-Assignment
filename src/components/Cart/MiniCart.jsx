import React, { Component } from "react"
// import CartImgCarousel from "./CartImgCarousel"
import styles from "./MiniCart.module.css"
import { connect } from "react-redux"
import { addToCart, removeCartItems, setTotalAmt } from "../../store/actions"

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems || [],
  currency: state.cart.currency,
})
const mapDispatchToProps = (dispatch) => ({
  increaseCartItem: (item) => dispatch(addToCart(item)),
  removeCartItem: (index) => dispatch(removeCartItems(index)),
  setTotalAmount: () => dispatch(setTotalAmt()),
})

class miniCart extends Component {
  getPriceLabel = (prices) => {
    let price_ = 0
    prices.forEach((price) => {
      if (price.currency.label === this.props.currency.label) {
        price_ = price.amount
        return
      }
    })
    return price_
  }

  addToCartHadler = () => {
    this.props.increaseCartItem(this.props.item)
    this.props.setTotalAmount()
  }
  removeCartItemHadler = () => {
    this.props.removeCartItem(this.props.index)
    this.props.setTotalAmount()
  }

  render() {
    return (
      <ul>
        <li>
          <div className={styles.layout}>
            <div className={styles["first-row"]}>
              <span>
                <p>{this.props.item.brand}</p>
                <p>{this.props.item.name}</p>
              </span>
              <p className={styles.bold}>
                {this.props.currency.symbol}
                {this.getPriceLabel(this.props.item.prices).toFixed(2)}
              </p>

              {this.props.item.attributes.map((attribute, attrib) => (
                <div key={attrib}>
                  <p>{attribute.name}:</p>
                  <div className={styles.attributes}>
                    {attribute.items.map((item, i) => {
                      if (attribute.type === "swatch")
                        return (
                          <div key={i} className={styles["color-box"]}>
                            <span
                              className={
                                attribute.selected === item.value
                                  ? styles["selected-color"]
                                  : ""
                              }
                              style={{
                                backgroundColor: item.value,
                              }}
                            ></span>
                          </div>
                        )
                      else
                        return (
                          <div key={i} className={styles["size-box"]}>
                            <span
                              className={
                                attribute.selected === item.value
                                  ? styles["selected-size"]
                                  : ""
                              }
                            >
                              {item.value}
                            </span>
                          </div>
                        )
                    })}
                  </div>
                </div>
              ))}
            </div>
            <div className={styles["second-row"]}>
              <div className={styles["action-btn"]}>
                <button onClick={this.addToCartHadler}>+</button>
                <span>{this.props.item.quantity}</span>
                <button onClick={this.removeCartItemHadler}>-</button>
              </div>
              <img
                className={styles["product-img"]}
                src={this.props.item.gallery[0]}
                alt=""
              />
            </div>
          </div>
        </li>
      </ul>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(miniCart)
