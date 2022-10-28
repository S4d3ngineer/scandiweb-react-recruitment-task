import { gql } from "@apollo/client";

export const productDataQuery = gql`
  query getProductData($id: String!) {
    product(id: $id) {
      name
      gallery
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
      brand
    }
  }
`
