import React from "react";

interface ContextInterface {
  currency: string;
  handleCurrencySelection: (currency: string) => void;
}

const CurrencyContext = React.createContext<ContextInterface | null>(null);

interface Props {
  children: React.ReactNode;
}

interface State {
  currency: string
}

export class CurrencyProvider extends React.Component<Props, State> {
  state = {
    currency: localStorage.getItem('currency') || 'USD',
  }
  
  handleCurrencySelection = (currency: string) => {
      this.setState({
        currency: currency 
      })
  }

  componentDidUpdate(_: Props, prevState: State) {
    if (this.state.currency !== prevState.currency) {
      localStorage.setItem('currency', this.state.currency);
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
