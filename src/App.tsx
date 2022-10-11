import React from 'react';
import ProductCard from './components/ProductCard';
import { gql } from '@apollo/client';
import { client } from './index';
import Navbar from 'components/layouts/navbar/Navbar';

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
  products: {
    name: string;
    inStock: boolean;
    gallery: string;
    prices: {
      currency: {
        label: string;
        symbol: string;
      }
      amount: number;
    }
  }
}

interface State {
  productsData: null | [CategoryData];
}

class App extends React.Component<{}, State> {
  state: State = {
    productsData: null
  }

  getAllProductsData = async () => {
    const response = await client.query({ query });
    const data = response.data.categories;
    console.log(data);
    this.setState({
      productsData: data
    })
  }

  listCategories = () => {
    if (this.state.productsData) {
      return this.state.productsData.map((category: CategoryData) => category.name);
    } else {
      return null;
    }
  }

  componentDidMount() {
    this.getAllProductsData();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <Navbar categories={this.listCategories()} />
        <h1>Category name</h1>
        <ProductCard key={1} img="" price={20} name="Name" />
      </div>
    );
  }
}

export default App;
