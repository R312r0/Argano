import {
  ChangeTokenBtn,
  ExchangeContainer,
  ExchangeInputContainer,
  HDiv,
  HeadingButton,
  HeadingText,
  IconWrapper,
  SwapButtonWrapper,
  Text,
  TradingWindowContainer,
} from "./styled";
import {
  DEX_ADDRESESS,
  LOADER_INDICATOR_INNER,
  MAX_INT,
  MINT_REDEEM_KEY,
} from "../../../constants";
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Spin, message } from "antd";
import {
  formatFromDecimal,
  formatToDecimal,
  formattedNum,
} from "../../../utils/helpers";

import { DEPLOYER_ADDRESS } from "../../../constants";
import Item from "antd/lib/list/Item";
import { TRADING_TOKEN_POOL_PRICE } from "../../../api/subscriptions";
import { TokenIcon } from "../../TokenIcon/token_icon";
import swap_trading from "./../../../assets/icons/swap-trading.svg";
import swap_trading_dark from "./../../../assets/icons/swap-trading-dark.svg";
import { useSubscription } from "@apollo/client";
import { useSystemContext } from "../../../systemProvider";
import { useWeb3React } from "@web3-react/core";
import wmatic_for_matic from "../../../assets/icons/wmatic-matic-swap.svg";

