import React, {useEffect, useState} from 'react';
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

const ContentHeader = styled.h1`
  padding-left: 2.5vw;
  font-weight: 600;
  font-size: 1.8vw;
  color: white;
  align-self: center;

  margin-right: auto;
  
  @media screen only and (max-width: 750px) {
    padding-left: 6%;
    font-size: 2.4vw;
  }
`

const AgoLogo = styled.img`
  width: ${props => props.mobile ? "44px" : "2.60vw"};
  height: ${props => props.mobile ? "41px" : "2.20vw"};
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
                        <ContentHeader>{PAGES.find(item => item.path === history.location.pathname).name}
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