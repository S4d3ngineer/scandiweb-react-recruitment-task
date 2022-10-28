import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1440px; 
  margin: 0 auto;
`

export const ImgContainer = styled.div`
  display: flex;
  flex-direction: row;
`

// TODO ev instead of px? 
export const ImgGallery = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  width: 150px;
  max-height: 511px;
  padding-right: 10px;
  overflow-x: hidden;
  overflow-y: auto;
  img {
    width: 85px;
    height: 85px;
    object-fit: contain;
  }
`

export const Img = styled.img`
  max-width: 610px;
  max-height: 511px;
  width: 100%;
  object-fit: contain;
  padding-left: 20px;
  padding-right: 30px;
`

export const Panel = styled.div`
  
`
