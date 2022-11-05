import React from "react";
import { Outlet } from "react-router-dom";
import Navbar, { NavbarProps } from "./navbar/Navbar.component";

interface Props extends NavbarProps {}

export default class Layout extends React.Component<Props, {}> {
  render() {
    return (
      <React.Fragment>
        <Navbar categories={this.props.categories} />
        <Outlet />
      </React.Fragment>
    )
  }
}