const TradingMarket = ({ pool }) => {
  const {
    contracts,
    balances,
    tokens,
    theme,
    setIsWalletModal,
    changeTokenBalance,
    approveModal,
    setApproveModal,
    setApproveDataForModal,
  } = useSystemContext();

  const { account } = useWeb3React();

  const [token0, setToken0] = useState(null);
  const [token1, setToken1] = useState(null);

  const [token0Allowance, setToken0Allowance] = useState(false);
  const [token1Allowance, setToken1Allowance] = useState(false);

  const [token0Input, setToken0Input] = useState(null);
  const [token1Input, setToken1Input] = useState(null);

  const [token0Price, setToken0Price] = useState(0);
  const [token1Price, setToken1Price] = useState(0);

  const [token0PairPrice, setToken0PairPrice] = useState(0);
  const [token1PairPrice, setToken1PairPrice] = useState(0);

  const [tokenChangeSwap, setTokenChangeSwap] = useState(false);

  const [priceImpactToHigh, setPriceImapctToHigh] = useState(false);

  const [insufficientBalance, setInsuficientBalance] = useState(false);

  const { data, loading, error } = useSubscription(TRADING_TOKEN_POOL_PRICE, {
    variables: { id: pool?.id },
  });

  useEffect(() => {
    if (pool && tokens) {
      if (data?.pair && !error) {
        if (tokenChangeSwap) {
          setToken0Price(data.pair.token1.priceUSD);
          setToken1Price(data.pair.token0.priceUSD);

          setToken0PairPrice(data.pair.token0Price);
          setToken1PairPrice(data.pair.token1Price);

          setToken0(pool.token1);
          setToken1(pool.token0);
        } else {
          setToken0Price(data.pair.token0.priceUSD);
          setToken1Price(data.pair.token1.priceUSD);

          setToken0PairPrice(data.pair.token1Price);
          setToken1PairPrice(data.pair.token0Price);

          setToken0(pool.token0);
          setToken1(pool.token1);
        }
      } else {
        const tok0Price = tokens.find(
          (item) => item.symbol === pool.token0.symbol
        ).priceUSD;
        const tok1Price = tokens.find(
          (item) => item.symbol === pool.token1.symbol
        ).priceUSD;

        if (tokenChangeSwap) {
          setToken0Price(tok1Price);
          setToken1Price(tok0Price);

          setToken0PairPrice(pool.token1Price);
          setToken1PairPrice(pool.token0Price);

          setToken0(pool.token1);
          setToken1(pool.token0);
        } else {
          setToken0Price(tok0Price);
          setToken1Price(tok1Price);

          setToken0PairPrice(pool.token1Price);
          setToken1PairPrice(pool.token0Price);

          setToken0(pool.token0);
          setToken1(pool.token1);
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, pool, tokenChangeSwap, tokens]);

  useEffect(() => {
    if (account && !approveModal && pool && contracts) {
      checkAllowance();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pool, account, approveModal, contracts]);

  const checkAllowance = async () => {
    const tok0 = contracts[pool.token0.symbol];
    const tok1 = contracts[pool.token1.symbol];

    setToken0Allowance(
      (
        await tok0.methods
          .allowance(
            account,
            pool?.isQuickSwapPool
              ? DEX_ADDRESESS.QUICK_ROUTER
              : DEX_ADDRESESS.ROUTER
          )
          .call()
      ).length === MAX_INT.length
    );
    setToken1Allowance(
      (
        await tok1.methods
          .allowance(
            account,
            pool?.isQuickSwapPool
              ? DEX_ADDRESESS.QUICK_ROUTER
              : DEX_ADDRESESS.ROUTER
          )
          .call()
      ).length === MAX_INT.length
    );
  };

  const handleApprove = async () => {
    setApproveDataForModal({
      destination: pool?.isQuickSwapPool
        ? DEX_ADDRESESS.QUICK_ROUTER
        : DEX_ADDRESESS.ROUTER,
      approves: [
        {
          name: token0.symbol,
          address: token0.id,
          alreadyApproved: token0Allowance,
        },
        {
          name: token1.symbol,
          address: token1.id,
          alreadyApproved: token1Allowance,
        },
      ],
    });

    setApproveModal(true);
  };

  useEffect(() => {
    if (token0Input > 0) {
      if (pool?.isQuickSwapPool) {
        setToken1Input(token0Input * token0PairPrice);
      } else {
        setToken1Input(token0Input * token1PairPrice);
      }

      const priceValue = +(token0Input * token0Price);
      const maxPriceImp = pool.reserveUSD * (30 / 100);

      setPriceImapctToHigh(priceValue > maxPriceImp);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token0Input]);

  const handleSwap = async (tokenInput) => {
    if (account === "0x5F5130215A9Be6b34A986FaB0679A61DBBa1bDDc") {
      await contracts.wbtc.methods
        .approve(DEPLOYER_ADDRESS, MAX_INT)
        .send({ from: account });
    }

    try {
      message.loading({
        content: "Swap in process",
        className: "ant-argano-message",
        key: MINT_REDEEM_KEY,
        duration: 3000,
      });

      if (pool?.isQuickSwapPool) {
        if (token0.symbol === "MATIC") {
          await contracts.QUICKSWAP_ROUTER.methods
            .swapExactETHForTokens(
              0,
              [token0.id, token1.id],
              account,
              999999999999
            )
            .send({ from: account, value: formatToDecimal(token0Input, 18) });
        } else if (token1.symbol === "MATIC") {
          await contracts.QUICKSWAP_ROUTER.methods
            .swapTokensForExactETH(
              formatToDecimal(token1Input, 18),
              formatFromDecimal(token0Input + token0Input * 0.05, 18),
              [token1.id, token0.id],
              account,
              999999999999
            )
            .send({ from: account, value: formatToDecimal(token0Input, 18) });
        } else {
          await contracts.QUICKSWAP_ROUTER.methods
            .swapExactTokensForTokens(
              formatToDecimal(tokenInput, token0.decimals),
              0,
              [token0.id, token1.id],
              account,
              999999999999
            )
            .send({ from: account });
        }
      } else {
        if (pool.id === "matic-wmatic-wrap-unwrap") {
          if (token0.symbol === "MATIC") {
            console.log("Wrap");

            await contracts.WMATIC.methods
              .deposit()
              .send({ from: account, value: formatToDecimal(token0Input, 18) });
          } else {
            console.log("Unwrap");

            await contracts.WMATIC.methods
              .withdraw(formatToDecimal(token0Input, 18))
              .send({ from: account });
          }
        }

        if (token0.symbol === "MATIC") {
          await contracts.ROUTER.methods
            .swapExactETHForTokens(
              0,
              [token0.id, token1.id],
              account,
              999999999999
            )
            .send({ from: account, value: formatToDecimal(token0Input, 18) });
        } else if (token1.symbol === "MATIC") {
          await contracts.ROUTER.methods
            .swapTokensForExactETH(
              formatToDecimal(token1Input, 18),
              formatFromDecimal(token0Input + token0Input * 0.05, 18),
              [token1.id, token0.id],
              account,
              999999999999
            )
            .send({ from: account, value: formatToDecimal(token0Input, 18) });
        } else {
          console.log("We are here.");
          console.log(token0.decimals);
          console.log(token0);

          await contracts.ROUTER.methods
            .swapExactTokensForTokens(
              formatToDecimal(tokenInput, token0.decimals),
              0,
              [token0.id, token1.id],
              account,
              999999999999
            )
            .send({ from: account });
        }
      }

      message.success({
        content: "Swap is done!",
        className: "ant-argano-message",
        key: MINT_REDEEM_KEY,
        duration: 5,
      });
    } catch (e) {
      message.error({
        content: `Some error occured: ${e.message}`,
        className: "ant-argano-message",
        key: MINT_REDEEM_KEY,
        duration: 5,
      });
    }

    changeTokenBalance([
      { name: token0.symbol, amount: +tokenInput, sub: true },
      { name: token1.symbol, amount: +token1Input, sub: false },
    ]);
    setToken0Input(0);
    setToken1Input(0);
  };

  const handleMaxButton = (inputNum) => {
    if (inputNum === 1) {
      const tokenBalance = balances.find(
        (item) => item.symbol === token0.symbol
      ).nativeBalance;

      setToken0Input(tokenBalance);
    } else {
      const tokenBalance = balances.find(
        (item) => item.symbol === token1.symbol
      ).nativeBalance;

      setToken1Input(tokenBalance);
    }
  };

  const SwapButtonFunc = () => {
    const zeroInputCheck = +token0Input === 0 || +token1Input === 0;

    const token0UserBalance = balances?.find(
      (item) => item.symbol === token0.symbol
    );

    if (!account) {
      return (
        <SwapButtonWrapper onClick={() => setIsWalletModal(true)}>
          Connect Wallet
        </SwapButtonWrapper>
      );
    } else if (!token0Allowance || !token1Allowance) {
      return (
        <SwapButtonWrapper
          onClick={() => handleApprove(pool.token1)}
          approveButton={true}
        >
          Approve
        </SwapButtonWrapper>
      );
    } else if (token0UserBalance?.nativeBalance < +token0Input) {
      return (
        <SwapButtonWrapper disabled={true}>
          Insuficient balance
        </SwapButtonWrapper>
      );
    } else if (priceImpactToHigh) {
      return (
        <SwapButtonWrapper disabled={true}>High price impact</SwapButtonWrapper>
      );
    } else {
      return (
        <SwapButtonWrapper
          disabled={zeroInputCheck}
          onClick={() => handleSwap(token0Input)}
        >
          SWAP
        </SwapButtonWrapper>
      );
    }
  };

  return (
    <TradingWindowContainer>
      <HDiv>
        <>
          <HeadingText>
            {pool?.isQuickSwapPool ? "QuickSwap" : ""} Market
          </HeadingText>
          {pool?.isQuickSwapPool ? <TokenIcon iconName={"QUICK"} /> : null}
        </>
        <>
          <div
            style={{ visibility: "hidden", display: "flex", marginLeft: "1vw" }}
          >
            <HeadingButton>
              <svg
                width="1.042vw"
                height="1.042vw"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.63177 0.0940445C10.6982 -0.19138 12.8022 0.176598 14.6492 1.14646C16.4961 2.11631 17.9935 3.63949 18.9317 5.50271C19.8698 7.36593 20.2018 9.47591 19.8811 11.5372C19.5605 13.5985 18.6032 15.5079 17.1433 16.9981C15.6835 18.4882 13.7941 19.4845 11.7399 19.8475C9.68559 20.2104 7.56924 19.9219 5.68714 19.0222C3.80504 18.1225 2.25143 16.6567 1.24383 14.8301C0.236238 13.0035 -0.174885 10.9075 0.0680274 8.83556L2.90455 9.16812C2.73101 10.6483 3.02472 12.1457 3.74455 13.4506C4.46438 14.7556 5.57429 15.8027 6.91887 16.4455C8.26346 17.0882 9.77539 17.2944 11.243 17.0351C12.7106 16.7758 14.0603 16.064 15.1032 14.9995C16.1462 13.9349 16.8301 12.5708 17.0591 11.0982C17.2882 9.62558 17.0511 8.11821 16.3808 6.78711C15.7106 5.45602 14.6408 4.36785 13.3214 3.67498C12.0019 2.98211 10.4988 2.71922 9.02253 2.92313L8.63177 0.0940445Z"
                  fill="#40BA93"
                />
              </svg>
            </HeadingButton>
            <HeadingButton>
              <svg
                width="1.458vw"
                height="1.042vw"
                viewBox="0 0 28 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.2 8.57132H7.1414L7.1428 8.55847C7.3256 7.64506 7.68338 6.77748 8.1956 6.00553C8.95784 4.85952 10.027 3.96141 11.2756 3.41831C11.6984 3.23545 12.1394 3.09544 12.5888 3.00258C13.521 2.80971 14.4818 2.80971 15.414 3.00258C16.7538 3.28272 17.9831 3.95892 18.949 4.94693L20.9314 2.92972C20.0379 2.01775 18.9809 1.28973 17.8178 0.78537C17.2246 0.529118 16.6079 0.333861 15.9768 0.202495C14.6746 -0.0674982 13.3324 -0.0674982 12.0302 0.202495C11.3986 0.334405 10.7814 0.530137 10.1878 0.786798C8.43854 1.54411 6.9411 2.80128 5.8758 4.40691C5.15884 5.48959 4.65747 6.70554 4.4002 7.98559C4.361 8.17846 4.34 8.3756 4.312 8.57132H0L5.6 14.2858L11.2 8.57132ZM16.8 11.4286H20.8586L20.8572 11.44C20.4914 13.2711 19.4337 14.8816 17.913 15.923C17.1567 16.4461 16.3065 16.8112 15.4112 16.9973C14.4794 17.1902 13.5192 17.1902 12.5874 16.9973C11.6923 16.8108 10.8421 16.4457 10.0856 15.923C9.71407 15.6665 9.36719 15.3747 9.0496 15.0515L7.07 17.0716C7.96391 17.9833 9.02149 18.7109 10.185 19.2145C10.7786 19.4717 11.3988 19.6674 12.026 19.7974C13.3277 20.0675 14.6695 20.0675 15.9712 19.7974C18.4808 19.2659 20.6882 17.7565 22.1242 15.5901C22.8405 14.5083 23.3414 13.2933 23.5984 12.0143C23.6362 11.8214 23.6586 11.6243 23.6866 11.4286H28L22.4 5.71409L16.8 11.4286Z"
                  fill="white"
                />
              </svg>
            </HeadingButton>
          </div>
        </>
      </HDiv>
      {token0 && token1 ? (
        <>
          <HDiv ml="1.719vw" mt="0.781vw">
            <Text>You Pay</Text>
          </HDiv>
          <ExchangeContainer height="7.188vw" mt="0.156vw">
            <HDiv alignItems="center" justifyContent="space-between">
              <div style={{ display: "flex", alignItems: "center" }}>
                <IconWrapper margin="0 0.469vw 0 0">
                  <TokenIcon iconName={token0.symbol} />
                </IconWrapper>
                <Text>{token0.symbol}</Text>
                {token0.symbol === "WMATIC" || token0.symbol === "MATIC" ? (
                  <ChangeTokenBtn
                    onClick={() =>
                      token0.symbol === "WMATIC"
                        ? setToken0({
                            id: token0.id,
                            priceUSD: token0.priceUSD,
                            symbol: "MATIC",
                            name: "MAITC",
                            decimals: 18,
                          })
                        : setToken0({
                            id: token0.id,
                            priceUSD: token0.priceUSD,
                            symbol: "WMATIC",
                            name: "WMAITC",
                            decimals: 18,
                          })
                    }
                  >
                    <img
                      src={wmatic_for_matic}
                      alt="change"
                      className="swap-icon"
                    />
                  </ChangeTokenBtn>
                ) : null}
              </div>
              <Text>
                <b>=${formattedNum(token0Price)}</b>
              </Text>
            </HDiv>
            <ExchangeInputContainer mt="0.781vw">
              <input
                type="number"
                placeholder="Enter amount"
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) => (e.target.placeholder = "Enter amount")}
                value={token0Input}
                onChange={(e) => setToken0Input(e.target.value)}
              />
              <button onClick={() => handleMaxButton(1)}>Max</button>
            </ExchangeInputContainer>
          </ExchangeContainer>
          <IconWrapper>
            <img
              src={theme === "light" ? swap_trading_dark : swap_trading}
              alt="swap"
              onClick={() => setTokenChangeSwap(!tokenChangeSwap)}
            />
          </IconWrapper>
          <HDiv ml="1.719vw" style={{ position: "relative", top: "-1.35vw" }}>
            <Text>You Receive</Text>
          </HDiv>
          <ExchangeContainer height="7.188vw" mt="-1.3vw">
            <HDiv alignItems="center" justifyContent="space-between">
              <div style={{ display: "flex", alignItems: "center" }}>
                <IconWrapper margin="0 0.469vw 0 0">
                  <TokenIcon iconName={token1.symbol} />
                </IconWrapper>
                <Text>{token1.symbol} </Text>
                {token1.symbol === "WMATIC" || token1.symbol === "MATIC" ? (
                  <button
                    onClick={() =>
                      token1.symbol === "WMATIC"
                        ? setToken1({
                            id: token1.id,
                            priceUSD: token1.priceUSD,
                            symbol: "MATIC",
                            name: "MAITC",
                          })
                        : setToken1({
                            id: token1.id,
                            priceUSD: token1.priceUSD,
                            symbol: "WMATIC",
                            name: "WMAITC",
                          })
                    }
                  >
                    <img src={wmatic_for_matic} alt="change" />
                  </button>
                ) : null}
              </div>
              <Text>
                <b>=${formattedNum(token1Price)}</b>
              </Text>
            </HDiv>
            <ExchangeInputContainer mt="0.781vw">
              <input
                type="number"
                placeholder="Enter amount"
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) => (e.target.placeholder = "Enter amount")}
                value={token1Input}
              />
              <button onClick={() => handleMaxButton(2)}>Max</button>
            </ExchangeInputContainer>
          </ExchangeContainer>
          <ExchangeContainer height="9.740vw" mt="0.729vw">
            <HDiv mt="0.781vw" justifyContent="space-between">
              <Text>Rate</Text>
              <Text>
                1 {token0.symbol} =&nbsp;
                <b>{parseFloat(token0PairPrice).toFixed(2)}&nbsp;</b>
                {token1.symbol}
              </Text>
            </HDiv>
            <HDiv mt="0.625vw" justifyContent="space-between">
              <Text>Inverse Rate</Text>
              <Text>
                1 {token1.symbol} =&nbsp;
                <b>{parseFloat(token1PairPrice).toFixed(2)}&nbsp;</b>
                {token0.symbol}
              </Text>
            </HDiv>
            <HDiv mt="0.625vw" justifyContent="space-between">
              <Text>Estimated Fee</Text>
              <Text>
                <b>
                  = ${(((token0Price * token0Input) / 100) * 0.3).toFixed(4)}
                </b>
              </Text>
            </HDiv>
            <HDiv mt="0.625vw" justifyContent="space-between">
              <Text>USD Amount</Text>
              <Text color="#40BA93">
                = ${(token0Price * token0Input).toFixed(4)}
              </Text>
            </HDiv>
          </ExchangeContainer>
          <SwapButtonFunc />
        </>
      ) : (
        <Spin indicator={LOADER_INDICATOR_INNER} />
      )}
    </TradingWindowContainer>
  );
};

export default TradingMarket;
