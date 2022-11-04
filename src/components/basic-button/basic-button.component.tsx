import React from "react";
import { Button } from './basic-button.styles';

// TODO make enum for values
interface Props {
  children: string;
  style: string;
  width: number;
  fontSize: number;
}

export default class BasicButton extends React.Component<Props, {}> {
  render() {
    const { children, style, width, fontSize } = this.props;
    return (
      <Button className={style} width={width} fontSize={fontSize}>{children}</Button> 
    )
  }
}
