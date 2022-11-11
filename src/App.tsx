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
import { Cart, getItemsCount, getTotalPrice, updateCart } from 'utils/cart';

interface State {
  initialized: boolean;
  categoryNames: null | string[];
  cart: Cart;
  isDimmed: boolean;
}

export default class App extends React.Component<{}, State> {

  constructor(props: {}) {
    super(props);

    this.state = {
      initialized: false,
      categoryNames: null,
      cart: {
        items: {},
        itemCount: 0,
        totalPrice: 0
      },
      isDimmed: false
    }

    this.updateCart = updateCart.bind(this);
  }

  initializeCart = () => {
    const cartItemsJSON = localStorage.getItem('cart');
    const cartItems = cartItemsJSON ? JSON.parse(cartItemsJSON) : [];
    this.setState({
      cart: { 
        items: cartItems,
        itemCount: getItemsCount(cartItems),
        totalPrice: getTotalPrice(cartItems, this.context?.currency.label)
      }
    })
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

  updateCart = updateCart; // declared inside class to be binded in constructor

  /**
   * Sets stated of overlay which dimms everything other than
   * navbar and it children
   */
  setDimmedOverlay = (isDimmed: boolean) => {
    this.setState({ isDimmed: isDimmed })
  }

  componentDidMount() {
    this.getCategoryNames();
    this.initializeCart();
    this.setState({initialized: true});
  }

  componentDidUpdate(_: {}, prevState: State): void {
    if (this.state.cart.items !== prevState.cart?.items) {
      localStorage.setItem('cart', JSON.stringify(this.state.cart?.items));
    } 
  }

  render() {
    if (!this.state.initialized) {
      return null
    }

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
