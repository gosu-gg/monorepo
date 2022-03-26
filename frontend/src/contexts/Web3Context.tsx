import * as React from "react";
import Web3 from "web3";
import { RPC_URL } from "../utils/chain_infos";

type StateCommonProperties = { provider: Web3 };
export type State = StateCommonProperties &
  (
    | { walletConnected?: false }
    | { walletConnected: true; address: string; rightChainId: boolean }
  );
export type Dispatch = React.Dispatch<React.SetStateAction<State>>;

export const Web3Context = React.createContext<
  { web3State: State; setWeb3State: Dispatch } | undefined
>(undefined);

export const Web3Provider: React.FC = ({ children }) => {
  const [web3State, setWeb3State] = React.useState<State>({
    walletConnected: false,
    provider: new Web3(new Web3.providers.HttpProvider(RPC_URL)),
  });
  const value = { web3State, setWeb3State };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};
