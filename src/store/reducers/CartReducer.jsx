export const ADD_TO_CART = "ADD_TO_CART"
export const SET_CURRENCY = "SET_CURRENCY"
export const UPDATE_CART_ITEM = "UPDATE_CART_ITEM"
export const REMOVE_CART_ITEM = "REMOVE_CART_ITEM"
export const TOGGLECART = "TOGGLECART"
export const CLOSECART = "CLOSECART"
export const CLEARCART = "CLEARCART"
export const SET_TOTAL_AMT = "SET_TOTAL_AMT"
const initialState = {
  cartItems: [],
  totalQuantity: 0,
  isOpen: false,
  currency: {
    label: "USD",
    symbol: "$",
  },
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

      return {
        ...state,
        cartItems: addedItems,
        totalQuantity: state.totalQuantity + 1,
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
    case CLEARCART:
      return {
        ...state,
        cartItems: [],
        totalQuantity: 0,
        AlltotalPrice: 0,
      }
    case SET_TOTAL_AMT:
      const getPriceLabel = (prices, currency) => {
        let price_ = 0
        prices.forEach((price) => {
          if (price.currency.label === currency) {
            price_ = price.amount
            return
          }
        })
        return price_
      }
      const newCartItems = state.cartItems.map((product) => {
        return {
          ...product,
          singlePrice: getPriceLabel(product.prices, state.currency.label),
          totalPrice:
            getPriceLabel(product.prices, state.currency.label) *
            product.quantity,
        }
      })

      const AlltotalPrice = newCartItems.reduce(
        (acc, item) => acc + item.totalPrice,
        0
      )
      return {
        ...state,
        AlltotalPrice,
      }
    case SET_CURRENCY:
      return {
        ...state,
        currency: payload,
      }
    default:
      return state
  }
}

export default CartReducer
