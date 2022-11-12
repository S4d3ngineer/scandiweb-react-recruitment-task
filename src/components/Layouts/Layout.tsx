import React from "react";
import { Outlet } from "react-router-dom";

interface Props {
  navbar: React.ReactNode;
}

export default class Layout extends React.Component<Props, {}> {
  render() {
    return (
      <React.Fragment>
        {this.props.navbar}
        <Outlet />
      </React.Fragment>
    )
  }
}
