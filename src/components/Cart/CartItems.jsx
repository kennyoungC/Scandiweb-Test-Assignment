import React, { Component } from "react"
import styles from "./CartItems.module.css"
import { connect } from "react-redux"
import {
  addToCart,
  removeCartItems,
  updateCartItems,
} from "../../store/actions"
import CartImgCarousel from "./CartImgCarousel"

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems || [],
  currency: state.currency.currency,
})
const mapDispatchToProps = (dispatch) => ({
  updateCart: (item) => dispatch(updateCartItems(item)),
  increaseCartItem: (item) => dispatch(addToCart(item)),
  removeCartItem: (index) => dispatch(removeCartItems(index)),
})

class CartItems extends Component {
  state = {
    price: 0,
  }
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

  // setTotalAMount = () => {
  //   let items = JSON.parse(JSON.stringify(this.props.cartItems))

  //   const totalPriceForEachCartItems =
  //     this.getPriceLabel(this.props.item.prices) * this.props.item.quantity

  //   items[this.props.index].totalPrice = totalPriceForEachCartItems
  //   items[this.props.index].singlePrice = this.getPriceLabel(
  //     this.props.item.prices
  //   )
  //   console.log(items)
  //   this.props.createNewCart(items)
  // }
  // componentDidMount() {
  //   this.setTotalAMount()
  // }
  // componentDidUpdate(prevProps) {
  //   if (prevProps.currency.label !== this.props.currency.label) {
  //     this.setTotalAMount()
  //   }
  // }

  render() {
    return (
      <>
        <li onClick={this.setTotalAMount}>
          <div className={styles.layout}>
            <div className={styles["first-row"]}>
              <span>
                <p className={styles.bold}>{this.props.item.brand}</p>
                <p>{this.props.item.name}</p>
              </span>
              <p className={styles.bold}>
                {this.props.currency.symbol}
                {this.getPriceLabel(this.props.item.prices)}
                <br />
                {this.getPriceLabel(this.props.item.prices) *
                  this.props.item.quantity}
              </p>

              {this.props.item.attributes.map((attribute, attrib) => (
                <div key={attrib}>
                  <p className={styles.bold}>{attribute.name}:</p>
                  <div className={styles.attributes}>
                    {attribute.items.map((item, i) => {
                      if (attribute.type === "swatch")
                        return (
                          <div key={i} className={styles["color-box"]}>
                            <button
                              style={{
                                backgroundColor: item.value,
                                border:
                                  attribute.selected === item.value
                                    ? "2px solid #5ECE7B"
                                    : "",
                              }}
                              // onClick={() =>
                              //   this.setSelectedValue(attrib, item)
                              // }
                            ></button>
                          </div>
                        )
                      else
                        return (
                          <div key={i} className={styles["size-box"]}>
                            <button
                              style={{
                                backgroundColor:
                                  attribute.selected === item.value
                                    ? "#1d1f22"
                                    : "",
                                color:
                                  attribute.selected === item.value
                                    ? "white"
                                    : "",
                              }}
                              // onClick={() =>
                              //   this.setSelectedValue(attrib, item)
                              // }
                            >
                              {item.displayValue}
                            </button>
                          </div>
                        )
                    })}
                  </div>
                </div>
              ))}
            </div>
            <div className={styles["second-row"]}>
              <div className={styles["action-btn"]}>
                <button
                  onClick={() => this.props.increaseCartItem(this.props.item)}
                >
                  +
                </button>
                <span>{this.props.item.quantity}</span>
                <button
                  onClick={() => this.props.removeCartItem(this.props.index)}
                >
                  -
                </button>
              </div>

              <CartImgCarousel images={this.props.item.gallery} />
            </div>
          </div>
        </li>
        <hr />
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItems)
