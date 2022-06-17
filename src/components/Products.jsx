import React, { Component } from "react"
import styles from "../components/Products.module.css"
import { cartIcon } from "./UI/Icons"

class Products extends Component {
  render() {
    return (
      <div className={styles.products}>
        <div className={styles["img-box"]}>
          <img src="https://via.placeholder.com/300" alt="/" />
          <button className={styles.cartIcon}>{cartIcon}</button>
        </div>
        <p className={styles["product-name"]}>{this.props.id}</p>
        <span className={styles.price}>$50.00</span>
      </div>
    )
  }
}

export default Products
