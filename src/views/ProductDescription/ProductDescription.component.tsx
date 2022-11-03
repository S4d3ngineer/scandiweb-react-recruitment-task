import React, { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import * as S from './ProductDescription.styles';
import { productDataQuery } from './ProductDescription.queries';
import { client } from 'index';
import { ProductData, Attribute, AttributeSet } from './ProductData';

interface WithParamsProps {
  params: Record<string, string>;
}

interface Props extends WithParamsProps {
}

const withParams = <Props extends WithParamsProps>(
  WrappedComponent: React.ComponentType<Props>
) => {
  return (props: Omit<Props, keyof WithParamsProps>) => {
    const params = useParams();
    
    return (
      <WrappedComponent
        {...(props as Props)}
        params={params}
      />
    )
  }
}

// TODO take care of undefined in selectedPhoto
interface State {
  productData: ProductData | null;
  selectedPhoto: string | undefined;
}

class ProductDescription extends React.Component<Props, State> {
  state: State = {
    productData: null,
    selectedPhoto: undefined
  }

  // TODO should I declare return type?
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

  // TODO add alt to images
  renderGalleryElements = (): ReactElement => {
    const galleryElements = this.state.productData?.gallery.map((imgSource: string, index: number) => 
      <img src={imgSource} draggable='false' key={index} onClick={() => this.handleGalleryPhotoClick(imgSource)} />
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
    const attributeElements = this.state.productData?.attributes.map((attribute: AttributeSet, index: number) => 
      <React.Fragment>
        <div className='attributeName' key={'name' + index}>{attribute.name}:</div>
        <div className='attributeItems' key={'item' + index}>{this.renderAttributeItems(attribute.items, attribute.type)}</div>
      </React.Fragment>
    )
    return (
      <React.Fragment>
        {attributeElements}
      </React.Fragment>
    )
  }

  renderAttributeItems = (items: Attribute[], type: string): ReactElement => {
      let attributeElement: (item: Attribute, index: number) => ReactElement;
      if (type === 'swatch') {
        attributeElement = (item, index) => <div className='swatchAttributeBox' key={index} style={{backgroundColor: item.value}}></div>;
      } else {
        attributeElement = (item, index) => <div className='attributeBox' key={index}>{item.value}</div>;
      }

    const itemElements = items.map((item: Attribute, index: number) => 
      attributeElement(item, index)
    )
    return (
      <React.Fragment>
        {itemElements}
      </React.Fragment>
    )
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
    return (
      <S.Container>
        <S.ImgContainer>
          <S.ImgGallery>{this.renderGalleryElements()}</S.ImgGallery>
          <S.Img src={this.state.selectedPhoto} draggable='false' />
        </S.ImgContainer>
        <S.Panel>
          <div className='brand'>{brand}</div>
          <h2>{name}</h2>
          {this.renderAttributes()}
          <div className='price'>PRICE: </div>
          <button>ADD TO CART</button>
          <div className='description' dangerouslySetInnerHTML={{ __html: desc }} />
      
        </S.Panel>
      </S.Container>
    )
  }
};

export default withParams(ProductDescription);
