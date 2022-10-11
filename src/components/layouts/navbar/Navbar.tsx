import React from "react";
// import Categories from "components/navbar/Categories";
// import styled from "styled-components";
import { ReactComponent as Logo } from "assets/icons/Logo.svg";
// import Menu from "components/navbar/Menu";
import { FlexBox, CategoryButton, Menu, CurrencyPicker, CategoryFilters, StyledCart } from "components/layouts/navbar/Navbar.styles";
import { ReactComponent as Vector } from "assets/icons/Vector.svg";

interface Props {
  /** Names of product categories */
  categories: string[] | null;
}

export default class Navbar extends React.Component<Props, {}> {
  renderCategoryFilters = () => {
    return this.props.categories?.map((category: string, index: number) => (
      <CategoryButton
        key={index}
      >
        {category}
      </CategoryButton>
    ))
  }

  // TODO Add link to homeview for logo
  render() {
    return (
      <FlexBox>
        <CategoryFilters>{this.renderCategoryFilters()}</CategoryFilters>
        <Logo />
        <Menu>
          <CurrencyPicker>$<Vector className="vector" /></CurrencyPicker>
          <StyledCart />
        </Menu>
      </FlexBox>
    )
  }
}

