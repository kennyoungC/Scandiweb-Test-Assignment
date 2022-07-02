import React, { Component } from "react"
import styles from "./ProductDetails.module.css"
import { connect } from "react-redux"
import { addToCart, setTotalAmt, updateProductItem } from "../store/actions"
import { Markup } from "interweave"
import { Navigate } from "react-router-dom"

const mapStateToProps = (state) => ({
  currency: state.cart.currency,
})
const mapDispatchToProps = (dispatch) => ({
  addItemsToCart: (item) => dispatch(addToCart(item)),
  updateProduct: (item) => dispatch(updateProductItem(item)),
  setTotalAmount: () => dispatch(setTotalAmt()),
})

class ProductDetails extends Component {
  state = {
    selectedImage: this.props.product.gallery[0],

    prod: this.props.product,
    redirect: false,
  }
  setSelectedValue = (attrib, attribute_item) => {
    const items = this.state.prod
    items.attributes[attrib].selected = attribute_item.value
    console.log(items)

    this.setState({ ...this.state, prod: items })
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

  addToCartHadler = (e) => {
    e.preventDefault()
    this.props.addItemsToCart(this.state.prod)
    this.setState({ ...this.state, redirect: true })
    this.props.setTotalAmount()
  }
  render() {
    return (
      <div className={styles.layout}>
        <div className={styles["img-box"]}>
          <div className={styles["side-imgs"]}>
            {this.props.product.gallery.map((img, key) => (
              <img
                onClick={() => this.setState({ selectedImage: img })}
                key={key}
                src={img}
                alt=""
              />
            ))}
          </div>
          <div className={styles["main-img"]}>
            <img src={this.state.selectedImage} alt="" />
          </div>
        </div>

        <div className={styles["product-info"]}>
          <h1>{this.props.product.brand}</h1>
          <h2>{this.props.product.name}</h2>
          <div>
            {this.state.prod.attributes.map((attribute, attrib) => (
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
                            onClick={() => this.setSelectedValue(attrib, item)}
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
                            onClick={() => this.setSelectedValue(attrib, item)}
                          >
                            {item.value}
                          </button>
                        </div>
                      )
                  })}
                </div>
              </div>
            ))}
            <div className={styles.price}>
              <p>Price:</p>
              <span>
                {this.props.currency.symbol}
                {this.getPriceLabel(this.props.product.prices)}
              </span>
            </div>
            <form onSubmit={this.addToCartHadler}>
              <button className={styles["addToCart-btn"]}>ADD TO CART</button>
            </form>
          </div>
          <div className={styles.description}>
            <Markup content={this.props.product.description} />;
          </div>
        </div>
        {this.state.redirect && <Navigate to="/" replace={true} />}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails)
