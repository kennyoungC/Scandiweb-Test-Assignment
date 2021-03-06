import { configureStore, combineReducers } from "@reduxjs/toolkit"
import productReducer from "./reducers/ProductReducer"
import currencyReducer from "./reducers/CurrencyReducer"
import CartReducer from "./reducers/CartReducer"

import { persistStore, persistReducer } from "redux-persist"
import storageSession from "redux-persist/lib/storage/session"
import { encryptTransform } from "redux-persist-transform-encrypt"

const persistConfig = {
  key: "root",
  storage: storageSession,
  transforms: [
    encryptTransform({
      // encrypt the data with a public password so it won't throw an error
      secretKey: "my-super-secret-key",
      onError: (error) => {
        console.log(error)
      },
    }),
  ],
}

const rootReducer = combineReducers({
  productList: productReducer,
  currency: currencyReducer,
  cart: CartReducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)
