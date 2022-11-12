import { gql } from "@apollo/client";

export const currenciesQuery = gql`
  query getCurrenciesQuery {
    currencies {
      label
      symbol
    }
  }
`
