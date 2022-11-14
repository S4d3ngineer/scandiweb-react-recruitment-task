import React from "react";
import * as S from "./Navbar.styled";
import { Link, NavLink } from "react-router-dom";
import { withParams, WithParamsProps } from "utils/wrappers";
import CurrencyPicker from "./CurrencyPicker/CurrencyPicker.component";

export interface NavbarProps {
  /** Names of product categories */
  categories: string[] | null;
  cart: React.ReactNode;
}

interface Props extends NavbarProps, WithParamsProps {
}

class Navbar extends React.Component<Props, {}> {
  renderCategoryFilters = () => {
    return this.props.categories?.map((category: string, index: number) => (
      <NavLink to={'/' + category} key={category + index}>
        <S.CategoryButton >
          {category}
        </S.CategoryButton>
      </NavLink>
    ))
  }
  
  render() {
    if (!this.props.categories) {
      return null;
    }
    return (
      <S.Wrapper>
        <S.GridBox>
          <S.CategoryFilters>{this.renderCategoryFilters()}</S.CategoryFilters>
          <S.LogoContainer>
            <Link to="/" aria-label="Go to home page">
              <S.LogoIcon />
            </Link>
          </S.LogoContainer>
          <S.Menu>
            <CurrencyPicker />
            {this.props.cart}
          </S.Menu>
        </S.GridBox>
      </S.Wrapper>
    )
  }
}

export default withParams(Navbar);
