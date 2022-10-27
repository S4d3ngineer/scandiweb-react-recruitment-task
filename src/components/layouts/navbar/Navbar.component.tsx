import React from "react";
import * as S from "./Navbar.styles";
import { ReactComponent as Vector } from "assets/icons/Vector.svg";

interface Props {
  /** Names of product categories */
  categories: string[] | null;
}

export default class Navbar extends React.Component<Props, {}> {
  renderCategoryFilters = () => {
    console.log(this.props.categories);
    return this.props.categories?.map((category: string, index: number) => (
      <S.CategoryButton
        key={category + index}
      >
        {category}
      </S.CategoryButton>
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
          <a href="/">
            <S.StyledLogo />
          </a>
        </S.LogoContainer>
        <S.Menu>
          <S.CurrencyPicker>$<Vector /></S.CurrencyPicker>
          <S.StyledCart />
        </S.Menu>
      </S.FlexBox>
    )
  }
}
