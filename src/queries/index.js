import { gql } from "graphql-request"

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

export const catQuery = (cat) => {
  return gql`
  {
    
    category(input: { title:"${cat}" }) {
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name

          type
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  }
`
}
