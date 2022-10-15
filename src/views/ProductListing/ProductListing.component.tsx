import ProductCard from "components/product-card/ProductCard.component";
import React from "react";
import { ProductCardData } from "./ProductCardData";
import * as S from "./ProductListing.styles";

interface Props {
  productList: ProductCardData[] | null | undefined;
}

export default class ProductListing extends React.Component<Props> {

  renderProductList() {
    console.log(this.props.productList);
    const productListContent = this.props.productList?.map((product, index) => 
      <ProductCard id={product.id} img={product.image} name={product.name} price={product.price} key={index} />
    )
    return (
      <React.Fragment>
        {productListContent}
      </React.Fragment>
    ) 
  }

  componentDidMount(): void {
    this.renderProductList();
  }

  render() {
    return (
      <S.Container>
        <S.HeadingContainer>
          <h2>all</h2>
        </S.HeadingContainer>
        <S.ProductList>
          {this.renderProductList()}
        </S.ProductList>
      </S.Container>
    ) 
  } 
}
