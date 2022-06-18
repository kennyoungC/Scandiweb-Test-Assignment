import React, { Component } from "react"
import styles from "./CartItems.module.css"

class CartItems extends Component {
  render() {
    return (
      <li>
        <div className={styles.layout}>
          <div>
            <p>
              Apollo <br /> Running Short
            </p>
            <p>$50.00</p>
            <div>
              <p>SIZE</p>
              <div>
                <span>M</span>
                <span>M</span>
                <span>M</span>
                <span>M</span>
              </div>
            </div>
            <div>
              <p>COLOR</p>
              <div>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
          <div>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit
              numquam unde aliquid et iusto?
            </p>
          </div>
        </div>
      </li>
    )
  }
}

export default CartItems
