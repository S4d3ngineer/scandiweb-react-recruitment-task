export interface ProductCardData {
  name: string;
  image: string;
  price: {
    symbol: string | undefined;
    amount: number | undefined;
  } 
}
