import React, { Component } from "react"
import styles from "../components/Products.module.css"
import { cartIcon } from "./UI/Icons"
import { connect } from "react-redux"
import { addToCart, updateProductItem } from "../store/actions"
import { Link } from "react-router-dom"

const mapStateToProps = (state) => ({
  currency: state.currency.currency,
})

const mapDispatchToProps = (dispatch) => ({
  addItemsToCart: (item) => dispatch(addToCart(item)),
  updateProduct: (item) => dispatch(updateProductItem(item)),
})

class Products extends Component {
  state = {
    isShown: false,
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
  componentDidMount() {
    this.setState({
      ...this.state,
      price: this.getPriceLabel(this.props.product.prices),
    })
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.price !== this.getPriceLabel(this.props.product.prices)) {
      this.setState({
        ...this.state,
        price: this.getPriceLabel(this.props.product.prices),
      })
    }
  }

  setSelectedValue = (attrib, attribute_item) => {
    let items = JSON.parse(JSON.stringify(this.props.product))

    items.attributes[attrib].selected = attribute_item.value
    console.log(items)
    this.props.updateProduct(items)
  }
  render() {
    return (
      <div className={styles.products}>
        <div className={styles["img-box"]}>
          <img src={this.props.product.gallery[0]} alt="/" />
          {this.props.product.attributes.length !== 0 ? (
            <button
              onClick={() => this.setState({ isShown: !this.state.isShown })}
              className={styles.cartIcon}
            >
              {cartIcon}
            </button>
          ) : (
            <button
              onClick={() =>
                this.props.addItemsToCart({
                  ...this.props.product,
                  singlePrice: this.state.price,
                })
              }
              className={styles.cartIcon}
            >
              {cartIcon}
            </button>
          )}
          {this.state.isShown && (
            <div>
              {this.props.product.attributes.map((attribute, attrib) => (
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
                              {item.value}
                            </button>
                          </div>
                        )
                    })}
                  </div>
                </div>
              ))}
              <button
                className={styles["addToCart-btn"]}
                onClick={() =>
                  this.props.addItemsToCart({
                    ...this.props.product,
                    singlePrice: this.state.price,
                  })
                }
              >
                ADD TO CART
              </button>
            </div>
          )}
        </div>
        <Link to={"/product/" + this.props.product.id}>
          {" "}
          <p className={styles["product-name"]}>{this.props.product.name}</p>
        </Link>
        <span className={styles.price}>
          {this.props.currency.symbol}
          {this.getPriceLabel(this.props.product.prices)}
        </span>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
