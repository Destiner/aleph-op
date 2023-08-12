import { Chain as ChainData } from 'viem';
import {
  mainnet,
  goerli,
  optimism,
  optimismGoerli,
  base,
  baseGoerli,
  zora,
  zoraTestnet,
} from 'viem/chains';

const ETHEREUM = 1;
const GOERLI = 5;
const OPTIMISM = 10;
const OPTIMISM_GOERLI = 420;
const BASE = 8453;
const BASE_GOERLI = 84531;
const ZORA = 7777777;
const ZORA_TESTNET = 999;

type Chain =
  | typeof ETHEREUM
  | typeof GOERLI
  | typeof OPTIMISM
  | typeof OPTIMISM_GOERLI
  | typeof BASE
  | typeof BASE_GOERLI
  | typeof ZORA
  | typeof ZORA_TESTNET;

function getChainName(chainId: Chain): string {
  switch (chainId) {
    case ETHEREUM:
      return mainnet.name;
    case GOERLI:
      return goerli.name;
    case OPTIMISM:
      return optimism.name;
    case OPTIMISM_GOERLI:
      return optimismGoerli.name;
    case BASE:
      return base.name;
    case BASE_GOERLI:
      return baseGoerli.name;
    case ZORA:
      return zora.name;
    case ZORA_TESTNET:
      return zoraTestnet.name;
  }
}

function getExplorerUrl(chainId: Chain): string {
  switch (chainId) {
    case ETHEREUM:
      return mainnet.blockExplorers.etherscan.url;
    case GOERLI:
      return goerli.blockExplorers.etherscan.url;
    case OPTIMISM:
      return optimism.blockExplorers.etherscan.url;
    case OPTIMISM_GOERLI:
      return optimismGoerli.blockExplorers.etherscan.url;
    case BASE:
      return base.blockExplorers.etherscan.url;
    case BASE_GOERLI:
      return baseGoerli.blockExplorers.etherscan.url;
    case ZORA:
      return zora.blockExplorers.default.url;
    case ZORA_TESTNET:
      return zoraTestnet.blockExplorers.default.url;
  }
}

function getEndpointUrl(chainId: Chain, apiKey: string): string {
  switch (chainId) {
    case ETHEREUM:
      return mainnet.rpcUrls.alchemy.http[0] + `/${apiKey}`;
    case GOERLI:
      return goerli.rpcUrls.alchemy.http[0] + `/${apiKey}`;
    case OPTIMISM:
      return optimism.rpcUrls.alchemy.http[0] + `/${apiKey}`;
    case OPTIMISM_GOERLI:
      return optimismGoerli.rpcUrls.alchemy.http[0] + `/${apiKey}`;
    case BASE:
      return base.rpcUrls.public.http[0];
    case BASE_GOERLI:
      return baseGoerli.rpcUrls.public.http[0];
    case ZORA:
      return zora.rpcUrls.public.http[0];
    case ZORA_TESTNET:
      return zoraTestnet.rpcUrls.public.http[0];
  }
}

function getChainData(chainId: Chain): ChainData {
  switch (chainId) {
    case ETHEREUM:
      return mainnet;
    case GOERLI:
      return goerli;
    case OPTIMISM:
      return optimism;
    case OPTIMISM_GOERLI:
      return optimismGoerli;
    case BASE:
      return base;
    case BASE_GOERLI:
      return baseGoerli;
    case ZORA:
      return zora;
    case ZORA_TESTNET:
      return zoraTestnet;
  }
}

function getTestnet(mainnet: Chain): Chain {
  switch (mainnet) {
    case ETHEREUM:
      return GOERLI;
    case OPTIMISM:
      return OPTIMISM_GOERLI;
    case BASE:
      return BASE_GOERLI;
    case ZORA:
      return ZORA_TESTNET;
    default:
      throw new Error(`No testnet for ${mainnet}`);
  }
}

function isTestnet(chainId: Chain): boolean {
  // Using "switch case" here to make sure we don't miss any chain
  switch (chainId) {
    case ETHEREUM:
      return false;
    case GOERLI:
      return true;
    case OPTIMISM:
      return false;
    case OPTIMISM_GOERLI:
      return true;
    case BASE:
      return false;
    case BASE_GOERLI:
      return true;
    case ZORA:
      return false;
    case ZORA_TESTNET:
      return true;
  }
}

export {
  ETHEREUM,
  GOERLI,
  OPTIMISM,
  OPTIMISM_GOERLI,
  BASE,
  BASE_GOERLI,
  ZORA,
  ZORA_TESTNET,
  Chain,
  getChainData,
  getChainName,
  getEndpointUrl,
  getExplorerUrl,
  getTestnet,
  isTestnet,
};
