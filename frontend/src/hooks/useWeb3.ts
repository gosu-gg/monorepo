import * as React from "react";
import Web3 from "web3";

import { Dispatch, State, Web3Context } from "../contexts/Web3Context";
import {
  RPC_URL,
  SUPPORTED_CHAIN_ID,
  SUPPORTED_CHAIN_ID_STRING,
  SUPPORTED_CHAIN_NAME,
} from "../utils/chain_infos";

import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import Web3Modal from "web3modal";

export const providerOptions = {
  walletlink: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "Gosu",
    },
  },
};

const web3Modal = new Web3Modal({
  // cacheProvider: true,
  providerOptions, // required
  theme: "dark",
});

// eslint-disable-next-line
declare let window: any;

type ReturnType = {
  connectWallet: () => Promise<void>;
  setWeb3State: Dispatch;
  switchToRightNetwork: () => Promise<void>;
  web3State: State;
};

const useWeb3 = (): ReturnType => {
  const context = React.useContext(Web3Context);
  if (context === undefined)
    throw new Error("useWeb3 must be used within a Web3Provider");

  const { web3State, setWeb3State } = context;

  const connectWallet = async () => {
    if (window.ethereum && !web3State.walletConnected) {
      try {
        // await window.ethereum.request({ method: "eth_requestAccounts" });
        const test = await web3Modal.connect();
        let provider = new Web3(test);
        // let provider = new Web3(window.ethereum);
        const accounts = await provider.eth.getAccounts();
        const address = accounts[0];
        const chainId = await provider.eth.getChainId();
        const rightChainId = chainId === SUPPORTED_CHAIN_ID;
        provider = rightChainId
          ? // ? new Web3(window.ethereum)
            new Web3(test)
          : new Web3(new Web3.providers.HttpProvider(RPC_URL));

        setWeb3State({
          walletConnected: true,
          address,
          provider,
          rightChainId,
        });

        window.ethereum.on("chainChanged", (chainId: string) => {
          const rightChainId = parseInt(chainId, 16) === SUPPORTED_CHAIN_ID;
          const provider = rightChainId
            ? new Web3(window.ethereum)
            : new Web3(new Web3.providers.HttpProvider(RPC_URL));

          setWeb3State((prevWeb3State) => {
            return prevWeb3State.walletConnected
              ? { ...prevWeb3State, provider, rightChainId }
              : prevWeb3State;
          });
        });

        window.ethereum.on("accountsChanged", (accounts: Array<string>) => {
          const address = accounts[0];
          if (!address) {
            setWeb3State({
              provider: new Web3(new Web3.providers.HttpProvider(RPC_URL)),
              walletConnected: false,
            });
            return;
          }

          setWeb3State((prevWeb3State) =>
            prevWeb3State.walletConnected
              ? { ...prevWeb3State, address }
              : prevWeb3State
          );
        });
      } catch (error) {
        console.log("Website connection rejected");
      }
    } else {
      console.log("No web3 wallet");
      return;
    }
  };

  const switchToRightNetwork = async () => {
    const data = [
      {
        chainId: SUPPORTED_CHAIN_ID_STRING,
        chainName: SUPPORTED_CHAIN_NAME,
        nativeCurrency: {
          name: "AVAX",
          symbol: "AVAX",
          decimals: 18,
        },
        rpcUrls: [RPC_URL],
      },
    ];

    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: data,
      });
    } catch (exception) {
      console.error(exception);
    }
    return;
  };

  return { connectWallet, web3State, switchToRightNetwork, setWeb3State };
};

export default useWeb3;
