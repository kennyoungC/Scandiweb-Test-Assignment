import React, { Component } from "react"
import styles from "../components/Products.module.css"
import { cartIcon } from "./UI/Icons"
import { connect } from "react-redux"
import { addToCart } from "../store/actions"

const mapStateToProps = (state) => ({
  currency: state.currency.currency,
})

const mapDispatchToProps = (dispatch) => ({
  addItemsToCart: (item) => dispatch(addToCart(item)),
})

class Products extends Component {
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

  render() {
    return (
      <div className={styles.products}>
        <div className={styles["img-box"]}>
          <img src={this.props.product.gallery[0]} alt="/" />
          <button
            onClick={() => this.props.addItemsToCart(this.props.product)}
            className={styles.cartIcon}
          >
            {cartIcon}
          </button>
        </div>
        <p className={styles["product-name"]}>{this.props.product.name}</p>
        <span className={styles.price}>
          {this.getPriceLabel(this.props.product.prices)}
        </span>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
