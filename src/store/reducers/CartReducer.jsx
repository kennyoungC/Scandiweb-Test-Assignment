export const ADD_TO_CART = "ADD_TO_CART"
export const UPDATE_CART_ITEM = "UPDATE_CART_ITEM"
const initialState = {
  cartItems: [],
  totalQuantity: 0,
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

          amount: existingProduct.prices.amount + newProduct.prices.amount,
        }
        addedItems = [...state.cartItems]
        addedItems[existingProductIndex] = updatedProduct

        // newProduct = {
        //   name: newProduct.name,
        //   id: newProduct.id,
        //   price: newProduct.prices.amount,
        //   gallery: newProduct.gallery,
        //   attributes: newProduct.attributes,
        //   quantity: 1,
        //   totalPrice: newProduct.prices.amount,
        // }
        // return {
        //   ...state,
        //   //  existingProduct.quantity++,
        //   //   existingProduct.totalPrice += newProduct.price,
        //   totalQuantity: state.totalQuantity + 1,
        // }
      } else {
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

      return {
        cartItems: updatedItems,
      }
    default:
      return state
  }
}
export default CartReducer
