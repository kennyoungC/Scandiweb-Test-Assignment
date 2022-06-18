import React, { Component } from "react"
import styles from "./CartItems.module.css"

class CartItems extends Component {
  render() {
    return (
      <>
        <li>
          <div className={styles.layout}>
            <div className={styles["first-row"]}>
              <span>
                <p className={styles.bold}>Apollo</p>
                <p>Running Short</p>
              </span>
              <p className={styles.bold}>$50.00</p>
              <div>
                <p className={styles.bold}>SIZE:</p>
                <div className={styles["size-box"]}>
                  <button>XS</button>
                  <button>S</button>
                  <button>M</button>
                  <button>L</button>
                </div>
              </div>
              <div>
                <p className={styles.bold}>COLOR:</p>
                <div className={styles["color-box"]}>
                  <button></button>
                  <button></button>
                  <button></button>
                </div>
              </div>
            </div>
            <div className={styles["second-row"]}>
              <div className={styles["action-btn"]}>
                <button>+</button>
                <span>1</span>
                <button>-</button>
              </div>
              <img src="http://via.placeholder.com/150" alt="" />
            </div>
          </div>
        </li>
        <hr />
      </>
    )
  }
}

export default CartItems
