import CurrencyContext from 'contexts/CurrencyContext';
import React from 'react';
import { Link } from 'react-router-dom';
import { getPrice } from 'utils/helpers';
import { Price } from 'views/ProductDescription/ProductData';
import * as S from './ProductCard.styled';

interface Props {
  id: string;
  img: string;
  name: string;
  prices: Price[];
}

export default class ProductCard extends React.Component<Props> {
  static contextType = CurrencyContext;
  context!: React.ContextType<typeof CurrencyContext>;

  render() {
    const { symbol, amount } = getPrice(this.props.prices, this.context?.currency.label);
    const formattedAmount = amount?.toFixed(2)
    return (
      <S.Container>
        <Link to={`/product/${this.props.id}`}>
          <S.ProductPhoto src={this.props.img} alt="Product photo" />
        </Link>
        <S.ProductInfo>
          <S.ProductName><Link to={`/product/${this.props.id}`}>{this.props.name}</Link></S.ProductName>
          <S.Price>{symbol}{formattedAmount}</S.Price>
        </S.ProductInfo>
      </S.Container>
    )
  }
}
