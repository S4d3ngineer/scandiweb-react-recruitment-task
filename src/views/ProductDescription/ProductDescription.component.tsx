import React, { ReactElement } from 'react';
import * as S from './ProductDescription.styled';
import { productDataQuery } from './ProductDescription.queries';
import { client } from 'index';
import { ProductDescriptionData, AttributeItem, Attribute } from 'utils/product-data';
import { withParams, WithParamsProps } from 'utils/wrappers';
import CurrencyContext from 'contexts/CurrencyContext';
import { CartAction, UpdateCart } from 'utils/cart';
import { getPrice } from 'utils/helpers';
import NotFound from 'views/NotFound/NotFound.component';
import { DisabledButton, PrimaryButton } from 'components/Buttons/Buttons.styled';

interface Props extends WithParamsProps {
  updateCart: UpdateCart,
}

interface State {
  initialized: boolean;
  productData: ProductDescriptionData | null;
  selectedPhoto: string | undefined;
  selectedAttributes: Record<Attribute["id"], AttributeItem["value"]>
}

class ProductDescription extends React.Component<Props, State> {
  state: State = {
    initialized: false,
    productData: null,
    selectedPhoto: undefined,
    selectedAttributes: {}
  }

  componentDidMount(): void {
    this.getProductData();
    this.setState({
      initialized: true
    })
  }

  static contextType = CurrencyContext;
  context!: React.ContextType<typeof CurrencyContext>;

  handleAttributeItemClick = (attributeId: string, itemValue: string): void => {
    this.setState({
      selectedAttributes: {
        ...this.state.selectedAttributes,
        [attributeId]: itemValue
      }
    })
  }

  /**
  * If all attributes are selected add the item to the cart
  */
  handleAddToCartClick = () => {
    if (Object.keys(this.state.selectedAttributes).length === this.state.productData?.attributes.length) {
      let itemId = this.state.productData.id;
      const attributesKeys = Object.values(this.state.selectedAttributes);
      attributesKeys.forEach((attribute: string) => itemId = itemId + '__' + attribute)
      const itemToAdd = {
        ...this.state.productData,
        selectedAttributes: this.state.selectedAttributes,
        count: 1
      }
      this.props.updateCart(CartAction.Add, itemId, itemToAdd);
    }
  }

  handleGalleryPhotoClick = (src: string): void => {
    const selectedSrc = src;
    this.setState({
      selectedPhoto: selectedSrc
    })
  }

  getProductData = async () => {
    const response = await client.query(
      {
        query: productDataQuery,
        variables: {
          id: this.props.params.id
        }
      }
    )
    const data = response.data.product;
    if (data) {
      this.setState({
        productData: data,
        selectedPhoto: data.gallery[0]
      })
    }
  }

  renderGalleryElements = (): ReactElement => {
    const galleryElements = this.state.productData?.gallery.map((imgSource: string, index: number) =>
      <img src={imgSource} draggable='false' alt={'Product photo ' + index} key={index} onClick={() => this.handleGalleryPhotoClick(imgSource)} />
    )
    return (
      <React.Fragment>
        {galleryElements}
      </React.Fragment>
    )
  }

  renderAttributes = (): ReactElement => {
    const attributeElements = this.state.productData?.attributes.map((attribute: Attribute) =>
      <React.Fragment key={attribute.id}>
        <h5>{attribute.name}:</h5>
        <S.AttributeItems>
          {this.renderAttributeItems(attribute.items, attribute.type, attribute.id)}
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
    attributeId: string
  ): ReactElement => {
    // Function declaration for both attribute types
    let attributeElement: (attributeItem: AttributeItem) => ReactElement;
    // Check if attribute is selected and return 'selected' class string if it is
    const isSelected = (attributeItem: AttributeItem) => {
      return this.state.selectedAttributes[attributeId] === attributeItem.value ? 'selected' : ''
    };

    // Define type of attribute
    if (attributeType === 'swatch') {
      attributeElement = (attributeItem) => {
        return (
          <S.SwatchAttributeBox
            className={isSelected(attributeItem)}
            key={attributeItem.id}
            onClick={() => this.handleAttributeItemClick(attributeId, attributeItem.value)}
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
            onClick={() => this.handleAttributeItemClick(attributeId, attributeItem.value)}
          >
            {attributeItem.value}
          </S.AttributeBox>
        )
      }
    }

    // Create array of attributes associated with attribute type
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
    if (!this.state.initialized) {
      return null;
    }
    if (!this.state.productData) {
      return <NotFound />;
    }
    const { brand, name, description, inStock } = this.state.productData;

    const { symbol, amount } = getPrice(this.state.productData?.prices, this.context?.currency.label);
    const formattedAmount = amount?.toFixed(2);

    return (
      <S.Container>
        <S.ImgContainer>
          <S.ImgGallery>{this.renderGalleryElements()}</S.ImgGallery>
          <S.SelectedImg src={this.state.selectedPhoto} draggable='false' alt='Selected product' />
        </S.ImgContainer>
        <S.Panel>
          <S.Brand>{brand}</S.Brand>
          <h2>{name}</h2>
          {this.renderAttributes()}
          <h6>PRICE: </h6>
          <S.Price>{symbol}{formattedAmount}</S.Price>
          {
            inStock ?
              <PrimaryButton onClick={this.handleAddToCartClick} $width={280} $fontSize={16}>ADD TO CART</PrimaryButton> :
              <DisabledButton disabled $width={280} $fontSize={16}>OUT OF STOCK</DisabledButton>
          }
          <S.Description dangerouslySetInnerHTML={{ __html: description }} />
        </S.Panel>
      </S.Container>
    )
  }
}

export default withParams(ProductDescription);
