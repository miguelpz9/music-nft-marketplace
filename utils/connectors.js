import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

import { BINANCE_TESTNET_RPC_URL,SUPPORT_CHAINS } from "./constants";

const injected = new InjectedConnector({
  supportedChainIds: SUPPORT_CHAINS,
});

export const RPC_NETWORK_URLS = { 97: BINANCE_TESTNET_RPC_URL };

const walletConnect = new WalletConnectConnector({
  supportedChainIds: SUPPORT_CHAINS,
  rpc: RPC_NETWORK_URLS,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
});

export const connectors = { injected, walletConnect };
