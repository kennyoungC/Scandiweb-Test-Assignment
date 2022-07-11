export const TOGGLE_CURRENCY_MENU = "TOGGLE_CURRENCY_MENU"
export const CLOSE_CURRENCY_MENU = "CLOSE_CURRENCY_MENU"

// export const SET_CURRENCY = "SET_CURRENCY"
const initialState = {
  isOpen: false,
  // currency: {
  //   label: "USD",
  //   symbol: "$",
  // },
}

const currencyReducer = (state = initialState, action) => {
  const { type } = action
  switch (type) {
    case TOGGLE_CURRENCY_MENU:
      return {
        ...state,
        isOpen: !state.isOpen,
      }
    case CLOSE_CURRENCY_MENU:
      return {
        ...state,
        isOpen: false,
      }
    // case SET_CURRENCY:
    //   return {
    //     ...state,
    //     currency: payload,
    //   }
    default:
      return state
  }
}

export default currencyReducer
