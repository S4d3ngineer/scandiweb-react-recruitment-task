import CurrencyContext from 'contexts/CurrencyContext';
import React, { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { CartAction, UpdateCart } from 'utils/cart';
import { getPrice } from 'utils/helpers';
import { Attribute, ProductCardData } from 'utils/product-data';
import * as S from './ProductCard.styled';

interface Props {
  productData: ProductCardData;
  updateCart: UpdateCart;
}

export default class ProductCard extends React.Component<Props> {
  static contextType = CurrencyContext;
  context!: React.ContextType<typeof CurrencyContext>;

  handleAddToCart = (e: MouseEvent ) => {
    e.preventDefault();
    e.stopPropagation();
    let itemId = this.props.productData.id;
    let selectedAttributes = {};
    this.props.productData.attributes.map((attribute: Attribute) => { 
      const defaultAttribute = attribute.items[0];
      itemId = itemId + '__' + defaultAttribute.value;
      selectedAttributes = {
        ...selectedAttributes,
        [attribute.id]: defaultAttribute.value
      } 
    })
    const itemToAdd = {
      ...this.props.productData,
      selectedAttributes,
      count: 1
    }
    this.props.updateCart(CartAction.Add, itemId, itemToAdd);
  }

  render() {
    const { id, name, inStock, gallery, prices } = this.props.productData;
    const img = gallery[0];
    const { symbol, amount } = getPrice(prices, this.context?.currency.label);
    const formattedAmount = amount?.toFixed(2)

    return (
      <S.Container>
        <S.PhotoContainer>
          <Link to={`/product/${id}`}>
            <S.ProductPhoto src={img} alt={name} />
            {!inStock && <S.Overlay>OUT OF STOCK</S.Overlay>}
            {
              inStock &&
              <S.AddToCartButton onClick={this.handleAddToCart}>
                <S.CartIcon width='52' height='52' viewBox='-12 -14 46 46' />
              </S.AddToCartButton>
            }
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
