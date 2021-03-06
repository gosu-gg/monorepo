import React from "react";
import { Button } from "@mui/material";
import styled from "styled-components";

import { walletAddressShortener } from "../helpers/helpers";
import { useWeb3 } from "../hooks";

export default function ConnectButton() {
  const { connectWallet, switchToRightNetwork, web3State } = useWeb3();

  return !web3State.walletConnected ? (
    <SButton onClick={connectWallet}>Connect wallet</SButton>
  ) : !web3State.rightChainId ? (
    <SButton onClick={switchToRightNetwork}>Switch to WAGMI</SButton>
  ) : (
    <AddressContainer>
      {walletAddressShortener(web3State.address)}{" "}
    </AddressContainer>
  );
}

const SButton = styled(Button)`
  && {
    place-self: flex-end;
    align-self: flex-start;
    grid-area: connect;
    background-color: #6050dc;
    color: white;
    padding: 0.5rem;
    width: 10rem;
    font-family: inherit;
    font-weight: 600;
  }
`;

const AddressContainer = styled.div`
  grid-area: connect;
  border-radius: 4px;
  font-size: 0.875rem;
  line-height: 1.75;
  letter-spacing: 0.02857em;

  display: grid;
  place-items: center;
  background-color: #6050dc;
  color: white;
  padding: 0.5rem;
  width: 10rem;
  font-family: inherit;
  font-weight: 600;
`;
