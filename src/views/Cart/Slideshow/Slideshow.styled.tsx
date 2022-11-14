import styled from "styled-components";

export const PhotoContainer = styled.div`
  position: relative; 
  display: flex;
`

export const GalleryButtons = styled.div`
  position: absolute;
  right: 16px;
  bottom: 16px;
  display: flex;
  gap: 8px;
  button {
    background-color: rgba(0,0,0,0.6);
    width: 24px;
    height: 24px;
    border: none;
    outline: none;
    opacity: 0.5;
    path {
      stroke: white;
    }
    &:hover {
      opacity: 1.0;
    }
    .prev {
      transform: rotate(90deg);
    }
    .next {
      transform: rotate(270deg);
    }
  }
`
