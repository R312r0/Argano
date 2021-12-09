import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {SideBar} from './SideBar/sidebar';
import ago_icon from '../../assets/icons/ago-logo.svg';
import burger_menu from '../../assets/icons/burger-menu.svg'
import {Spin} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import {BalancesTab} from './BalancesTab/balances-tab';
import {useMediaQuery} from 'react-responsive';
import styled from 'styled-components';
import {PAGES} from '../../constants';
import {SideBarMobile} from './SideBarMobile/sidebar-mobile';
import {useSystemContext} from '../../systemProvider';
import {ConnectWalletButton} from './ConnectWallet/connect-wallet';

const LayoutWrapper = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: ${props => props.mobile ? "1fr" : "10% 90%"};
  grid-template-rows: ${props => props.mobile ? "35vw" : "5vw auto"};
  background: ${props => props.mobile ? "rgb(41,67,58)" : null};
  //TODO: Ask Sergiy to generate true radial-gradient style rules. This is was generated by me and it is not so correct.
  background: ${props => props.mobile ? "radial-gradient(circle, rgba(44,94,77,1) 0%, rgba(38,51,47,1) 23%, rgba(35,35,35,1) 52%)" : "#202020"};
  transition: 0.3s background-color;
`

const Header = styled.div`
  display: grid;
  grid-column: 1/5;
  grid-template-columns: ${props => props.mobile ? "1fr 3fr 1fr" : "0.4fr 3fr 0.5fr"};
  grid-template-rows: ${props => props.mobile ? "1fr 1fr" : "none"};
  box-sizing: border-box;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;

  padding-bottom: 100px;
  overflow-y: auto;
  
  @media only screen and (max-width: 750px) {
    padding-bottom: 0;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`

const ContentHeader = styled.div`
  display: flex;
  align-items: center;

  padding: 0 2.5vw;

  h1 {
    font-weight: 500;
    font-size: 1.8vw;
    color: white;
    
    @media screen only and (max-width: 750px) {
      padding-left: 6%;
      font-size: 2.4vw;
    }
  }
`

const TradingBar = styled.div`
  display: flex;
  color: white;
  margin-left: 4.583vw;
  
  .buttons {
    display: flex;
    align-items: center;

    margin-left: 24vw;

    button {
      padding: 0.417vw 1.875vw;
      font-size: 0.729vw;
      cursor: pointer;

      border: none;
      background: transparent;
    }

    .active {
      background: #40BA93;
      border-radius: 1.052vw;
    }
  }

  main {
    display: flex;
    align-items: center;
    padding: 0.417vw 1.25vw;

    border: 0.052vw solid #4F4F4F;
    border-radius: 1.302vw;
    background: linear-gradient(94.62deg, rgba(150, 17, 255, 0.4) 0%, rgba(61, 27, 87, 0.4) 116.74%);

    img {
      &:not(:first-child) {
        margin-left: 0.313vw;
      }

      width: 1.354vw;
      height: 1.354vw;
    }

    p {
      margin-left: 0.521vw;
      font-weight: 400;
      font-size: 0.938vw;
    }

    svg {
      margin: 0 0.625vw;
      width: 0.052vw;
      height: 100%;

      &:last-child {
        width: 0.521vw;
        height: 0.313vw;
      }
    }

    span {
      font-weight: 400;
      font-size: 0.938vw;
      color: #828282;
      margin-right: 0.417vw;
    }

    b {
      font-size: 0.938vw;
      font-weight: 500;
      margin-right: 1.25vw;
    }
  }
`

const SearchBar = styled.div`
  width: 39.271vw;
  padding: 1.354vw 1.979vw;

  margin: 0 auto;
  
  display: flex;
  align-items: center;
  background: #1A1A1A;
  border-radius: 2.083vw;
  
  input {
    width: 100%;
    font-size: 0.938vw;
    font-weight: 300;

    color: white;

    border: none;
    background: none;
    outline: none;

    &:focus {
      &::placeholder {
          opacity: 0;
      } 
    }
  }
`

const AgoLogo = styled.img`
  width: 2.60vw;
  height: 2.20vw;
  place-self: center;

  @media screen and (max-width: 1200px) {
    width: 3.4vw;
    height: 3.4vw;
  }

  @media screen and (max-width: 750px) {
    width: 9vw;
    height: 8vw;
  }
`

const PageName = styled.h1`
  display: ${props => props.mobile ? "block" : "none"};
  color: white;
  font-size: 24px;
  place-self: center;

  @media screen and (max-width: 750px) {
    font-size: 6vw;
  }
`

const BurgerButton = styled.button`
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

export const Layout = ({children}) => {

    const [showMobileSideBar, setShowMobileSideBar] = useState(false);
    const {loading} = useSystemContext();
    const history = useHistory();

    const loadingIcon = <LoadingOutlined
        style={{fontSize: "7vw", color: "#40BA93", position: "fixed", top: "50%", left: "50%"}}/>

    const isMobileScreen = useMediaQuery({query: '(max-width: 750px)'})

    return (
        <>
            <LayoutWrapper mobile={isMobileScreen}>
                <Header mobile={isMobileScreen}>
                    <AgoLogo 
                    mobile={isMobileScreen} 
                    src={ago_icon} alt="ago-coin"
                    />
                    {isMobileScreen ?
                        <>
                            <PageName mobile={isMobileScreen}>{PAGES.find(item => item.path === history.location.pathname).name}</PageName>
                            <BurgerButton onClick={() => setShowMobileSideBar(true)} mobile={isMobileScreen}>
                                <img src={burger_menu} alt="burger-mobile"/>
                            </BurgerButton>
                        </>
                        :
                        null
                    }
                    <BalancesTab/>
                    {!isMobileScreen ? <ConnectWalletButton/> : null}
                </Header>
                {!isMobileScreen ? <SideBar/> : null}
                <Content mobile={isMobileScreen}>
                    {!isMobileScreen ? 
                        <ContentHeader>
                          <h1>{PAGES.find(item => item.path === history.location.pathname).name}</h1>
                          {PAGES.find(item => item.path === history.location.pathname).name === 'Trading' ? 
                          <TradingBar>
                            <main>
                              <img src="static/media/WBTC.3d49d464.svg" />
                              <img src="static/media/USDT.6dc09781.svg" />
                              <p>WBTC-USDT</p>
                              <svg width="1" height="27" viewBox="0 0 1 27"><line x1="0.5" y1="2.1857e-08" x2="0.499999" y2="27" stroke="white"/></svg>
                              <span>Liquidity:</span>
                              <b>$400,335,212</b>
                              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 0.901211L5 6L0 0.901211L0.88375 0L5 4.19758L9.11625 0" fill="white"/>
                              </svg>
                            </main>

                            <div className="buttons">
                              <button>Simple Swap</button>
                              <button className='active'>Trading</button>
                            </div>
                          </TradingBar>
                          : null}

                          {PAGES.find(item => item.path === history.location.pathname).name === 'Liquidity-Pools' ? 
                          <SearchBar>
                            <input type="text" placeholder="Search pool" />
                            <svg width="23" height="23" viewBox="0 0 23 23">
                              <path d="M9.17198 18.344C4.09212 18.344 0 14.2519 0 9.17198C0 4.09212 4.09212 0 9.17198 0C14.2519 0 18.344 4.09212 18.344 9.17198C18.344 14.2519 14.2519 18.344 9.17198 18.344ZM9.17198 1.41107C4.86821 1.41107 1.41107 4.86821 1.41107 9.17198C1.41107 13.4758 4.86821 16.9329 9.17198 16.9329C13.4758 16.9329 16.9329 13.4758 16.9329 9.17198C16.9329 4.86821 13.4758 1.41107 9.17198 1.41107Z" fill="#333333"/>
                              <path d="M16.0027 15.0048L22.3384 21.3405L21.3408 22.3381L15.0051 16.0024L16.0027 15.0048Z" fill="#333333"/>
                            </svg>
                          </SearchBar>
                          : null}
                        </ContentHeader> : null}
                    {loading ? <Spin size="large" indicator={loadingIcon}/> : children}
                </Content>
                {isMobileScreen 
                ? <SideBarMobile 
                showMobileSideBar={showMobileSideBar}
                setShowMobileSideBar={setShowMobileSideBar}
                /> : null}
            </LayoutWrapper>
        </>
    )
}