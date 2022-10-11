import React from "react";
// import Categories from "components/navbar/Categories";
// import styled from "styled-components";
import { ReactComponent as Logo } from "assets/icons/Logo.svg";
// import Menu from "components/navbar/Menu";
import { FlexBox, Button, Menu, CurrencyPicker } from "components/layouts/navbar/Navbar.styles";
import { ReactComponent as Vector } from "assets/icons/Vector.svg";
import { ReactComponent as Cart } from "assets/icons/Cart.svg";

interface Props {
  /** Names of product categories */
  categories: string[] | null;
}

export default class Navbar extends React.Component<Props, {}> {
  renderCategoryFilters = () => {
      return this.props.categories?.map((category: string, index: number) => (
        <Button
          key={index}
        >
          {category}
        </Button>
      ))
    }   

  render() {
    return (
      <FlexBox>
        <div>
          {this.renderCategoryFilters()}
        </div>
        <Logo />
        <Menu>
          <CurrencyPicker>
            $
            <Vector />
          </CurrencyPicker>
          <Cart />
        </Menu>
      </FlexBox>
    )
  }
}

