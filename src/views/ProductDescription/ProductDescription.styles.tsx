import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1440px; 
  justify-content: center;
  margin: 50px auto;
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

// TODO take care of the font sizing and maybe declare p in global styles
export const Panel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 300px;
  .brand {
    font-size: 30px;
    font-weight: 600;
  }
  h2 {
    font-size: 30px;
    font-weight: 400;
  }
  .attributeName {
    font-size: 18px;
    font-weight: 700;
  }
  .attributeItems {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 12px;
  }
  .attributeBox { display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #1D1F22;
    width: 63px;
    height: 45px;
    cursor: pointer;
  }
  .description {
    font-family: Roboto;
    font-size: 16px;
    font-weight: 400px;
    li:not(:last-child) {
      padding-bottom: 10px;
    }
  } 
`
