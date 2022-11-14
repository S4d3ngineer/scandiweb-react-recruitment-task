/*
------ This context is meant to wrapp App component and shoudldn't be reused -------
*/


import React from "react";
import { Currency } from "utils/product-data";

interface ContextInterface {
  currency: Currency;
  setCurrencyAsSelected: (currency: Currency) => void;
}

const CurrencyContext = React.createContext<ContextInterface | null>(null);

interface Props {
  children: React.ReactNode;
}

interface State {
  currency: Currency;
}

export class CurrencyProvider extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      currency: this.getSavedCurrency()
    }
  }

  componentDidUpdate(_: Props, prevState: State) {
    if (this.state.currency !== prevState.currency) {
      localStorage.setItem('currency', JSON.stringify(this.state.currency));
    } 
  }

  getSavedCurrency = () => {
    const currency = localStorage.getItem('currency');
    const fallbackCurrency = {
      label: 'USD',
      symbol: '$'
    }
    return currency ? JSON.parse(currency) : fallbackCurrency;
  }
  
  setCurrencyAsSelected = (currency: Currency) => {
      this.setState({
        currency: currency 
      })
  }

  render() {
    const { currency } = this.state;
    const setCurrencyAsSelected = this.setCurrencyAsSelected;

    // Pass currency as props so root element can recalculate total cart's price on currency change
    const childWithProp = React.cloneElement(this.props.children as React.ReactElement<any>, {currency: currency})

    return(
      <CurrencyContext.Provider value={{
          currency,
          setCurrencyAsSelected
        }}
      >
        {childWithProp}
      </CurrencyContext.Provider>
    )
  }
}

export default CurrencyContext;
