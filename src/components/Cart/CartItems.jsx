import React, { Component } from "react"
import store from "../../store"
import styles from "./CartItems.module.css"
import { connect } from "react-redux"
import { updateCartItems } from "../../store/actions"

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems || [],
})
const mapDispatchToProps = (dispatch) => ({
  updateCart: (item) => dispatch(updateCartItems(item)),
})

class CartItems extends Component {
  setSelectedValue = (attrib, attribute_item) => {
    // console.log(attribute_item)
    let items = JSON.parse(JSON.stringify(this.props.cartItems))

    items[this.props.index].attributes[attrib].selected = attribute_item.value
    console.log(items[this.props.index])
    this.props.updateCart(items[this.props.index])
  }

  render() {
    return (
      <>
        <li>
          <div className={styles.layout}>
            <div className={styles["first-row"]}>
              <span>
                <p className={styles.bold}></p>
                <p>{this.props.item.name}</p>
              </span>
              <p className={styles.bold}>$50.00</p>

              {this.props.item.attributes.map((attribute, attrib) => (
                <div>
                  <p className={styles.bold}>{attribute.name}:</p>
                  <div className={styles["size-box"]}>
                    {attribute.items.map((item, item_key) => {
                      if (attribute.type === "swatch")
                        return (
                          <div
                            style={{
                              backgroundColor: item.value,
                              border:
                                attribute.selected === item.value
                                  ? "2px solid #5ECE7B"
                                  : "",
                            }}
                            className={styles["color-box"]}
                          >
                            <button
                              onClick={() =>
                                this.setSelectedValue(attrib, item)
                              }
                            ></button>
                          </div>
                        )
                      else
                        return (
                          <button
                            style={{
                              backgroundColor:
                                attribute.selected === item.value
                                  ? "black"
                                  : "",
                              color:
                                attribute.selected === item.value
                                  ? "white"
                                  : "",
                            }}
                            onClick={() => this.setSelectedValue(attrib, item)}
                          >
                            {item.displayValue}
                          </button>
                        )
                    })}
                  </div>
                </div>
              ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(CartItems)
