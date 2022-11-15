import styled from "styled-components";

export const PhotoContainer = styled.div`
  position: relative; 
  display: flex;
`

export const GalleryButtons = styled.div`
  position: absolute;
  bottom: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
  button {
    border: none;
    outline: none;
    width: 24px;
    height: 24px;
    background-color: rgba(0,0,0,0.6);
    opacity: 0.5;
    &:hover {
      opacity: 1.0;
    }
    .prev {
      transform: rotate(90deg);
    }
    .next {
      transform: rotate(270deg);
    }
    path {
      stroke: white;
    }
  }
`
