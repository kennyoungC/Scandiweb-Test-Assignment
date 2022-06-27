export const ADD_TO_CART = "ADD_TO_CART"
export const SET_CURRENCY = "SET_CURRENCY"
export const UPDATE_CART_ITEM = "UPDATE_CART_ITEM"
export const REMOVE_CART_ITEM = "REMOVE_CART_ITEM"
export const TOGGLECART = "TOGGLECART"
export const CLOSECART = "CLOSECART"
const initialState = {
  cartItems: [],
  totalQuantity: 0,
  isOpen: false,
}
const CartReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case ADD_TO_CART:
      let newProduct = payload
      console.log("newly cartItem", payload)

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
          totalPrice: newProduct.singlePrice * (existingProduct.quantity + 1),
        }
        addedItems = [...state.cartItems]
        addedItems[existingProductIndex] = updatedProduct
      }
      if (!existingProduct) {
        const newestProduct = {
          ...newProduct,
          totalPrice: newProduct.singlePrice * newProduct.quantity,
        }

        addedItems = [...state.cartItems, newestProduct]
      }
      const AlltotalPrice = addedItems.reduce(
        (acc, item) => acc + item.totalPrice,
        0
      )
      return {
        ...state,
        cartItems: addedItems,
        totalQuantity: state.totalQuantity + 1,
        AlltotalPrice,
      }

    case UPDATE_CART_ITEM:
      let updatedProduct = payload
      console.log("updatedProduct", updatedProduct)
      const existingUpdatedProductIndex = state.cartItems.findIndex(
        (product) => product.id === updatedProduct.id
      )

      let updatedItems = [...state.cartItems]
      updatedItems[existingUpdatedProductIndex] = updatedProduct

      return {
        ...state,
        cartItems: updatedItems,
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
    case TOGGLECART:
      return {
        ...state,
        isOpen: !state.isOpen,
      }
    case CLOSECART:
      return {
        ...state,
        isOpen: false,
      }
    default:
      return state
  }
}
export default CartReducer
