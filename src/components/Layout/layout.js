import {
  AgoLogo,
  BurgerButton,
  Content,
  Header,
  LayoutWrapper,
  MobileHeader,
  MobileMainHeader,
} from "./styles";
import React, { useContext, useState } from "react";

import { ApproveModal } from "../ApproveModal/approve-modal";
import BalancesTab from "./BalancesTab/balances-tab";
import { ConnectWalletButton } from "./ConnectWallet/connect-wallet";
import { LOADER_INDICATOR } from "../../constants";
import { SideBar } from "./SideBar/sidebar";
import { SideBarMobile } from "./SideBarMobile/sidebar-mobile";
import { Spin } from "antd";
import { ThemeProvider } from "styled-components";
import { WalletModal } from "../WalletModal/wallet_modal";
import ago_icon from "../../assets/icons/ago-logo.svg";
import burger_menu from "../../assets/icons/burger-menu.svg";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useSystemContext } from "../../systemProvider";

const ThemeContext = React.createContext();
export const useThemeContext = () => useContext(ThemeContext);

const Layout = ({ children }) => {
  const history = useHistory();
  const [showMobileSideBar, setShowMobileSideBar] = useState(false);
  const isMobileScreen = useMediaQuery({ query: "(max-width: 750px)" });
  const { web3Loading } = useSystemContext();
  const [activeTab, setActiveTab] = useState(history.location.pathname);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  const styledTheme = {
    light: theme === "light",
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemeProvider theme={styledTheme}>
        <LayoutWrapper mobile={isMobileScreen} light={theme === "light"}>
          {isMobileScreen ? (
            <>
              <MobileHeader>
                <MobileMainHeader>
                  <AgoLogo
                    mobile={isMobileScreen}
                    src={ago_icon}
                    alt="ago-coin"
                  />
                  {/* <PageName mobile={isMobileScreen}>{PAGES.find(item => item.path === history.location.pathname).name}</PageName> */}
                  <BurgerButton
                    onClick={() => setShowMobileSideBar(true)}
                    mobile={isMobileScreen}
                  >
                    <img src={burger_menu} alt="burger-mobile" />
                  </BurgerButton>
                </MobileMainHeader>
                <BalancesTab />
              </MobileHeader>

              <SideBarMobile
                showMobileSideBar={showMobileSideBar}
                setShowMobileSideBar={setShowMobileSideBar}
              />
            </>
          ) : (
            <>
              <Header mobile={isMobileScreen}>
                <AgoLogo
                  onClick={() => history.push("/")}
                  mobile={isMobileScreen}
                  src={ago_icon}
                  alt="ago-coin"
                />
                <BalancesTab />
                <ConnectWalletButton />
              </Header>
              <SideBar history={history} />
              <Content mobile={isMobileScreen}>
                {web3Loading ? <Spin indicator={LOADER_INDICATOR} /> : children}
              </Content>
              <WalletModal />
              <ApproveModal />
            </>
          )}
        </LayoutWrapper>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default React.memo(Layout);
