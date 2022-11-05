// TODO order import statements
import React from 'react';
import { client } from './index';
import ProductListing from 'views/ProductListing/ProductListing.component';
import { Route, Routes } from 'react-router-dom';
import ProductDescription from 'views/ProductDescription/ProductDescription.component';
import { withParams, WithParamsProps } from 'utils/wrappers';
import { categoryNamesQuery } from './App.queries';
import Layout from 'components/layouts/Layout';


interface Props extends WithParamsProps { }

interface State {
  categoryNames: null | string[];
  selectedCategory: string;
  selectedCurrency: string;
}

class App extends React.Component<Props, State> {
  state: State = {
    categoryNames: null,
    selectedCategory: 'all',
    selectedCurrency: 'USD',
  }

  getCategoryNames = async () => {
    const response = await client.query({ query: categoryNamesQuery });
    const namesList = response.data.categories.map((category: { name: string }) => category.name);
    this.setState({ categoryNames: namesList });
  }

  componentDidMount() {
    this.getCategoryNames();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header"></header>
        <Routes>
          <Route path="/" element={<Layout categories={this.state.categoryNames} />} >
            <Route index element={<ProductListing currency={this.state.selectedCurrency} />} />
            <Route path=":category" element={<ProductListing currency={this.state.selectedCurrency} />} />
            <Route path="product/:id" element={<ProductDescription />} />
          </Route>
        </Routes>
      </div>
    );
  }
}

export default withParams(App);
