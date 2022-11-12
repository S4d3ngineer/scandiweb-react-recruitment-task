import { Price } from "utils/product-data";

/**
 * Returns symbol and and amount of price from product's array of prices for selected currency 
 */
export const getPrice = (
  productPrices: Price[] | undefined,
  currencyLabel: string | undefined
): { symbol: string | undefined, amount: number | undefined } => {
  const price = productPrices?.find(price => price.currency.label === currencyLabel);
  const symbol = price?.currency.symbol;
  const amount = price?.amount;
  return { symbol, amount };
}


