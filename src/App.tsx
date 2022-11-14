import React from 'react';
import { client } from './index';
import ProductListing from 'views/ProductListing/ProductListing.component';
import { Route, Routes } from 'react-router-dom';
import ProductDescription from 'views/ProductDescription/ProductDescription.component';
import { categoryNamesQuery } from './App.queries';
import CurrencyContext from 'contexts/CurrencyContext';
import { CartData, getItemsCount, getTotalPrice, updateCart } from 'utils/cart';
import NotFound from 'views/NotFound/NotFound.component';
import Layout from 'components/Layouts/Layout';
import Navbar from 'components/Layouts/Navbar/Navbar.component';
import { DimmingOverlay } from 'components/DimmingOverlay/DimmingOverlay';
import CartOverlay from 'components/Layouts/Navbar/CartOverlay/CartOverlay.component';
import Cart from 'views/Cart/Cart.component';
import { Currency } from 'utils/product-data';

interface Props {
  /** Allows to update cart's total price on currency change */
  currency?: Currency;
}

interface State {
  initialized: boolean;
  categoryNames: null | string[];
  cart: CartData;
  isDimmed: boolean;
}

export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
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

  componentDidMount() {
    this.getCategoryNames();
    this.initializeCart();
    this.setState({initialized: true});
  }

  componentDidUpdate(prevProps: Props, prevState: State): void {
    if (this.state.cart.items !== prevState.cart?.items) {
      localStorage.setItem('cart', JSON.stringify(this.state.cart?.items));
    } 
    if (this.props.currency !== prevProps.currency) {
      this.setState({
        cart: {
          ...this.state.cart,
          totalPrice: getTotalPrice(this.state.cart.items, this.context?.currency.label)
        }
      })
    }
  }

  static contextType = CurrencyContext;
  context!: React.ContextType<typeof CurrencyContext>;

  updateCart = updateCart; // declared inside class to be binded in constructor

  /**
   * Get category names and sets it in App component state 
   */
  getCategoryNames = async () => {
    const response = await client.query({ query: categoryNamesQuery });
    const namesList = response.data.categories.map((category: { name: string }) => category.name);
    this.setState({ categoryNames: namesList });
  }

  /**
   * Initialize cart state with data from local storage
   */
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

  /**
   * Sets stated of overlay which dimms everything other than
   * navbar and it children
   */
  setDimmedOverlay = (isDimmed: boolean) => {
    this.setState({ isDimmed: isDimmed })
  }

  render() {
    if (!this.state.initialized) {
      return null
    }

    const cartOverlay = (
      <CartOverlay
        cart={this.state.cart}
        dimmSetter={this.setDimmedOverlay}
        updateCart={this.updateCart}
      />
    )
    const navbar = (
      <Navbar
        categories={this.state.categoryNames}
        cart={cartOverlay}
      />
    )
    const layout = <Layout navbar={navbar} />

    const productListing = (
        <ProductListing 
          categories={this.state.categoryNames}
          updateCart={this.updateCart}
        />
      )

    const cart = (
      <Cart
        cart={this.state.cart}
        updateCart={this.updateCart}
      />
    )

    return (
      <div className="App">
        <header className="App-header"></header>
        {this.state.isDimmed && <DimmingOverlay />}
        <Routes>
          <Route path="/" element={layout} >
            <Route index element={productListing} />
            <Route path=":category" element={productListing} />
            <Route path="product/:id" element={<ProductDescription updateCart={this.updateCart} />} />
            <Route path="cart" element={cart} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    );
  }
}
