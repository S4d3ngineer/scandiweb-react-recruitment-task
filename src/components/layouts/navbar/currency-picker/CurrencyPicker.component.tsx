import React, { ReactElement } from "react";
import * as S from "./CurrencyPicker.styled";
import { ReactComponent as Vector } from "assets/icons/Vector.svg";
import DropdownMenu from "components/dropdown-menu/DropdownMenu.component";
import { client } from "index";
import { currenciesQuery } from "./CurrencyPicker.queries";
import CurrencyContext from "CurrencyContext";

interface State {
  currencies: Currency[] | null;
  isShown: boolean;
}

interface Currency {
  label: string;
  symbol: string;
}

export default class CurrencyPicker extends React.Component<{}, State> {
  state: State = {
    currencies: null,
    isShown: false
  }

  static contextType = CurrencyContext;
  context!: React.ContextType<typeof CurrencyContext>;

  getCurrencies = async () => {
    const response = await client.query({ query: currenciesQuery });
    const currencies = response.data.currencies;
    this.setState({ currencies: currencies });
  }

  // TODO should I leave the button
  // declare in interface type of elements reveiced as children inside DropdownMenu
  renderCurrencies = (): ReactElement => {
    const currencyOptions = this.state.currencies?.map((currency: Currency) => (
      <span key={currency.label} onClick={() => this.handleCurrencySelection(currency)}>
        {currency.symbol + ' ' + currency.label}
      </span>
    ))
    return (
      <>
        {currencyOptions}
      </>
    );
  }

  handleCurrencySelection = (label: Currency ) => {
    this.context?.handleCurrencySelection(label);
    this.hideMenu();
  }

  showMenu = () => {
    if (!this.state.isShown) {
      this.setState({
        isShown: true
      })
    } 
  }

  hideMenu = () => {
    if (this.state.isShown) {
      this.setState({
        isShown: false
      })
    }
  }

  componentDidMount() {
    this.getCurrencies();
  }

  render() {
    if (!this.state.currencies) {
      return null
    }
    return (
      <DropdownMenu
        button={
          <button onClick={this.showMenu}>
            <S.IconContainer>
              {this.context?.currency.symbol}
              <Vector className={this.state.isShown ? 'active' : ''} />
            </S.IconContainer>
          </button>
        }
        isShown={this.state.isShown}
        onBlur={this.hideMenu}
      >
        {this.renderCurrencies()}
      </DropdownMenu>
    )
  }
}
