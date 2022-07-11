import React, { Component } from "react"
import styles from "../components/Products.module.css"
import { cartIcon } from "./UI/Icons"
import { connect } from "react-redux"
import { addToCart, setTotalAmt } from "../store/actions"
import styled from "styled-components"
import { Link } from "react-router-dom"

const mapStateToProps = (state) => ({
  currency: state.cart.currency,
  currencyyyy: state.cart,
})

const mapDispatchToProps = (dispatch) => ({
  addItemsToCart: (item) => dispatch(addToCart(item)),

  setTotalAmount: () => dispatch(setTotalAmt()),
})

class Products extends Component {
  state = {
    isShown: false,
    prod: this.props.product,
    disabled: true,
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

  setSelectedValue = (attrib, attribute_item) => {
    const items = JSON.parse(JSON.stringify(this.state.prod))
    items.attributes[attrib].selected = attribute_item.value

    this.setState({
      ...this.state,
      prod: items,
    })
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
  addToCartHandler = (e) => {
    e.preventDefault()
    this.props.addItemsToCart(this.state.prod)
    this.setState({
      ...this.state,
      isShown: false,
      prod: this.props.product,
      disabled: true,
    })
    this.props.setTotalAmount()
  }

  render() {
    return (
      <Wrapper>
        <>
          <>
            {this.props.product.attributes.length !== 0 ? (
              <>
                {this.props.product.inStock ? (
                  <CartIcon
                    onClick={() =>
                      this.setState({ isShown: !this.state.isShown })
                    }
                  >
                    {cartIcon}
                  </CartIcon>
                ) : (
                  <CartIcon disabled={true}>{cartIcon}</CartIcon>
                )}
              </>
            ) : (
              <>
                {this.props.product.inStock ? (
                  <CartIcon
                    onClick={() =>
                      this.props.addItemsToCart({
                        ...this.props.product,
                        singlePrice: this.state.price,
                      })
                    }
                  >
                    {cartIcon}
                  </CartIcon>
                ) : (
                  <CartIcon disabled={true}>{cartIcon}</CartIcon>
                )}
              </>
            )}
          </>

          {this.state.isShown && (
            <AttriSelector>
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
                              className={
                                attribute.selected === item.value
                                  ? styles["selected-size"]
                                  : ""
                              }
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
              <form onSubmit={this.addToCartHandler}>
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
            </AttriSelector>
          )}
        </>
        <Link to={"/product/" + this.props.product.id}>
          <ProductsCard
            className={!this.props.product.inStock && styles.opacity}
          >
            {!this.props.product.inStock && (
              <p className={styles["out-of-stock"]}>out of stock</p>
            )}
            <div className={styles["img-box"]}>
              <img src={this.props.product.gallery[0]} alt="/" />
            </div>
            <p className={styles["product-name"]}>
              {" "}
              {this.props.product.brand} {this.props.product.name}
            </p>
            <span className={styles.price}>
              {this.props.currency.symbol}
              {this.getPriceLabel(this.props.product.prices)}
            </span>
          </ProductsCard>
        </Link>
      </Wrapper>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)

const CartIcon = styled.button`
  position: absolute;
  padding: 6px 8px;
  background-color: #5ece7b;
  border-radius: 50%;
  color: #fff;
  bottom: 18%;
  left: 75%;
  transform: translate(50%, 0%);
  opacity: 0;
  animation: all 0.3s ease-out;
  z-index: 111;
  &:disabled {
    opacity: 0;
  }
`
const Wrapper = styled.div`
  position: relative;
  &:hover ${CartIcon} {
    opacity: 1;
  }
`

const ProductsCard = styled.div`
  padding: 12px;
  max-width: fit-content;
  max-width: -moz-fit-content;
  position: relative;

  &:hover {
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
  }
`
const AttriSelector = styled.div`
  position: absolute;
  background-color: #fff;
  border-radius: 11px;
  bottom: 20%;
  left: 16%;
  transform: translate(-3%, -13%);
  padding: 10px;
  z-index: 111;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
`
