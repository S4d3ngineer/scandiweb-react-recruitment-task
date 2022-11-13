export interface ProductCardData {
  id: string;
  name: string;
  brand: string;
  inStock: boolean;
  gallery: string[];
  prices: Price[];
  attributes: Attribute[];
}

export interface ProductDescriptionData extends ProductCardData {
  description: string;
}

export interface Attribute {
  id: string;
  name: string;
  type: string;
  items: AttributeItem[];
}

export interface AttributeItem {
  id: string;
  value: string;
}

export interface Price {
  currency: Currency;
  amount: number;
}

export interface Currency {
  label: string;
  symbol: string;
}
