import { gql } from "graphql-request"
export const query = gql`
  {
    category {
      name
      products {
        category
        id
        name
        brand
        inStock
        gallery
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`

export const productDetailsQuery = (productId) => gql`
    {
      product(id: "${productId}") {
        id
        category
        name
        brand
        gallery
        inStock
        description
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  `
export const categoriesQuery = gql`
  {
    categories {
      name
    }
  }
`
export const currencyQuery = gql`
  {
    currencies {
      label
      symbol
    }
  }
`
