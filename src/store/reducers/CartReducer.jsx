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
        (product) => product.id === newProduct.id
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
      } else {
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
      // const existingUpdatedProduct =
      //   state.cartItems[existingUpdatedProductIndex]
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
      const id = payload
      const existingCartItemIndex = state.cartItems.findIndex(
        (item) => item.id === id
      )
      const existingItem = state.cartItems[existingCartItemIndex]

      let updatedItemsAtferRemoval
      if (existingItem.quantity === 1) {
        updatedItemsAtferRemoval = state.cartItems.filter(
          (item) => item.id !== id
        )
      } else {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity - 1,
        }
        updatedItemsAtferRemoval = [...state.cartItems]
        updatedItemsAtferRemoval[existingCartItemIndex] = updatedItem
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
