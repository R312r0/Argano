import {
    ApolloClient,
    InMemoryCache,
    gql
} from "@apollo/client";
import { WebSocketLink } from '@apollo/client/link/ws';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { FACTORY_ADDRESS } from "../constants";



const httpLink = new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/r312r0/vlad-ago-subgraph'
});

const wsLink = new WebSocketLink({
    uri: 'wss://api.thegraph.com/subgraphs/name/r312r0/vlad-ago-subgraph',
    options: {
        reconnect: true
    }
});

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

export const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache()
});

const quickHttpLink = new HttpLink({
    uri: "https://api.thegraph.com/subgraphs/name/sameepsi/quickswap05"
})

export const quickswapClient = new ApolloClient({
    link: quickHttpLink,
    cache: new InMemoryCache()
})

export const TOKENS_PAIRS = gql(`
    query tokens_pairs {
        tokens(first: 100) {
            id
            symbol
            decimals
            priceUSD
            isProtocolMain
        }
        pairs(first: 100) {
            id
            token0 {
                symbol
            }
            token1 {
                symbol
            }
            
        }
    }
`)

export const MAIN_TOKENS_DATA_QUERY = gql(`
    query mainTokens {
        tokens(first: 100, orderBy: symbol, orderDirection: asc) {
            id
            symbol
            priceUSD
            lineChartUSD(orderBy: timestamp, orderDirection: asc) {
             valueUSD
             timestamp
           }
        }
    }
`)

export const TOKENS_FOR_LIQUIDITY_POOLS = gql(`
    query liqTokens {
        tokens(first: 100, orderBy: symbol, orderDirection: asc) {
            id
            symbol
            decimals
        }
    }
`)

export const TOKENS_FOR_USER_BALANCES = gql(`

    query userBalanceTokens {
        tokens(first: 100, orderBy: symbol, orderDirection: asc, where: {isProtocolMain: true}) {
            id
            decimals
            symbol
            priceUSD
        }
        pairs(first: 100, where: {isRewardPool: true}) {
            id
            token0 {
                symbol
            }
            token1 {
                symbol
            }
        }
    }

`)

export const GET_PAIR_TXS = gql(`
    query pairTxs($token0: String!, $token1: String!) {
        transactions(first: 100, where: {token0: $token0, token1: $token1}, orderBy: timestamp, orderDirection: desc) {
            name
            from
            token0
            token1
            amount0
            amount1
            amountTotalUSD
            timestamp
        }
    }

`)

export const LIQUIDITY_POOLS = gql(`
    query liqPools {
        pairs(first: 10) {
          id
          reserveETH
          reserveUSD
          volumeUSD
          isRewardPool
          liquidityChart(orderBy: timestamp, orderDirection: asc) {
            valueUSD
            timestamp
          }
          volumeChart {
            valueUSD
            timestamp
          }
          token0 {
            id
            symbol
            priceUSD
          }
          token1 {
            id
            symbol
            priceUSD
          }
          token0Price
          token1Price
          reserve0
          reserve1
        }
    }
`)

export const TOKENS_TRADING = gql(`
    query tradingTokens {
        tokens(first: 100, orderBy: symbol, orderDirection: asc) {
            symbol
            lineChartUSD(orderBy: timestamp, orderDirection: asc) {
             valueUSD
             timestamp
           }
        }
    }
`)

export const LIQ_POOLS_ACCOUNTS = gql(`
    query userPools {
        pairs(first: 100) {
            id
            reserveUSD
            token0 {
                symbol
            }
            token1 {
                symbol
            }
        }
    }

`)


export const PORTFOLIO_PERFOMANCE = gql(`
    
    query userPortfolioPerformance($id: String!) {
        user(id: $id) {
            portfolioPerfomance(first: 200, orderBy: timestamp, orderDirection: asc) {
              value {
                AGOBalance
                AGOUSDBalance
                AGOBTCBalance
                CNUSDBalance
                CNBTCBalance
                WMATICBalance
                USDTBalance
                WBTCBalance
              }
              timestamp
            }
        }
        tokens(first: 15, where: {isProtocolMain: true}) {
            symbol
            priceUSD
            lineChartUSD(orderBy: timestamp, orderDirection: desc) {
             valueUSD
             timestamp
           }
        }
    }
`)

export const USER_TXS_HISTORY = gql(`
    
    query userTxs($id: String!) {
        transactions(first: 200, orderBy: timestamp, orderDirection: desc, where: {from: $id}) {
            name
            from
            token0
            tokenShare
            token1
            amount0
            amountShare
            amount1
            amountTotalUSD
            timestamp
        }
    }

`)

export const LIQ_POOLS_TRADING = gql(`

    query tradingPairs {
        pairs(first: 100, orderBy: reserveUSD, orderDirection: desc) {
            id
            reserveUSD
            token0 {
                id
                decimals
                name
                symbol
                priceUSD
            }
            token1 {
                id
                decimals
                name
                symbol
                priceUSD
            }
            token0Price
            token1Price
        }
        
    }

`)
