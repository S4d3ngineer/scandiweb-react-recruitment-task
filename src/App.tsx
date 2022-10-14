import React from 'react';
import { gql } from '@apollo/client';
import { client } from './index';
import Navbar from 'components/layouts/navbar/Navbar.component';
import ProductListing from 'views/ProductListing/ProductListing.component';
import { ProductCardData } from 'views/ProductListing/ProductCardData';

// TODO move queries do separate file (/queries? /data/queries?)
const query = gql`
  query getCardInfo {
    categories {
      name
      products {
        name
        inStock
        gallery
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  } 
`

interface CategoryData {
  name: string;
  products: [
    {
      name: string;
      inStock: boolean;
      gallery: string;
      prices: [
        {
          currency: {
            label: string;
            symbol: string;
          }
          amount: number;
        }
      ]
    }
  ]
}

interface State {
  productsData: null | [CategoryData];
  selectedCategory: string;
  selectedCurrency: string;
}

class App extends React.Component<{}, State> {
  state: State = {
    productsData: null,
    selectedCategory: 'all',
    selectedCurrency: 'USD'
  }

  // TODO add description to class methods
  // TODO handle errors
  getAllProductsData = async () => {
    const response = await client.query({ query });
    const data = response.data.categories;
    console.log(data);
    this.setState({
      productsData: data
    })
  }

  getCategoriesList = () => {
    if (this.state.productsData) {
      return this.state.productsData.map((category: CategoryData) => category.name);
    } else {
      return null;
    }
  }

  // TODO declare interface for productList?
  getProductList = () => {
    if (this.state.productsData) {
      const selectedCatData = this.state.productsData.find(cat => cat.name === this.state.selectedCategory);
      const productList: ProductCardData[] | undefined = selectedCatData?.products.map(product => {
        const price = product.prices.find(price => price.currency.label === this.state.selectedCurrency)
        const cardData = {
          name: product.name,
          image: product.gallery[0],
          price: {
            symbol: price?.currency.symbol,
            amount: price?.amount
          }
        }
        return cardData;
      })
      return productList;
    } else {
      return null;
    }
  }

  componentDidMount() {
    this.getAllProductsData();
  }

  // TODO research header types for SEO
  render() {
    return (
      <div className="App">
        <header className="App-header"></header>
        <Navbar categories={this.getCategoriesList()} />
        <ProductListing productList={this.getProductList()} />
      </div>
    );
  }
}

export default App;
