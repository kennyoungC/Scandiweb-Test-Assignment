import { configureStore, combineReducers } from "@reduxjs/toolkit"
import productReducer from "./reducers/ProductReducer"
import currencyReducer from "./reducers/CurrencyReducer"

const rootReducer = combineReducers({
  productList: productReducer,
  currency: currencyReducer,
})

const store = configureStore({
  reducer: rootReducer,
})

export default store
