// TODO order import statements
import React from 'react';
import { client } from './index';
import ProductListing from 'views/ProductListing/ProductListing.component';
import { Route, Routes } from 'react-router-dom';
import ProductDescription from 'views/ProductDescription/ProductDescription.component';
import { categoryNamesQuery } from './App.queries';
import Layout from 'components/layouts/Layout';
import { CurrencyProvider } from 'CurrencyContext';
import Navbar from 'components/layouts/navbar/Navbar.component';
import CartOverlay from 'components/cart-overlay/CartOverlay.component';
import { AttributeItem, Attribute, ProductData } from 'views/ProductDescription/ProductData';
import { DimmingOverlay } from 'components/dimming-overlay/DimmingOverlay';

interface State {
  categoryNames: null | string[];
  selectedCategory: string;
  selectedCurrency: string;
  cart: Cart;
  isDimmed: boolean;
}

export interface Cart {
  itemCount: number;
  items: ProductCartData[];
}

export interface ProductCartData extends ProductData {
  selectedAttributes: Record<Attribute["id"], AttributeItem["value"]>
}

export default class App extends React.Component<{}, State> {
  getSavedCartItems = () => {
    const cartItems = localStorage.getItem('cartItems'); // TODO write function to calculate cartItems
    return cartItems ? JSON.parse(cartItems) : [];
  }

  state: State = {
    categoryNames: null,
    selectedCategory: 'all',
    selectedCurrency: localStorage.getItem('currency') || 'USD',
    cart: { // TODO use localStorage
      itemCount: 0,
      items: this.getSavedCartItems()
    },
    isDimmed: false
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

  addToCart = (item: ProductCartData | null): void => {
    if (item) {
      this.setState({
        cart: {
          itemCount: this.state.cart.itemCount + 1,
          items: [...this.state.cart.items, item]
        }
      })
    }
  }

  setDimmedOverlay = (isDimmed: boolean) => {
    this.setState({isDimmed: isDimmed})
  }

  componentDidMount() {
    this.getCategoryNames();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header"></header>
        {this.state.isDimmed && <DimmingOverlay />}
        <CurrencyProvider>
          <Routes>
            <Route
              path="/"
              element={
                <Layout
                  navbar={
                    <Navbar 
                      categories={this.state.categoryNames}
                      cart={<CartOverlay cart={this.state.cart} dimmSetter={this.setDimmedOverlay}/>}
                    />
                  }
                />
              }
            >
              <Route index element={<ProductListing />} />
              <Route path=":category" element={<ProductListing />} />
              <Route path="product/:id" element={<ProductDescription addToCart={this.addToCart} />} />
            </Route>
          </Routes>
        </CurrencyProvider>
      </div>
    );
  }
}
