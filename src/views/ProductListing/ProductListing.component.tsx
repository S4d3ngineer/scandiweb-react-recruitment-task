import ProductCard from "components/product-card/ProductCard.component";
import { client } from "index";
import React, { ReactElement } from "react";
import { withParams, WithParamsProps } from "utils/wrappers";
import { CategoryData } from "./ProductListing.interfaces";
import { categoryDataQuery } from "./ProductListing.queries";
import * as S from "./ProductListing.styled";

interface Props extends WithParamsProps { }

interface State {
  category: string,
  productsData: CategoryData | null
}

class ProductListing extends React.Component<Props, State> {
  state: State = {
    category: this.props.params.category || 'all',
    productsData: null
  }

  componentDidMount(): void {
    this.getProductsData();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.params.category !== prevProps.params.category) {
      this.getProductsData();
    }
  }

  getProductsData = async () => {
    const response = await client.query({
      query: categoryDataQuery,
      variables: {
        input: {
          title: this.props.params.category || 'all'
        }
      }
    });
    const data = response.data.category;
    this.setState({
      productsData: data
    })
  }

  renderProductList = (): ReactElement => {
    const productListContent = this.state.productsData?.products.map(product => {
      return <ProductCard id={product.id} img={product.gallery[0]} name={product.name} prices={product.prices} key={product.id} />
    })
    return (
      <React.Fragment>
        {productListContent}
      </ React.Fragment>
    )
  }

  render() {
    if (!this.state.productsData) {
      return null;
    }
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

export default withParams(ProductListing);
