import React, { Component } from "react"
import styles from "./MyNavbar.module.css"
import { Link, NavLink } from "react-router-dom"
import { connect } from "react-redux"
import { setCurrency, toggleCurrencyMenu } from "../store/actions"
import { arrowDown, arrowUp, cartIcon, iconLogo } from "./UI/Icons"

const mapStateToProps = (state) => ({
  isOpen: state.currency.isOpen,
  currency: state.currency.currency,
  totalCartItems: state.cart.totalQuantity,
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
  // showPrice = () => {
  //   const prices = this.props.currency
  //   console.log(prices)
  //   //  let newObj = []
  //   //  for (const key in prices) {
  //   //    newObj.push({
  //   //      // name: prices[key].name,
  //   //      price: prices[key].prices,
  //   //    })
  //   //  }
  //   //  console.log(newObj)
  // }
  // componentDidMount() {
  //   this.showPrice()
  // }

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
              style={{ opacity: this.props.isOpen ? 1 : 0 }}
              className={styles.currencyList}
            >
              {curencies.map((currency) => (
                <li onClick={() => this.props.setCurrency(currency)}>
                  {currency.symbol} {currency.label}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.cart}>
            <Link to={"/cart"}>
              <button>{cartIcon}</button>
              <span className={styles.cartNum}>
                {this.props.totalCartItems}
              </span>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyNavbar)
