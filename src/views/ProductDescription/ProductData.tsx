export interface ProductData {
  name: string;
  inStock: boolean;
  gallery: string[];
  description: string;
  attributes: AttributeSet[];
  prices: Price[];
  brand: string;
}

export interface AttributeSet {
  id: string;
  name: string;
  type: string;
  items: Attribute[];
}

export interface Attribute {
  displayValue: string;
  value: string;
  id: string;
}

interface Price {
  currency: Currency;
  amount: number;
}

interface Currency {
  label: string;
  symbol: string;
}
