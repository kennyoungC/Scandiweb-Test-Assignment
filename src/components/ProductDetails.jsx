import React, { Component } from "react"
import styles from "./ProductDetails.module.css"
import { connect } from "react-redux"
import { addToCart, setTotalAmt } from "../store/actions"
import { Markup } from "interweave"

const mapStateToProps = (state) => ({
  currency: state.cart.currency,
})
const mapDispatchToProps = (dispatch) => ({
  addItemsToCart: (item) => dispatch(addToCart(item)),
  setTotalAmount: () => dispatch(setTotalAmt()),
})

class ProductDetails extends Component {
  state = {
    selectedImage: this.props.product.gallery[0],
    disabled: true,
    prod: this.props.product,
  }
  setSelectedValue = (attrib, attribute_item) => {
    const items = JSON.parse(JSON.stringify(this.state.prod))
    items.attributes[attrib].selected = attribute_item.value

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
  componentDidUpdate(prevProps, prevState) {
    if (prevState.prod.attributes !== this.state.prod.attributes) {
      if (
        this.props.product.inStock &&
        this.state.prod.attributes.every((attribute) => attribute.selected)
      ) {
        this.setState({ ...this.state, disabled: false })
      }
    }
  }

  addToCartHadler = (e) => {
    e.preventDefault()
    this.props.addItemsToCart(this.state.prod)
    this.props.setTotalAmount()
    this.setState({
      ...this.state,
      redirect: true,
      prod: this.props.product,
      disabled: true,
    })
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
                            className={
                              attribute.selected === item.value
                                ? styles["selected-color"]
                                : ""
                            }
                            style={{
                              backgroundColor: item.value,
                            }}
                            onClick={() => this.setSelectedValue(attrib, item)}
                          ></button>
                        </div>
                      )
                    else
                      return (
                        <div key={i} className={styles["size-box"]}>
                          <button
                            className={
                              attribute.selected === item.value
                                ? styles["selected-size"]
                                : ""
                            }
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
              {this.props.product.inStock ? (
                <button
                  disabled={this.state.disabled}
                  className={styles["addToCart-btn"]}
                >
                  ADD TO CART
                </button>
              ) : (
                <button disabled={true} className={styles["addToCart-btn"]}>
                  OUT OF STOCK
                </button>
              )}
            </form>
          </div>
          <div className={styles.description}>
            <Markup content={this.props.product.description} />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails)
