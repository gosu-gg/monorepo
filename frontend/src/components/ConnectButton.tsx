import React from "react";
import { Button } from "@mui/material";
import styled from "styled-components";

import { walletAddressShortener } from "../helpers/helpers";
import { useWeb3 } from "../hooks";
import { SIDENAV_MARGIN } from "./Sidenav/Sidenav";

export default function ConnectButton() {
  const { connectWallet, switchToRightNetwork, web3State } = useWeb3();

  return !web3State.walletConnected ? (
    <SButton onClick={connectWallet}>Connect wallet</SButton>
  ) : !web3State.rightChainId ? (
    <SButton onClick={switchToRightNetwork}>Switch to Avalanche</SButton>
  ) : (
    <AddressContainer>
      {walletAddressShortener(web3State.address)}{" "}
    </AddressContainer>
  );
}

const SButton = styled(Button)`
  && {
    margin-bottom: ${SIDENAV_MARGIN}rem;
    background-color: #6050dc;
    color: white;
    padding: 0.5rem;
    width: 10rem;
    font-family: inherit;
    font-weight: 600;
  }
`;

const AddressContainer = styled.div`
  border-radius: 4px;
  font-size: 0.875rem;
  line-height: 1.75;
  letter-spacing: 0.02857em;

  display: grid;
  place-items: center;
  margin-bottom: 1rem;
  background-color: #6050dc;
  color: white;
  padding: 0.5rem;
  width: 10rem;
  font-family: inherit;
  font-weight: 600;
`;
