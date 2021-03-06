import React, { Component } from "react"
import { arrowLeft, arrowRight } from "../UI/Icons"
import styles from "./CartImgCarousel.module.css"

class CartImgCarousel extends Component {
  state = {
    position: 0,
  }

  moveRight = () => {
    if (this.state.position >= this.props.images.length - 1) {
      this.setState({ position: 0 })
      return
    }
    this.setState({ position: this.state.position + 1 })
  }

  moveLeft = () => {
    if (this.state.position <= 0) {
      this.setState({ position: this.props.images.length - 1 })
      return
    }
    this.setState({ position: this.state.position - 1 })
  }

  render() {
    return (
      <div className={styles.container}>
        <img src={this.props.images[this.state.position]} alt="/" />
        {this.props.images.length > 1 && (
          <div className={styles.btnBox}>
            <button onClick={this.moveLeft}>{arrowLeft}</button>
            <button onClick={this.moveRight}>{arrowRight}</button>
          </div>
        )}
      </div>
    )
  }
}

export default CartImgCarousel
