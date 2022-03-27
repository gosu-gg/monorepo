import React from "react";
import { useWeb3 } from "../hooks";
import { SButton } from "./CreateGame";

type Props = {
  action: () => void;
  children: React.ReactNode;
};

export default function ConnectButtonWrapper(props: Props) {
  const { action, children } = props;

  const { connectWallet, switchToRightNetwork, web3State } = useWeb3();

  return !web3State.walletConnected ? (
    <SButton onClick={connectWallet}>Connect wallet</SButton>
  ) : !web3State.rightChainId ? (
    <SButton onClick={switchToRightNetwork}>Switch to Avalanche</SButton>
  ) : (
    <SButton onClick={action}>{children}</SButton>
  );
}
