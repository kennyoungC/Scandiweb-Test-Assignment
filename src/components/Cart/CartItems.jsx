import React, { Component } from "react"
import store from "../../store"
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
  removeCartItem: (id) => dispatch(removeCartItems(id)),
})

class CartItems extends Component {
  getPriceLabel = (prices) => {
    let price_ = 0
    prices.forEach((price) => {
      if (price.currency.label === this.props.currency.label) {
        price_ = price.currency.symbol + price.amount
        return
      }
    })
    return price_
  }

  setTotalAMount = (prices) => {
    prices.forEach((price) => {
      if (price.currency.label === this.props.currency.label) {
        let items = JSON.parse(JSON.stringify(this.props.cartItems))

        const totalPriceForEachCartItems =
          price.amount * this.props.item.quantity

        // console.log(totalPriceForEachCartItems)
        items[this.props.index].totalPrice = totalPriceForEachCartItems
        this.props.updateCart(items[this.props.index])
      }
    })
  }

  componentDidMount() {
    this.setTotalAMount(this.props.item.prices)
  }
  componentDidUpdate(prevProps) {
    if (prevProps.item.quantity !== this.props.item.quantity) {
      this.setTotalAMount(this.props.item.prices)
    }
  }

  setSelectedValue = (attrib, attribute_item) => {
    // console.log(attribute_item)
    let items = JSON.parse(JSON.stringify(this.props.cartItems))

    items[this.props.index].attributes[attrib].selected = attribute_item.value
    console.log(items[this.props.index])
    this.props.updateCart(items[this.props.index])
  }

  render() {
    return (
      <>
        <li>
          <div className={styles.layout}>
            <div className={styles["first-row"]}>
              <span>
                <p className={styles.bold}>{this.props.item.brand}</p>
                <p>{this.props.item.name}</p>
              </span>
              <p className={styles.bold}>
                {" "}
                {this.getPriceLabel(this.props.item.prices)}
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
                              onClick={() =>
                                this.setSelectedValue(attrib, item)
                              }
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
                              onClick={() =>
                                this.setSelectedValue(attrib, item)
                              }
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
                  onClick={() => this.props.removeCartItem(this.props.item.id)}
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
