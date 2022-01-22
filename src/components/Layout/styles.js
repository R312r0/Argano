import styled from "styled-components"

export const LayoutWrapper = styled.div`
    display: grid;
    height: 100vh;
    grid-template-columns: ${props => props.mobile ? "1fr" : "10% 90%"};
    grid-template-rows: ${props => props.mobile ? "auto 1fr" : "5vw auto"};
    background: ${props => props.mobile ? "rgb(41,67,58)" : null};
    //TODO: Ask Sergiy to generate true radial-gradient style rules. This is was generated by me and it is not so correct.
    background: ${props => props.mobile ? "radial-gradient(circle, rgba(44,94,77,1) 0%, rgba(38,51,47,1) 23%, rgba(35,35,35,1) 52%)" : props.light ? '#EFEFEF' : "#202020"};
    transition: 0.3s background-color;
`

export const Header = styled.div`
  display: grid;
  grid-column: 1/5;
  /* grid-template-columns: ${props => props.mobile ? "1fr 3fr 1fr" : "0.4fr 3fr 0.5fr"}; */
  grid-template-columns: ${props => props.mobile ? "1fr 3fr 1fr" : "10% 75% 15%"};
  grid-template-rows: ${props => props.mobile ? "1fr 1fr" : "none"};
  box-sizing: border-box;
  column-gap:10px;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  padding-bottom: 100px;
  position: relative;
  overflow-y: auto;
  
  @media only screen and (max-width: 750px) {
    padding-bottom: 0;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`
// export const AgoLogo = styled.img`
export const AgoLogo = styled.img`
  width: 2.60vw;
  height: 2.20vw;
  place-self: center;
  &:hover {
    cursor: pointer;
  }

  @media screen and (max-width: 1200px) {
    width: 3.4vw;
    height: 3.4vw;
  }

  @media screen and (max-width: 750px) {
    width: 9vw;
    height: 8vw;
  }
`

// MOBILE 

export const MobileHeader = styled.div`
  display: flex;
  flex-direction: column;

  padding-bottom: 5.333vw;
`

export const MobileMainHeader = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 5.333vw 5.333vw 3.333vw;
`

export const PageName = styled.h1`
  display: ${props => props.mobile ? "block" : "none"};
  color: white;
  place-self: center;

  @media screen and (max-width: 750px) {
    font-size: 6vw;
  }
`

export const BurgerButton = styled.button`
  display: grid;
  width: 5vw;
  height: 5vw;
  place-self: center;
  background-color: transparent;
  border: none;

  img {
    width: 5vw;
    height: 5vw;
  }
`