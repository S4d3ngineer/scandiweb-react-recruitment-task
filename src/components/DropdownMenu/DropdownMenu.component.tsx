import CurrencyContext from "contexts/CurrencyContext";
import React from "react";
import * as S from "./DropdownMenu.styles";

interface Props {
  button: React.ReactNode;
  children: React.ReactNode;
  isShown: boolean;
  onBlur?: any
}

export default class DropdownMenu extends React.Component<Props> {
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  static contextType = CurrencyContext;
  context!: React.ContextType<typeof CurrencyContext>;

  wrapperRef = React.createRef<HTMLDivElement>();

  handleClickOutside = (event: globalThis.MouseEvent) => {
    if (this.wrapperRef && !this.wrapperRef.current?.contains(event.target as HTMLElement)) {
      event.preventDefault();
      event.stopPropagation()
      this.props.onBlur();
    }
  }

  render() {
    const { button, isShown } = this.props;

    return(
    <>
      <S.Dropdown>
        {button}
        {isShown && (
          <S.DropdownContent ref={this.wrapperRef}>
            {this.props.children}
          </S.DropdownContent>
        )}
      </S.Dropdown>
      {isShown && <S.EventShield />}
    </>
    )
  }
}
