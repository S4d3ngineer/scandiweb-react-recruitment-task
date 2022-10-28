export default interface ProductData {
  name: string;
  gallery: string[];
  description: string;
  attributes: {
    id: string;
    name: string;
    type: string;
    items: Attribute[];
  }
  prices: Price[];
  brand: string;
}

interface Attribute {
  displayValue: string;
  value: string;
  id: string;
}

interface Price {
  currency: Currency[];
  amount: number;
}

interface Currency {
  label: string;
  symbol: string;
}
