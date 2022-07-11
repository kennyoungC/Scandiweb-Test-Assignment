import React, { Component } from "react"
import styles from "./MyNavbar.module.css"
import { Link, NavLink } from "react-router-dom"
import { connect } from "react-redux"
import {
  closeCart,
  setCurrency,
  setTotalAmt,
  toggleCart,
  toggleCurrencyMenu,
} from "../store/actions"
import { arrowDown, arrowUp, cartIcon, iconLogo } from "./UI/Icons"
import styled from "styled-components"
import MiniCart from "./Cart/MiniCart"
import { categoriesQuery, currencyQuery } from "../queries"
import request from "graphql-request"

const mapStateToProps = (state) => ({
  isOpen: state.currency.isOpen,
  currency: state.cart.currency,
  totalCartItems: state.cart.totalQuantity,
  cartItems: state.cart.cartItems || [],
  totalPrice: state.cart.AlltotalPrice,
  openCart: state.cart.isOpen,
})

const mapDispatchToProps = (dispatch) => ({
  toggleCurrencyMenuHandler: () => dispatch(toggleCurrencyMenu()),
  setCurrency: (currency) => dispatch(setCurrency(currency)),
  toggleOpen: () => dispatch(toggleCart()),
  closeCart: () => dispatch(closeCart()),
  setTotalAmount: () => dispatch(setTotalAmt()),
})

class MyNavbar extends Component {
  state = {
    categories: [],
    currencies: [],
  }
  componentDidUpdate(prevProps) {
    if (prevProps.currency !== this.props.currency) {
      console.log("currency changed")
      this.props.setTotalAmount()
    }
  }
  componentDidMount() {
    request("http://localhost:4000/", categoriesQuery)
      .then(({ categories }) => this.setState({ ...this.state, categories }))
      .catch((err) => console.log(err))

    request("http://localhost:4000/", currencyQuery)
      .then(({ currencies }) => this.setState({ ...this.state, currencies }))
      .catch((err) => console.log(err))
  }
  toggleCurrencyMenuHandler = () => {
    this.props.toggleCurrencyMenuHandler()
    this.props.closeCart()
  }

  render() {
    return (
      <div className={styles.navbar}>
        <ul className={styles.navLinks}>
          {this.state.categories.map((category, key) => (
            <li key={key}>
              <NavLink
                exact
                activeClassName={styles.active}
                to={`/${category.name}`}
              >
                {category.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <div>
          <span className={styles.logo}>{iconLogo}</span>
        </div>
        <div className={styles.action}>
          {/* beginning of currency menu */}
          <div className={styles.currencyMenu}>
            {this.props.isOpen && (
              <>
                <button onClick={this.toggleCurrencyMenuHandler}>
                  <span className={styles.currency}>
                    {" "}
                    {this.props.currency.symbol}
                    {""}
                  </span>{" "}
                  {arrowUp}
                </button>
              </>
            )}
            {!this.props.isOpen && (
              <button onClick={this.toggleCurrencyMenuHandler}>
                <span className={styles.currency}>
                  {this.props.currency.symbol}{" "}
                </span>{" "}
                {arrowDown}
              </button>
            )}
            {this.props.isOpen && (
              <Ul>
                {this.state.currencies.map((currency, i) => (
                  <li key={i} onClick={() => this.props.setCurrency(currency)}>
                    {currency.symbol} {currency.label}
                  </li>
                ))}
              </Ul>
            )}
          </div>
          {/* end of currency menu */}

          {this.props.openCart && (
            <Overlay onClick={() => this.props.closeCart()}></Overlay>
          )}
          <div className={styles.cart}>
            <button onClick={() => this.props.toggleOpen()}>{cartIcon}</button>
            {this.props.cartItems.length > 0 && (
              <span className={styles.cartNum}>
                {this.props.totalCartItems}
              </span>
            )}

            {this.props.openCart && (
              <div className={styles.minicart}>
                {this.props.cartItems.length === 0 ? (
                  <p className={styles.emptyCart}>cart is empty 🙂</p>
                ) : (
                  <>
                    <div>
                      <p className={styles.myBag}>
                        <span className={styles.bold}>My Bag</span>{" "}
                        {this.props.totalCartItems} items
                      </p>
                    </div>
                    {this.props.cartItems.map((cart, key) => (
                      <MiniCart index={key} item={cart} key={key} />
                    ))}
                    <div className={styles.total}>
                      <p>Total</p>
                      <p>
                        {" "}
                        {this.props.currency.symbol}
                        {this.props.totalPrice.toFixed(2)}
                      </p>
                    </div>
                    <div className={styles.btnAction}>
                      <Link to={"/cart"}>
                        <button>VIEW BAG</button>
                      </Link>
                      <button>CHECKOUT</button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyNavbar)

const Ul = styled.ul`
  z-index: 10;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #fff;

  padding: 0;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-35%, 10%);
  animation: all 0.4s ease-out;
  opacity: 1;
  pointer-events: all;

  li {
    width: 57px;
    padding: 8px 24px;
    cursor: pointer;
  }
  li:hover {
    background-color: #ccc;
  }
`
const Overlay = styled.span`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 9%;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  overflow: scroll;
`
