import CurrencyContext from 'contexts/CurrencyContext';
import React from 'react';
import { Link } from 'react-router-dom';
import { getPrice } from 'utils/helpers';
import { Price } from 'utils/product-data';
import * as S from './ProductCard.styled';

interface Props {
  id: string;
  img: string;
  name: string;
  prices: Price[];
  inStock: boolean;
}

export default class ProductCard extends React.Component<Props> {
  static contextType = CurrencyContext;
  context!: React.ContextType<typeof CurrencyContext>;

  render() {
    const { symbol, amount } = getPrice(this.props.prices, this.context?.currency.label);
    const formattedAmount = amount?.toFixed(2)
    const { id, img, name, inStock } = this.props;

    return (
      <S.Container>
        <S.PhotoContainer>
          <Link to={`/product/${id}`}>
            <S.ProductPhoto src={img} alt="Product photo" />
            {!inStock && <S.Overlay>OUT OF STOCK</S.Overlay>}
          </Link>
        </S.PhotoContainer>
        <S.ProductInfo>
          <S.ProductName><Link to={`/product/${id}`}>{name}</Link></S.ProductName>
          <S.Price>{symbol}{formattedAmount}</S.Price>
          {!inStock && <S.Overlay />}
        </S.ProductInfo>
      </S.Container>
    )
  }
}
