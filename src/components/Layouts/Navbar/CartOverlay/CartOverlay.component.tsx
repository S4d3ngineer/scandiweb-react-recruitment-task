import { OutlineButton, PrimaryButton } from "components/Buttons/Buttons.styled";
import CurrencyContext from "contexts/CurrencyContext";
import React, { ReactElement } from "react";
import { AttributeItem, Attribute } from "utils/product-data";
import * as S from './CartOverlay.styled';
import { ReactComponent as PlusSquare } from "assets/icons/PlusSquare.svg";
import { ReactComponent as MinusSquare } from "assets/icons/MinusSquare.svg";
import { getPrice } from "utils/helpers";
import { CartData, CartAction, CartItemData, UpdateCart } from "utils/cart";
import { Link } from "react-router-dom";

interface Props {
  cart: CartData;
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

  renderCartItems = (): ReactElement => {
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
          <img alt={product.name} src={product.gallery[0]} />
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

  renderAttributeItems = (
    attributeItems: AttributeItem[],
    attributeType: string,
    attributeId: string,
    selectedAttributes: CartItemData['selectedAttributes']
  ): ReactElement => {

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
    const isShown = this.state.isShown;
    const currencySymbol = this.context?.currency.symbol;
    const { totalPrice, itemCount } = this.props.cart;
    const formattedPrice = totalPrice === 'error' ? totalPrice : totalPrice.toFixed(2);

    const counterIcon = itemCount ?
      (<S.CounterIcon>
        {itemCount}
      </S.CounterIcon>) :
      null;

    const quantitativeWord = itemCount === 1 ?
      'item' :
      'items';

    return (
      <S.Container>
        <button onClick={this.showMenu}>
          <S.CartIcon />
          {counterIcon}
        </button>
        {isShown &&
          <>
            <S.Overlay ref={this.wrapperRef}>
              <span><b>My Bag, </b>{itemCount} {quantitativeWord}</span>
              <S.Items>
                {this.renderCartItems()}
              </S.Items>
              <S.Summary><span>Total</span><span>{currencySymbol}{formattedPrice}</span></S.Summary>
              <S.ButtonsContainer>
                <Link to='/cart' onClick={this.hideMenu} >
                  <OutlineButton $width={140} $height={40} $fontSize={14}>VIEW BAG</OutlineButton>
                </Link>
                <PrimaryButton $width={140} $height={40} $fontSize={14}>CHECK OUT</PrimaryButton>
              </S.ButtonsContainer>
            </S.Overlay>
            <S.EventShield />
          </>
        }
      </S.Container>
    )
  }
}
