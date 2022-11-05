import React from "react";
import * as S from "./Navbar.styles";
import { ReactComponent as Vector } from "assets/icons/Vector.svg";
import { Link } from "react-router-dom";
import { withParams, WithParamsProps } from "utils/wrappers";

export interface NavbarProps {
  /** Names of product categories */
  categories: string[] | null;
}

interface Props extends NavbarProps, WithParamsProps {
}

class Navbar extends React.Component<Props, {}> {
  renderCategoryFilters = () => {
    return this.props.categories?.map((category: string, index: number) => (
      <Link to={'/' + category} key={category + index}>
        <S.CategoryButton >
          {category}
        </S.CategoryButton>
      </Link>
    ))
  }

  render() {
    if (!this.props.categories) {
      return null;
    }
    return (
      <S.FlexBox>
        <S.CategoryFilters>{this.renderCategoryFilters()}</S.CategoryFilters>
        <S.LogoContainer>
          <Link to="/">
            <S.StyledLogo />
          </Link>
        </S.LogoContainer>
        <S.Menu>
          <S.CurrencyPicker>$<Vector /></S.CurrencyPicker>
          <S.StyledCart />
        </S.Menu>
      </S.FlexBox>
    )
  }
}

export default withParams(Navbar);
