export const GET_PRODUCTS = "GET_PRODUCTS"
export const UPDATE_PRODUCT_ITEM = "UPDATE_PRODUCT_ITEM"
export const LOADING_SPINNER = "LOADING_SPINNER"
export const SET_ERROR = "SET_ERROR"
const initialState = {
  isError: false,
  products: [],
  errorMsg: "",
  productPrice: [],
}

const productReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: payload,
      }
    case SET_ERROR:
      return {
        ...state,
        isError: true,
        errorMsg: payload,
      }
    case UPDATE_PRODUCT_ITEM:
      let productToBeUpdated = payload
      const existingProductToBeUpdatedIndex = state.products.products.findIndex(
        (product) => product.id === productToBeUpdated.id
      )
      let updatedItems = {
        ...state.products,
        products: [...state.products.products],
      }
      updatedItems.products[existingProductToBeUpdatedIndex] =
        productToBeUpdated

      return {
        ...state,
        products: updatedItems,
      }
    default:
      return state
  }
}
export default productReducer
