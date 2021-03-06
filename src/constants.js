import AccountIcon from "./assets/icons/nav-links/AccountIcon";
import DashboardIcon from "./assets/icons/nav-links/DashboardIcon";
import FoundryIcon from "./assets/icons/nav-links/FoundryIcon";
import { InjectedConnector } from '@web3-react/injected-connector';
import LiquidityPoolsIcon from "./assets/icons/nav-links/LiquidityPoolsIcon";
// Active icons.
import { LoadingOutlined } from "@ant-design/icons";
import MintRedeemIcon from "./assets/icons/nav-links/MintRedeemIcon";
import { NetworkConnector } from '@web3-react/network-connector';
import StakingIcon from "./assets/icons/nav-links/StakingIcon";
import TradingIcon from "./assets/icons/nav-links/TradingIcon";
import documentIcon from "./assets/icons/document-history.svg";
import downArrowIcon from "./assets/icons/down-arrow-history.svg";
import downloadIcon from "./assets/icons/download-history.svg";
// User txs icons
import lateralArrowsIcon from "./assets/icons/lateral-arrows-history.svg";
import lockIcon from "./assets/icons/lock-history.svg";

export const COINGECKO_IDS = {
  AGO: "uniswap",
  AGOUSD: "tether",
  CNUSD: "usd-coin",
  AGOBTC: "wrapped-bitcoin",
  CNBTC: "adamant",
  WMATIC: "wmatic",
  USDT: "tether",
  WBTC: "wrapped-bitcoin",
};

export const DEPLOYER_ADDRESS = "0x15FEEc5eBFcb2B6403f1De5b93c0d5933edF5bE0";

export const DEX_ADDRESESS = {
  FACTORY: "0xdAc31E70c2C4Fea0629e85e7B67222127A8672d8",
  ROUTER: "0xD3d28e4958bAa48a7c4bDC2e486E0f6D7501f0d8",
  QUICK_ROUTER: "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff",
};

const STABLE_COINS = {
  AGOUSD: "0x629215C28e5F467307a1bf51161505c0730f06C3",
  AGOBTC: "0xe65d6998E744cb46f17B27E5a8559855ac64Ec2D",
};

const SHARE_COINS = {
  CNUSD: "0xB57B1e729673A13E91FF07671aA1bD6e74DCab8b",
  CNBTC: "0xE86E1363132B5B92AC2049058B6A5cb2E04565d3",
};

const LOGIC_CONTRACTS_USD = {
  FOUNDRY_AGOUSD: "0x3A1a9540266558aA59f1A203Dd4B8E6E412022ec",
  POOL_AGOUSD: "0x250EFcd45D9f83036f2D403223c7cCb2E1e9D00b",
  TREASURY_AGOUSD: "0x51d532725399ecaE69cC0b6826967CC7cd69171E",
};

const LOGIC_CONTRACTS_BTC = {
  FOUNDRY_AGOBTC: "0xa3E8EE534d998d66370379d6a4D05AFe0A9df7D1",
  POOL_AGOBTC: "0x610094adF401626D6B62df62bF6E67A7A6E22043",
  TREASURY_AGOBTC: "0xd38BA370CbfB0918a56295152fE4915559b23064",
};

const PAIRS_DEX = {
  AGO_WMATIC: "0x7cBDC04aB8dEFBF88CCfa331e57398Fb36BaE595",
  AOGUSD_USDT: "0xe4db1d34559bB115B954FAd53fd9d4Ed311Ec03E",
  WBTC_AGOBTC: "0x206a734E79fDf5134eF6a0B14D10a170De196717",
  WMATIC_CNBTC: "0x3e17c74Aa689706Ef1ACB18abB62E8eA38986Cf9",
  WMATIC_CNUSD: "0xE5ff83BFF888EfdD2c73EddC3FeAf992EDA37457",
};

const READY_TOKENS = {
  AGO: "0x4e125214Db26128B35c24c66113C63A83029e433",
  AGO_LIQUIDITY: "0xc165f5E799278914dC1FFA10cf31142730ca26f3",
  USDT: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
  WMATIC: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
  WBTC: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",
};

const ORACLES = {
  USDT_CHAINLINK: "0x0A6513e40db6EB1b165753AD52E80663aeA50545",
  WBTC_CHAINLINK: "0xDE31F8bFBD8c84b5360CFACCa3539B938dd78ae6",
};

