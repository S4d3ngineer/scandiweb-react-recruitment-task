import React from 'react';
import { client } from './index';
import ProductListing from 'views/ProductListing/ProductListing.component';
import { Route, Routes } from 'react-router-dom';
import ProductDescription from 'views/ProductDescription/ProductDescription.component';
import { categoryNamesQuery } from './App.queries';
import Layout from 'components/layouts/Layout';
import Navbar from 'components/layouts/navbar/Navbar.component';
import CartOverlay from 'components/cart-overlay/CartOverlay.component';
import { AttributeItem, Attribute, ProductData } from 'views/ProductDescription/ProductData';
import { DimmingOverlay } from 'components/dimming-overlay/DimmingOverlay';
import CurrencyContext from 'CurrencyContext';

interface State {
  categoryNames: null | string[];
  selectedCurrency: string;
  cart: Cart;
  isDimmed: boolean;
}

export interface Cart {
  items: CartItems;
  itemCount: number;
  /** It's number when successfuly calculated and 'error' otherwise */
  totalPrice: number | 'error';
}

type CartItemId = string;

type CartItems = Record<CartItemId, CartItemData>;

export enum CartAction {
  Add,
  Remove
}

export type UpdateCart = (action: CartAction, itemId: CartItemId, item?: CartItemData) => void;

/** ProductData with item's selected attributes  */
export interface CartItemData extends ProductData {
  selectedAttributes: Record<Attribute["id"], AttributeItem["value"]>;
  count: number;
}

export default class App extends React.Component<{}, State> {
  getSavedCartItems = () => {
    const cartItems = localStorage.getItem('cartItems'); // TODO write function to calculate cartItems
    return cartItems ? JSON.parse(cartItems) : [];
  }

  state: State = {
    categoryNames: null,
    selectedCurrency: localStorage.getItem('currency') || 'USD',
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

  /**
   * Updates cart based of passed action and current state of the cart
   */
  updateCart: UpdateCart = (action, itemId, item?): void => {

    const cart = this.state.cart;
    const existingItem = cart.items[itemId];

    /** Returns number of all items in cart */
    const getItemsCount = ((items: CartItems) => {
      return Object.values(items).map((item) => item.count)
        .reduce((prev, curr) => prev + curr, 0)
    })

    const getTotalPrice = ((items: CartItems) => {
      let arrOfSmth: number[] | string = [];
      for (const item of Object.values(items)) {
        const itemPrice = item.prices.find((price) => price.currency.label === this.context?.currency.label)?.amount;
        if (!itemPrice) {
          arrOfSmth = 'error';
          break;
        }
        arrOfSmth.push((itemPrice * item.count));
      }
      return typeof(arrOfSmth) === 'string' ? 'error' : arrOfSmth.reduce((prev, curr) => prev + curr, 0);
    })

    if (existingItem) {
      switch (action) {
        case CartAction.Add:
          const updatedItems = {
            ...cart.items,
            [itemId] : {
              ...existingItem,
              count: existingItem.count + 1
            }
          }
          this.setState({
            cart: {
              items: updatedItems,
              itemCount: getItemsCount(updatedItems),
              totalPrice: getTotalPrice(updatedItems)
            }
          })
          break;

        case CartAction.Remove:
          // If reducing item count to 0 remove item from the cart
          if (existingItem.count === 1) {
            const { [itemId]: removedItemId, ...updatedItems } = cart.items;
            this.setState({
              cart: {
                items: updatedItems,
                itemCount: getItemsCount(updatedItems),
                totalPrice: getTotalPrice(updatedItems)
              }
            })
          } else {
            const updatedItems = {
              ...cart.items,
              [itemId]: {
                ...existingItem,
                count: existingItem.count -1
              }
            }
            this.setState({
              cart: {
                items: updatedItems,
                itemCount: getItemsCount(updatedItems),
                totalPrice: getTotalPrice(updatedItems)
              }
            })
          }
          break;
      }
    } else if (action === CartAction.Add && item) {
      const updatedItems = {
        ...cart.items,
        [itemId]: item
      }
      this.setState({
        cart: {
          items: updatedItems,
          itemCount: getItemsCount(updatedItems),
          totalPrice: getTotalPrice(updatedItems)
        }
      })
    }
  }

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

  componentDidUpdate() {
    
  }

  // TODO pass all props at once
  render() {
    return (
      <div className="App">
        <header className="App-header"></header>
        {this.state.isDimmed && <DimmingOverlay />}
        <Routes>
          <Route
            path="/"
            element={
              <Layout
                navbar={
                  <Navbar
                    categories={this.state.categoryNames}
                    cart={
                      <CartOverlay
                        cart={this.state.cart} 
                        dimmSetter={this.setDimmedOverlay} 
                        updateCart={this.updateCart}
                      />
                    }
                  />
                }
              />
            }
          >
            <Route index element={<ProductListing />} />
            <Route path=":category" element={<ProductListing />} />
            <Route path="product/:id" element={<ProductDescription updateCart={this.updateCart} />} />
          </Route>
        </Routes>
      </div>
    );
  }
}
