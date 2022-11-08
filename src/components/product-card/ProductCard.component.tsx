import React from 'react';
import { Link } from 'react-router-dom';
import * as S from './ProductCard.styled';

interface Props {
  id: string;
  img: string;
  name: string;
  price: {
    symbol: string | undefined;
    amount: number | undefined;
  };
}

export default class ProductCard extends React.Component<Props> {
  render() {
    return (
      <S.Container>
        <Link to={`/product/${this.props.id}`}>
          <S.ProductPhoto src={this.props.img} alt="Product photo" />
        </Link>
        <S.ProductInfo>
          <S.ProductName><Link to={`/product/${this.props.id}`}>{this.props.name}</Link></S.ProductName>
          <S.Price>{this.props.price.symbol}{this.props.price.amount}</S.Price>
        </S.ProductInfo>
      </S.Container>
    )
  }
}
