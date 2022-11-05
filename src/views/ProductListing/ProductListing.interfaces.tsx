export interface CategoryData {
  products: [{
    id: string;
    name: string;
    inStock: boolean;
    gallery: string[];
    prices: [{
      currency: {
        label: string;
        symbol: string;
      }
      amount: number;
    }]
  }]
}

