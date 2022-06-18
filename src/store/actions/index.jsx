import { ADD_TO_CART } from "../reducers/CartReducer"
import {
  CLOSE_CURRENCY_MENU,
  TOGGLE_CURRENCY_MENU,
} from "../reducers/CurrencyReducer"
import { GET_PRODUCTS, SET_ERROR } from "../reducers/ProductReducer"

export const getAllProducts = (products) => ({
  type: GET_PRODUCTS,
  payload: products,
})
export const setError = (errMsg) => ({
  type: SET_ERROR,
  payload: errMsg,
})
export const toggleCurrencyMenu = () => ({
  type: TOGGLE_CURRENCY_MENU,
})
export const closeCurrencyMenu = () => ({
  type: CLOSE_CURRENCY_MENU,
})
export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
})
