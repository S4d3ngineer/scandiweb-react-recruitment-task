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
          <S.ProductPhoto src={this.props.img} alt="Product photo" className="product-photo"/>
        </Link>
        <S.ProductInfo>
          <div><span><Link to={`/product/${this.props.id}`}>{this.props.name}</Link></span></div>
          <div><span>{this.props.price.symbol}{this.props.price.amount}</span></div>
        </S.ProductInfo>
      </S.Container>
    )
  }
}
