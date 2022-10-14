import React from 'react';
import * as S from './ProductCard.styles';

interface Props {
  key: number;
  img: string;
  name: string;
  price: {
    symbol: string | undefined;
    amount: number | undefined;
  };
}

export default class ProductCard extends React.Component<Props> {
  // TODO add coresponding routes for anchors
  render() {
    return (
      <S.Container>
        <a href="/">
          <S.ProductPhoto src={this.props.img} alt="Product photo" className="product-photo"/>
        </a>
        <S.ProductInfo className="product-info">
          <div><span><a href='/'>{this.props.name}</a></span></div>
          <div><span>{this.props.price.symbol}{this.props.price.amount}</span></div>
        </S.ProductInfo>
      </S.Container>
    )
  }
}
