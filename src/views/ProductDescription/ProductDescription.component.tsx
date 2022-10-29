import React from 'react';
import { useParams } from 'react-router-dom';
import * as S from './ProductDescription.styles';
import { productDataQuery } from './ProductDescription.queries';
import { client } from 'index';
import ProductData from './ProductData';

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

  // TODO change name to renderGalleryElements
  getGalleryElements = () => {
    const gallery = this.state.productData?.gallery.map((imgSource: string, index: number) => 
      <img src={imgSource} key={index} />
    )
    return (
      <React.Fragment>
        {gallery}
      </React.Fragment>
    )
  }

  handleGalleryPhotoClick = () => {
    const firstImg = this.state.productData?.gallery[0];
    console.log("Heeereee: " + firstImg);
    this.setState({
      selectedPhoto: firstImg
    })
  }

  renderSizeAttributes = () => {
    
  }

  renderColorAttributes = () => {

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
          <S.ImgGallery>{this.getGalleryElements()}</S.ImgGallery>
          <S.Img src={this.state.selectedPhoto} />
        </S.ImgContainer>
        <S.Panel>
          <div className='brand'>{brand}</div>
          <h2>{name}</h2>
          <div className='size'>SIZE: </div>
          <div className='color'>COLOR: </div>
          <div className='price'>PRICE: </div>
          <button>ADD TO CART</button>
          <div className='description' dangerouslySetInnerHTML={{ __html: desc }} />
      
        </S.Panel>
      </S.Container>
    )
  }
};

export default withParams(ProductDescription);
