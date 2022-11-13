import { gql } from "@apollo/client";

export const categoryDataQuery = gql`
  query getCategoryDataQuery($input: CategoryInput) {
    category(input: $input) {
      products {
        id
        name
        brand
        inStock
        gallery
        attributes {
          id
          name
          items {
            id
            value
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
