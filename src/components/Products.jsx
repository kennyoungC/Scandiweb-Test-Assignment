import React, { Component } from "react"
import styles from "../components/Products.module.css"
import { cartIcon } from "./UI/Icons"

class Products extends Component {
  render() {
    return (
      <div className={styles.products}>
        <div className={styles["img-box"]}>
          <img src="https://via.placeholder.com/356" alt="/" />
          <span className={styles.cartIcon}>{cartIcon}</span>
        </div>
        <p>{this.props.id}</p>
        <span>$50.00</span>
      </div>
    )
  }
}

export default Products
