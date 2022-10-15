export interface ProductCardData {
  id: string;
  name: string;
  image: string;
  price: {
    symbol: string | undefined;
    amount: number | undefined;
  } 
}
