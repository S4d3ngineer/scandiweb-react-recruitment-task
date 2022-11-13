import { gql } from "@apollo/client";

export const productDataQuery = gql`
  query getProductData($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      attributes {
        id
        name
        type
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
      brand
    }
  }
`
