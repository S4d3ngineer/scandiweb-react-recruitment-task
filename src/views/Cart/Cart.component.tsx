import CurrencyContext from "contexts/CurrencyContext";
import React, { ReactElement } from "react";
import { CartAction, CartData, CartItemData, UpdateCart } from "utils/cart";
import { getPrice } from "utils/helpers";
import * as S from "./Cart.styled";
import { ReactComponent as PlusSquare } from "assets/icons/PlusSquare.svg";
import { ReactComponent as MinusSquare } from "assets/icons/MinusSquare.svg";
import { Attribute, AttributeItem } from "utils/product-data";
import { PrimaryButton } from "components/Buttons/Buttons.styled";
import SlideShow from "./Slideshow/SlideShow.component";
import { taxPercent } from "utils/constants";

interface Props {
  cart: CartData;
  updateCart: UpdateCart;
}

export default class Cart extends React.Component<Props> {
  static contextType = CurrencyContext;
  context!: React.ContextType<typeof CurrencyContext>;

  renderCartItems = (): ReactElement => {
    const cartItemsEntries = Object.entries(this.props.cart.items);

    const cartItems = cartItemsEntries.map(([id, product]) => {
      const { symbol, amount } = getPrice(product.prices, this.context?.currency.label);

      return (
        <React.Fragment key ={id}>
          <S.Item>
            <S.ItemInfo>
              <S.NameContainer>
                <div>{product.brand}</div>
                <div>{product.name}</div>
              </S.NameContainer>
              <S.Price>{symbol}{amount?.toFixed(2)}</S.Price>
              {this.renderAttributes(product)}
            </S.ItemInfo>
            <S.CountManipulator>
              <button onClick={() => this.props.updateCart(CartAction.Add, id)}>
                <PlusSquare />
              </button>
              {product.count}
              <button onClick={() => this.props.updateCart(CartAction.Remove, id)}>
                <MinusSquare />
              </button>
            </S.CountManipulator>
            <SlideShow gallery={product.gallery} productName={product.name} />
          </S.Item>
          <hr />
        </React.Fragment>
      )
    })
    return (
      <>
        <hr />
        {cartItems}
      </>
    )
  }

  renderAttributes = (product: CartItemData): ReactElement => {
    const attributeElements = product.attributes.map((attribute: Attribute) =>
      <React.Fragment key={attribute.id}>
        <h5>{attribute.name}:</h5>
        <S.AttributeItems>
          {this.renderAttributeItems(
            attribute.items,
            attribute.type,
            attribute.id,
            product.selectedAttributes
          )}
        </S.AttributeItems>
      </React.Fragment>
    )
    return (
      <React.Fragment>
        {attributeElements}
      </React.Fragment>
    )
  }

  renderAttributeItems = (
    attributeItems: AttributeItem[],
    attributeType: string,
    attributeId: string,
    selectedAttributes: CartItemData['selectedAttributes']
  ): ReactElement => {

    let attributeElement: (attributeItem: AttributeItem) => ReactElement;

    const isSelected = (attributeItem: AttributeItem) => {
      return selectedAttributes[attributeId] === attributeItem.value ? 'selected' : ''
    };

    if (attributeType === 'swatch') {
      attributeElement = (attributeItem) => {
        return (
          <S.SwatchAttributeBox
            className={isSelected(attributeItem)}
            key={attributeItem.id}
            style={{ backgroundColor: attributeItem.value }}
          >
          </S.SwatchAttributeBox>
        )
      };
    } else {
      attributeElement = (attributeItem) => {
        return (
          <S.AttributeBox
            className={isSelected(attributeItem)}
            key={attributeItem.id}
          >
            {attributeItem.value}
          </S.AttributeBox>
        )
      }
    }

    const itemElements = attributeItems.map((attributeItem: AttributeItem) =>
      attributeElement(attributeItem)
    )
    return (
      <React.Fragment>
        {itemElements}
      </React.Fragment>
    )
  }

  render() {
    const currencySymbol = this.context?.currency.symbol;
    const { totalPrice, itemCount } = this.props.cart;
    const formattedPrice = totalPrice === 'error' ? totalPrice : totalPrice.toFixed(2);
    const formattedTax = totalPrice === 'error' ? totalPrice : (totalPrice * taxPercent / 100).toFixed(2);

    return (
      <S.Container>
        <h2>CART</h2>
        <S.Items>
          {this.renderCartItems()}
        </S.Items>
        <S.SummaryTable>
          <tbody>
            <tr>
              <th>Tax {taxPercent}%:</th>
              <td>{currencySymbol}{formattedTax}</td>
            </tr>
            <tr>
              <th>Quantity:</th>
              <td>{itemCount}</td>
            </tr>
            <tr>
              <th>Total:</th>
              <td>{currencySymbol}{formattedPrice}</td>
            </tr>
          </tbody>
        </S.SummaryTable>
        <S.ButtonContainer>
          <PrimaryButton $width={280} $fontSize={16}>ORDER</PrimaryButton>
        </S.ButtonContainer>
      </S.Container>
    )
  }
}