export const CONTRACT_ADRESESS = {
  // ...DEX_ADDRESESS, // TODO: fix it later
  ...STABLE_COINS,
  ...SHARE_COINS,
  ...LOGIC_CONTRACTS_USD,
  ...LOGIC_CONTRACTS_BTC,
  ...PAIRS_DEX,
  ...READY_TOKENS,
  ...ORACLES,
};

export const SINGLE_STAKING_POOL = [
  { name: "AGOy", address: "0x49881Fa26F4B6EEBF6791E85247b56d412039264" },
  { name: "AGOUSD", address: "0x2b99ba7d51D4Be00852C27dD61dFeCFBC77121c7" },
  { name: "AGOBTC", address: "0x8de26d4Bfd311aF2D727383f9DEdc023BDdAF808" },
];

export const LP_STAKING_POOL = [
  {
    name: "AGOUSD-USDT",
    address: "0x9016A216747900978CdEe75F0Ac2d41Ec3Dc137d",
  },
  {
    name: "CNUSD-WMATIC",
    address: "0x4c99AF184e4598360a5D17b7d6539b900B8B269c",
  },
  {
    name: "WBTC-AGOBTC",
    address: "0x1225b03908fef48a4a7080c6c64907d0094f42cd",
  },
  {
    name: "CNBTC-WMATIC",
    address: "0xe9B7920Cb7a18CB30EA8E58f6b5AD11D12f11081",
  },
];

export const LOADER_INDICATOR = (
  <LoadingOutlined
    style={{
      fontSize: "7vw",
      color: "#40BA93",
      position: "absolute",
      top: "50%",
      left: "50%",
    }}
  />
);

export const LOADER_INDICATOR_LOCAL = (
  <LoadingOutlined
    style={{
      fontSize: "3vw",
      color: "#40BA93",
      position: "absolute",
      top: "50%",
      left: "50%",
    }}
  />
);

export const LOADER_INDICATOR_INNER = (
  <LoadingOutlined
    style={{
      fontSize: "3vw",
      color: "#40BA93",
    }}
  />
);

export const LOADER_INDICATOR_MINI = (
  <LoadingOutlined style={{ fontSize: "1.5vw", color: "#40BA93" }} />
);

// Connectors
export const metaMask = new InjectedConnector({ supportedChainIds: [137] });
export const network = new NetworkConnector({
  urls: { 137: "https://polygon-rpc.com/" },
  defaultChainId: 137,
});

// Message keys
export const MINT_REDEEM_KEY = "MINT_REDEEM_KEY";

// Other
export const MAX_INT =
  "115792089237316195423570985008687907853269984665640564039457584007913129639935";

export const PAGES = [
  {
    path: "/",
    name: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    path: "/mint-redeem",
    name: "Mint/Redeem",
    icon: <MintRedeemIcon />,
  },
  {
    path: "/foundry",
    name: "Foundry",
    icon: <FoundryIcon />,
  },
  {
    path: "/staking",
    name: "Staking",
    icon: <StakingIcon />,
  },
  {
    path: "/liqudity-pools",
    name: "Liquidity Pools",
    icon: <LiquidityPoolsIcon />,
  },
  {
    path: "/trading",
    name: "Trading",
    icon: <TradingIcon />,
  },
  {
    path: "/accounts",
    name: "Account",
    icon: <AccountIcon />,
  },
];

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const TXS_NAME = {
  SWAP: "Swap",
  ADD: "Add liquidity",
  BURN: "Remove liquidity",
  MINT: "Mint",
  REDEEM: "Redeem",
  COLLECT_REDEMPTION: "Collect redemption",
  STAKE: "Stake",
  UNSTAKE: "Unstake",
};

export const TXS_ICONS = {
  SWAP: lateralArrowsIcon,
  ADD: downloadIcon,
  BURN: downArrowIcon,
  MINT: downloadIcon,
  REDEEM: documentIcon,
  COLLECT_REDEMPTION: downloadIcon,
  STAKE: lockIcon,
  UNSTAKE: downArrowIcon,
};

export const tokenColors = [
  "#40BA93",
  "#DB1BB1",
  "#EAD200",
  "#DB1B60",
  "#EA8C00",
  "#2bbdf7",
  "#47867d",
  "#1BB8DB",
  "#9018EE",
];
