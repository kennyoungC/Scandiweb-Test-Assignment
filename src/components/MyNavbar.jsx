import React, { Component } from "react"
import styles from "./MyNavbar.module.css"
import { Link, NavLink } from "react-router-dom"
import { connect } from "react-redux"
import { setCurrency, toggleCurrencyMenu } from "../store/actions"
import { arrowDown, arrowUp, cartIcon, iconLogo } from "./UI/Icons"
import MiniCart from "./Cart/MiniCart"
import { Navigate } from "react-router-dom"

const mapStateToProps = (state) => ({
  isOpen: state.currency.isOpen,
  currency: state.currency.currency,
  totalCartItems: state.cart.totalQuantity,
  cartItems: state.cart.cartItems || [],
  totalPrice: state.cart.AlltotalPrice,
})

const mapDispatchToProps = (dispatch) => ({
  toggleCurrencyMenuHandler: () => dispatch(toggleCurrencyMenu()),

  setCurrency: (currency) => dispatch(setCurrency(currency)),
})

const curencies = [
  {
    label: "USD",
    symbol: "$",
  },
  {
    label: "GBP",
    symbol: "£",
  },
  {
    label: "AUD",
    symbol: "A$",
  },
  {
    label: "JPY",
    symbol: "¥",
  },
  {
    label: "RUB",
    symbol: "₽",
  },
]

class MyNavbar extends Component {
  state = {
    isOpen: false,
  }

  toggleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }
  handleClose = () => {
    this.setState({ isOpen: false })
  }
  dirty = () => {
    this.setState({ isOpen: false })
  }

  render() {
    return (
      <div className={styles.navbar}>
        <ul className={styles.navLinks}>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : "")}
              to={"/"}
            >
              {" "}
              all
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : "")}
              to={"/tech"}
            >
              tech
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : "")}
              to={"/clothes"}
            >
              clothes
            </NavLink>
          </li>
        </ul>

        <div>
          <span className={styles.logo}>{iconLogo}</span>
        </div>
        <div className={styles.action}>
          <div className={styles.currencyMenu}>
            {this.props.isOpen && (
              <>
                <button onClick={this.props.toggleCurrencyMenuHandler}>
                  <span className={styles.currency}>
                    {" "}
                    {this.props.currency.symbol}{" "}
                  </span>{" "}
                  {arrowUp}
                </button>
              </>
            )}
            {!this.props.isOpen && (
              <button onClick={this.props.toggleCurrencyMenuHandler}>
                <span className={styles.currency}>
                  {this.props.currency.symbol}{" "}
                </span>{" "}
                {arrowDown}
              </button>
            )}
            <ul
              style={{
                opacity: this.props.isOpen ? 1 : 0,
                pointerEvents: this.props.isOpen ? "all" : "none",
              }}
              className={styles.currencyList}
            >
              {curencies.map((currency, i) => (
                <li key={i} onClick={() => this.props.setCurrency(currency)}>
                  {currency.symbol} {currency.label}
                </li>
              ))}
            </ul>
          </div>
          {this.state.isOpen && (
            <span
              style={{ overflow: this.state.isOpen ? "hidden" : "scroll" }}
              onClick={this.handleClose}
              className={styles.overlay}
            ></span>
          )}
          <div className={styles.cart}>
            <button onClick={this.toggleOpen}>{cartIcon}</button>
            <span className={styles.cartNum}>{this.props.totalCartItems}</span>

            {this.state.isOpen && (
              <div
                onClick={() => this.setState({ isOpen: true })}
                className={styles.minicart}
              >
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
                    <button
                      onClick={() => {
                        this.handleClose()
                        console.log("fired!!!!")
                      }}
                    >
                      VIEW BAG
                    </button>
                  </Link>
                  <button>CHECKOUT</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyNavbar)
