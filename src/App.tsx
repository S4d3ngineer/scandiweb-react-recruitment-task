import React from 'react';
import { client } from './index';
import ProductListing from 'views/ProductListing/ProductListing.component';
import { Route, Routes } from 'react-router-dom';
import ProductDescription from 'views/ProductDescription/ProductDescription.component';
import { categoryNamesQuery } from './App.queries';
import Layout from 'components/layouts/Layout';
import Navbar from 'components/layouts/navbar/Navbar.component';
import CartOverlay from 'components/cart-overlay/CartOverlay.component';
import { DimmingOverlay } from 'components/dimming-overlay/DimmingOverlay';
import CurrencyContext from 'contexts/CurrencyContext';
import { Cart, updateCart } from 'utils/cart';

interface State {
  categoryNames: null | string[];
  cart: Cart;
  isDimmed: boolean;
}

export default class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.updateCart = updateCart.bind(this);
  }

  getSavedCartItems = () => {
    const cartItems = localStorage.getItem('cartItems');
    return cartItems ? JSON.parse(cartItems) : [];
  }

  state: State = {
    categoryNames: null,
    cart: { // TODO use localStorage
      itemCount: 0,
      totalPrice: 0,
      items: this.getSavedCartItems()
    },
    isDimmed: false
  }

  static contextType = CurrencyContext;
  context!: React.ContextType<typeof CurrencyContext>;

  /**
   * Get category names and sets it in App component state 
   */
  getCategoryNames = async () => {
    const response = await client.query({ query: categoryNamesQuery });
    const namesList = response.data.categories.map((category: { name: string }) => category.name);
    this.setState({ categoryNames: namesList });
  }

  updateCart = updateCart;

  /**
   * Sets stated of overlay which dimms everything other than
   * navbar and it children
   */
  setDimmedOverlay = (isDimmed: boolean) => {
    this.setState({ isDimmed: isDimmed })
  }

  componentDidMount() {
    this.getCategoryNames();
  }

  // TODO pass all props at once
  render() {

    const cartOverlay = <CartOverlay
      cart={this.state.cart}
      dimmSetter={this.setDimmedOverlay}
      updateCart={this.updateCart}
    />
    const navbar = <Navbar
      categories={this.state.categoryNames}
      cart={cartOverlay}
    />
    const layout = <Layout
      navbar={navbar}
    />

    return (
      <div className="App">
        <header className="App-header"></header>
        {this.state.isDimmed && <DimmingOverlay />}
        <Routes>
          <Route path="/" element={layout} >
            <Route index element={<ProductListing />} />
            <Route path=":category" element={<ProductListing />} />
            <Route path="product/:id" element={<ProductDescription updateCart={this.updateCart} />} />
          </Route>
        </Routes>
      </div>
    );
  }
}
