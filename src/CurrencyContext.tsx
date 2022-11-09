import React from "react";
import { Currency } from "views/ProductDescription/ProductData";

interface ContextInterface {
  currency: Currency;
  handleCurrencySelection: (currency: Currency) => void;
}

const CurrencyContext = React.createContext<ContextInterface | null>(null);

interface Props {
  children: React.ReactNode;
}

interface State {
  currency: Currency;
}

export class CurrencyProvider extends React.Component<Props, State> {
  getSavedCurrency = () => {
    const currency = localStorage.getItem('currency');
    const fallbackCurrency = {
      label: 'USD',
      symbol: '$'
    }
    return currency ? JSON.parse(currency) : fallbackCurrency;
  }
  
  state: State = {
    currency: this.getSavedCurrency()
  }

  handleCurrencySelection = (currency: Currency) => {
      this.setState({
        currency: currency 
      })
  }

  componentDidUpdate(_: Props, prevState: State) {
    if (this.state.currency !== prevState.currency) {
      localStorage.setItem('currency', JSON.stringify(this.state.currency));
    } 
  }

  render() {
    const { currency } = this.state;
    const handleCurrencySelection = this.handleCurrencySelection;
    return(
      <CurrencyContext.Provider value={{
          currency,
          handleCurrencySelection
        }}
      >
        {this.props.children}
      </CurrencyContext.Provider>
    )
  }
}

export default CurrencyContext;
