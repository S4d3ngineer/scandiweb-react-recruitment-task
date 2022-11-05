import { gql } from "@apollo/client"

export const categoryNamesQuery = gql`
  query getCategoryNames {
    categories {
      name
    }
  } 
`
