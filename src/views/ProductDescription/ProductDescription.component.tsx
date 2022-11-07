import React, { ReactElement } from 'react';
import * as S from './ProductDescription.styled';
import { productDataQuery } from './ProductDescription.queries';
import { client } from 'index';
import { ProductData, Attribute, AttributeSet } from './ProductData';
import { withParams, WithParamsProps } from 'utils/wrappers';
import { PrimaryButton } from 'components/buttons/Buttons.styled';

interface Props extends WithParamsProps {
  currency: string;
}

interface State {
  productData: ProductData | null;
  selectedPhoto: string | undefined;
  selectedAttributes: Record<AttributeSet["id"], Attribute["value"]>
}

class ProductDescription extends React.Component<Props, State> {
  state: State = {
    productData: null,
    selectedPhoto: undefined,
    selectedAttributes: {}
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
    this.setState({
      productData: data,
      selectedPhoto: data.gallery[0]
    })
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

  handleGalleryPhotoClick = (src: string): void => {
    const selectedSrc = src;
    this.setState({
      selectedPhoto: selectedSrc
    })
  }

  renderAttributes = (): ReactElement => {
    const attributeElements = this.state.productData?.attributes.map((attribute: AttributeSet) =>
      <React.Fragment key={attribute.id}>
        <div className='attributeName' key={attribute.id + '__heading'}>{attribute.name}:</div>
        <div className='attributeItems' key={attribute.id + '__items'}>
          {this.renderAttributeItems(attribute.items, attribute.type, attribute.id)}
        </div>
      </React.Fragment>
    )
    return (
      <React.Fragment>
        {attributeElements}
      </React.Fragment>
    )
  }

  renderAttributeItems = (items: Attribute[], type: string, attributeId: string): ReactElement => {
    let attributeElement: (item: Attribute) => ReactElement;
    if (type === 'swatch') {
      attributeElement = (item) => {
        let classNames = 'swatchAttributeBox';
        if (this.state.selectedAttributes[attributeId] === item.value) classNames += ' selectedSwatchAttribute'
        return (
          <div
            className={classNames}
            key={item.id}
            onClick={() => this.handleAttributeItemClick(attributeId, item.value)}
            style={{ backgroundColor: item.value }}
          >
          </div>
        )
      };
    } else {
      attributeElement = (item) => {
        let classNames = 'attributeBox';
        if (this.state.selectedAttributes[attributeId] === item.value) classNames += ' selectedAttribute'
        return (
          <div
            className={classNames}
            key={item.id}
            onClick={() => this.handleAttributeItemClick(attributeId, item.value)}
          >
            {item.value}
          </div>
        )
      }
    }

    const itemElements = items.map((item: Attribute) =>
      attributeElement(item)
    )
    return (
      <React.Fragment>
        {itemElements}
      </React.Fragment>
    )
  }

  handleAttributeItemClick = (attributeId: string, itemValue: string): void => {
    this.setState({
      selectedAttributes: {
        ...this.state.selectedAttributes,
        [attributeId]: itemValue
      }
    })
  }

  getPrice = (): {symbol: string | undefined, amount: number | undefined} => {
    const price = this.state.productData?.prices.find(price => price.currency.label === this.props.currency);
    const symbol = price?.currency.symbol;
    const amount = price?.amount;
    return { symbol, amount };
  }

  componentDidMount(): void {
    this.getProductData();
  }

  render() {
    if (!this.state.productData) {
      return null;
    }
    const brand = this.state.productData?.brand;
    const name = this.state.productData?.name;
    const desc = this.state.productData?.description;
    const { symbol, amount } = this.getPrice();
    return (
      <S.Container>
        <S.ImgContainer>
          <S.ImgGallery>{this.renderGalleryElements()}</S.ImgGallery>
          <S.Img src={this.state.selectedPhoto} draggable='false' alt='Selected product photo' />
        </S.ImgContainer>
        <S.Panel>
          <div className='brand'>{brand}</div>
          <h2>{name}</h2>
          {this.renderAttributes()}
          <div className='priceHeading'>PRICE: </div>
          <div className='price'>{symbol + ' ' + amount}</div>
          <PrimaryButton className='primary' $width={280} $fontSize={16}>ADD TO CART</PrimaryButton>
          <div className='description' dangerouslySetInnerHTML={{ __html: desc }} />

        </S.Panel>
      </S.Container>
    )
  }
}

export default withParams(ProductDescription);
