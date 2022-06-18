import { configureStore, combineReducers } from "@reduxjs/toolkit"
import productReducer from "./reducers/ProductReducer"
import currencyReducer from "./reducers/CurrencyReducer"
import CartReducer from "./reducers/CartReducer"

const rootReducer = combineReducers({
  productList: productReducer,
  currency: currencyReducer,
  cart: CartReducer,
})

const store = configureStore({
  reducer: rootReducer,
})

export default store
