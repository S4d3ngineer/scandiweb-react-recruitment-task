import { OutlineButton, PrimaryButton } from "components/Buttons/Buttons.styled";
import CurrencyContext from "contexts/CurrencyContext";
import React, { ReactElement } from "react";
import { AttributeItem, Attribute } from "utils/product-data";
import * as S from './CartOverlay.styled';
import { ReactComponent as PlusSquare } from "assets/icons/PlusSquare.svg";
import { ReactComponent as MinusSquare } from "assets/icons/MinusSquare.svg";
import { getPrice } from "utils/helpers";
import { Cart, CartAction, CartItemData, UpdateCart } from "utils/cart";

interface Props {
  cart: Cart;
  dimmSetter: (isDimmed: boolean) => void;
  updateCart: UpdateCart;
}

interface State {
  isShown: boolean;
}

export default class CartOverlay extends React.Component<Props, State> {
  state: State = {
    isShown: false
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentDidUpdate(_: Props, prevState: State): void {
    if (this.state.isShown !== prevState.isShown) {
      this.props.dimmSetter(this.state.isShown);
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  static contextType = CurrencyContext;
  context!: React.ContextType<typeof CurrencyContext>;

  showMenu = (): void => {
    if (!this.state.isShown) {
      this.setState({
        isShown: true
      })
    }
  }

  hideMenu = (): void => {
    if (this.state.isShown) {
      this.setState({
        isShown: false
      })
    }
  }

  wrapperRef = React.createRef<HTMLDivElement>();

  handleClickOutside = (event: globalThis.MouseEvent) => {
    if (this.wrapperRef && !this.wrapperRef.current?.contains(event.target as HTMLElement)) {
      event.preventDefault();
      event.stopPropagation()
      this.hideMenu();
    }
  }

  renderCartItems = () => {
    const cartItemsEntries = Object.entries(this.props.cart.items);
    const cartItems = cartItemsEntries.map(([id, product]) => {
      const { symbol, amount } = getPrice(product.prices, this.context?.currency.label);
      return (
        <S.Item key={id}>
          <S.ItemInfo>
            <S.NameContainer>
              <div>{product.brand}</div>
              <div>{product.name}</div>
            </S.NameContainer>
            <S.Price>{symbol}{amount}</S.Price>
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
          <img alt={product.name + ' photo'} src={product.gallery[0]} />
        </S.Item>
      )
    })
    return (
      <>
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

  renderAttributeItems = (attributeItems: AttributeItem[], attributeType: string, attributeId: string, selectedAttributes: CartItemData['selectedAttributes']): ReactElement => {

    let attributeElement: (attributeItem: AttributeItem) => ReactElement;

    const isSelected = (attributeItem: AttributeItem) => selectedAttributes[attributeId] === attributeItem.value ? 'selected' : '';

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
    const price = this.props.cart.totalPrice;
    const formattedPrice = price === 'error'? price : price.toFixed(2);
    return (
      <S.Container>
        <button onClick={this.showMenu}>
          <S.CartIcon />
        </button>
        {this.state.isShown &&
          <S.Overlay ref={this.wrapperRef}>
            <span><b>My Bag, </b>{this.props.cart.itemCount} items</span>
            <S.Items>
              {this.renderCartItems()}
            </S.Items>
            <S.Summary><span>Total</span><span>{currencySymbol}{formattedPrice}</span></S.Summary>
            <S.ButtonsContainer>
              <OutlineButton $width={140} $height={40} $fontSize={14}>VIEW BAG</OutlineButton>
              <PrimaryButton $width={140} $height={40} $fontSize={14}>CHECK OUT</PrimaryButton>
            </S.ButtonsContainer>
          </S.Overlay>
        }
      </S.Container>
    )
  }
}
