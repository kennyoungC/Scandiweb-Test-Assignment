export const ADD_TO_CART = "ADD_TO_CART"

export const UPDATE_CART_ITEM = "UPDATE_CART_ITEM"
export const REMOVE_CART_ITEM = "REMOVE_CART_ITEM"
const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
}
const CartReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case ADD_TO_CART:
      let newProduct = payload
      const existingProductIndex = state.cartItems.findIndex(
        (product) =>
          product.id === newProduct.id &&
          JSON.stringify(product.attributes) ===
            JSON.stringify(newProduct.attributes)
      )
      const existingProduct = state.cartItems[existingProductIndex]

      let addedItems
      if (existingProduct) {
        const updatedProduct = {
          ...existingProduct,
          quantity: existingProduct.quantity + 1,
        }
        addedItems = [...state.cartItems]
        addedItems[existingProductIndex] = updatedProduct
      }
      if (!existingProduct) {
        newProduct = {
          ...newProduct,
          quantity: 1,
        }
        addedItems = [...state.cartItems, newProduct]
      }
      return {
        ...state,
        cartItems: addedItems,
        totalQuantity: state.totalQuantity + 1,
      }

    case UPDATE_CART_ITEM:
      let updatedProduct = payload
      const existingUpdatedProductIndex = state.cartItems.findIndex(
        (product) => product.id === updatedProduct.id
      )

      let updatedItems = [...state.cartItems]
      updatedItems[existingUpdatedProductIndex] = updatedProduct
      const totalPrice = updatedItems.reduce(
        (acc, item) => acc + item.totalPrice,
        0
      )

      return {
        ...state,
        cartItems: updatedItems,
        totalPrice,
      }

    case REMOVE_CART_ITEM:
      const index = payload

      const existingItem = state.cartItems[index]

      let updatedItemsAtferRemoval
      if (existingItem.quantity === 1) {
        updatedItemsAtferRemoval = state.cartItems.filter(
          (item, i) => i !== index
        )
      } else {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity - 1,
        }
        updatedItemsAtferRemoval = [...state.cartItems]
        updatedItemsAtferRemoval[index] = updatedItem
      }
      return {
        ...state,
        totalQuantity: state.totalQuantity - 1,
        cartItems: updatedItemsAtferRemoval,
      }

    default:
      return state
  }
}
export default CartReducer
