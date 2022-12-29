import ProductCard from "./ProductCard/ProductCard.component";
import { client } from "index";
import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { UpdateCart } from "utils/cart";
import { ProductCardData } from "utils/product-data";
import { withParams, WithParamsProps } from "utils/wrappers";
import NotFound from "views/NotFound/NotFound.component";
import { categoryDataQuery } from "./ProductListing.queries";
import * as S from "./ProductListing.styled";
import { defaultCategory } from "utils/constants";

interface Props extends WithParamsProps {
  categories: string[] | null;
  updateCart: UpdateCart;
}

interface State {
  productsData: ProductCardData[] | null;
}

class ProductListing extends React.Component<Props, State> {
  state: State = {
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
          title: this.props.params.category || defaultCategory
        }
      }
    });
    const data = response.data.category;
    this.setState({
      productsData: data.products
    })
  }

  renderProductList = (): ReactElement => {
    const productListContent = this.state.productsData?.map(productData => {
      return (
        <ProductCard
          key={productData.id}
          productData={productData}
          updateCart={this.props.updateCart}
        />
      )
    })
    return (
      <React.Fragment>
        {productListContent}
      </ React.Fragment>
    )
  }

  render() {
    if (!this.props.params.category) {
      return <Navigate to={'/' + defaultCategory} replace />
    }

    if (
      this.props.categories
      && !(this.props.categories.includes(this.props.params.category))
    ) {
      return <NotFound />
    }

    if (!this.state.productsData) {
      return null;
    }
    return (
      <S.Container>
        <S.HeadingContainer>
          <h2>{this.props.params.category}</h2>
        </S.HeadingContainer>
        <S.ProductList>
          {this.renderProductList()}
        </S.ProductList>
      </S.Container>
    )
  }
}

export default withParams(ProductListing);
