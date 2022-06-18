export const ADD_TO_CART = "ADD_TO_CART"
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
      let updatedItems
      if (existingProduct) {
        const updatedProduct = {
          ...existingProduct,
          amount: existingProduct.prices.amount + newProduct.prices.amount,
        }
        updatedItems = [...state.cartItems]
        updatedItems[existingProductIndex] = updatedProduct

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
        updatedItems = [...state.cartItems, newProduct]
      }
      return {
        ...state,
        cartItems: updatedItems,
        totalQuantity: state.totalQuantity + 1,
      }
    default:
      return state
  }
}
export default CartReducer
