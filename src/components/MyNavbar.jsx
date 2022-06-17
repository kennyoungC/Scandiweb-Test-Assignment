import React, { Component } from "react"
import styles from "./MyNavbar.module.css"

import { connect } from "react-redux"
import { toggleCurrencyMenu } from "../store/actions"
import { arrowDown, arrowUp, cartIcon, iconLogo } from "./UI/Icons"

const mapStateToProps = (state) => ({
  isOpen: state.currency.isOpen,
})

const mapDispatchToProps = (dispatch) => ({
  toggleCurrencyMenuHandler: () => dispatch(toggleCurrencyMenu()),
})

class MyNavbar extends Component {
  render() {
    return (
      <div className={styles.navbar}>
        <ul className={styles.navLinks}>
          <li>all</li>
          <li>clothes</li>
          <li>tech</li>
        </ul>

        <div>
          <span className={styles.logo}>{iconLogo}</span>
        </div>
        <div className={styles.action}>
          <div className={styles.currencyMenu}>
            {this.props.isOpen && (
              <>
                <button onClick={this.props.toggleCurrencyMenuHandler}>
                  <span className={styles.currency}> $ </span> {arrowUp}
                </button>
              </>
            )}
            {!this.props.isOpen && (
              <button onClick={this.props.toggleCurrencyMenuHandler}>
                <span className={styles.currency}> $ </span> {arrowDown}
              </button>
            )}
            <ul
              style={{ opacity: this.props.isOpen ? 1 : 0 }}
              className={styles.currencyList}
            >
              <li>$ USD</li>
              <li>$ EUR</li>
              <li>$ JPY</li>
            </ul>
          </div>
          <div className={styles.cart}>
            <button>{cartIcon}</button>
            <span className={styles.cartNum}>3</span>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyNavbar)
