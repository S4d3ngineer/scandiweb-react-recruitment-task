import React from "react";
import { Currency } from "views/ProductDescription/ProductData";

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
    return(
      <CurrencyContext.Provider value={{
          currency,
          setCurrencyAsSelected
        }}
      >
        {this.props.children}
      </CurrencyContext.Provider>
    )
  }
}

export default CurrencyContext;
