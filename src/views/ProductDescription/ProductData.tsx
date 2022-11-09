export interface ProductData {
  id: string;
  name: string;
  inStock: boolean;
  gallery: string[];
  description: string;
  attributes: Attribute[];
  prices: Price[];
  brand: string;
}

export interface Attribute {
  id: string;
  name: string;
  type: string;
  items: AttributeItem[];
}

export interface AttributeItem {
  displayValue: string;
  value: string;
  id: string;
}

export interface Price {
  currency: Currency;
  amount: number;
}

export interface Currency {
  label: string;
  symbol: string;
}
