export const GET_PRODUCTS = "GET_PRODUCTS"
export const LOADING_SPINNER = "LOADING_SPINNER"
export const SET_ERROR = "SET_ERROR"
const initialState = {
  isError: false,
  products: [],
  errorMsg: "",
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

    default:
      return state
  }
}
export default productReducer
