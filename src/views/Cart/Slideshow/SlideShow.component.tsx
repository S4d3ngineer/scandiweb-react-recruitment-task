import React from "react";
import * as S from "./Slideshow.styled";
import { ReactComponent as Vector } from "assets/icons/Vector.svg";

interface Props {
  gallery: string[];
  productName: string;
}

interface State {
  currentPhoto: number;
}

enum SlideAction {
  Next,
  Prev
}

export default class SlideShow extends React.Component<Props, State> {
  state: State = {
    currentPhoto: 0
  }

  handleSlide = (action: SlideAction) => {
    const gallery = this.props.gallery;
    const currentPhoto  = this.state.currentPhoto;

    switch(action) {
      case SlideAction.Next:
        currentPhoto === gallery.length - 1 ?
          this.setState({currentPhoto: 0}) :
          this.setState({currentPhoto: currentPhoto + 1});
        break;
      case SlideAction.Prev:
        currentPhoto === 0 ?
          this.setState({currentPhoto: gallery.length - 1}) :
          this.setState({currentPhoto: currentPhoto - 1});
        break;
    } 
  }

  render() {
    const { gallery, productName } = this.props;
    const currentPhoto = this.state.currentPhoto;
    return (
      <S.PhotoContainer>
        <img alt={productName} src={gallery[currentPhoto]} />
        {
          gallery.length > 1 && 
          <S.GalleryButtons>
            <button onClick={() => this.handleSlide(SlideAction.Prev)}>
              <Vector className='prev' width='24' height='24' viewBox='-2 -4.5 12 12' />
            </button>
            <button onClick={() => this.handleSlide(SlideAction.Next)}>
              <Vector className='next' width='24' height='24' viewBox='-2 -4.5 12 12' />
            </button>
          </S.GalleryButtons>
        }
        </S.PhotoContainer>
    )
  } 
}
