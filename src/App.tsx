// TODO order import statements
import React from 'react';
import { client } from './index';
import ProductListing from 'views/ProductListing/ProductListing.component';
import { Route, Routes } from 'react-router-dom';
import ProductDescription from 'views/ProductDescription/ProductDescription.component';
import { categoryNamesQuery } from './App.queries';
import Layout from 'components/layouts/Layout';
import { CurrencyProvider } from 'CurrencyContext';

interface State {
  categoryNames: null | string[];
  selectedCategory: string;
  selectedCurrency: string;
}

export default class App extends React.Component<{}, State> {
  state: State = {
    categoryNames: null,
    selectedCategory: 'all',
    selectedCurrency: localStorage.getItem('currency') || 'USD'
  }

  getCategoryNames = async () => {
    const response = await client.query({ query: categoryNamesQuery });
    const namesList = response.data.categories.map((category: { name: string }) => category.name);
    this.setState({ categoryNames: namesList });
  }

  handleCurrencySelection = (currency: string): void => {
    this.setState({
      selectedCategory: currency
    })
  }

  componentDidMount() {
    this.getCategoryNames();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header"></header>
        <CurrencyProvider>
          <Routes>
            <Route path="/" element={<Layout categories={this.state.categoryNames} />} >
              <Route index element={<ProductListing />} />
              <Route path=":category" element={<ProductListing />} />
              <Route path="product/:id" element={<ProductDescription />} />
            </Route>
          </Routes>
        </CurrencyProvider>
      </div>
    );
  }
}
