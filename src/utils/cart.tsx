import App from "App";
import { Attribute, AttributeItem, ProductData } from "views/ProductDescription/ProductData";

/*
------This file containes type declarations, interfaces and cart logic related functions -------
*/

export interface Cart {
  items: CartItems;
  itemCount: number;
  /** It's number when successfuly calculated and 'error' otherwise */
  totalPrice: number | 'error';
}

export type CartItems = Record<CartItemId, CartItemData>;

/** Id uniquely identyfing item instance with its selected attributes */
type CartItemId = string;

/** ProductData with item's selected attributes  */
export interface CartItemData extends ProductData {
  selectedAttributes: Record<Attribute["id"], AttributeItem["value"]>;
  count: number;
}

export enum CartAction {
  Add,
  Remove
}

export type UpdateCart = (action: CartAction, itemId: CartItemId, item?: CartItemData) => void;

/**
 * Updates cart based of passed action and current state of the cart
 */
export const updateCart: UpdateCart = function updateCart(this: App , action, itemId, item?) {

  const cart = this.state.cart;
  const existingItem = cart.items[itemId];

  const currency = this.context?.currency.label;

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
            ...cart,
            items: updatedItems,
            itemCount: getItemsCount(updatedItems),
            totalPrice: getTotalPrice(updatedItems, currency)
          }
        })
        break;

      case CartAction.Remove:
        // If reducing item count to 0 remove item from the cart
        if (existingItem.count === 1) {
          const { [itemId]: removedItemId, ...updatedItems } = cart.items;
          this.setState({
            cart: {
              ...cart,
              items: updatedItems,
              itemCount: getItemsCount(updatedItems),
              totalPrice: getTotalPrice(updatedItems, currency)
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
              ...cart,
              items: updatedItems,
              itemCount: getItemsCount(updatedItems),
              totalPrice: getTotalPrice(updatedItems, currency)
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
        ...cart,
        items: updatedItems,
        itemCount: getItemsCount(updatedItems),
        totalPrice: getTotalPrice(updatedItems, currency)
      }
    })
  }
}

export const getItemsCount = ((items: CartItems) => {
  return Object.values(items).map((item) => item.count)
    .reduce((prev, curr) => prev + curr, 0)
})

export const getTotalPrice = ((items: CartItems, currency: string | undefined) => {
  let arrOfSmth: number[] | string = [];
  for (const item of Object.values(items)) {
    const itemPrice = item.prices.find((price) => price.currency.label === currency)?.amount;
    if (!itemPrice) {
      arrOfSmth = 'error';
      break;
    }
    arrOfSmth.push((itemPrice * item.count));
  }
  return typeof(arrOfSmth) === 'string' ? 'error' : arrOfSmth.reduce((prev, curr) => prev + curr, 0);
})

