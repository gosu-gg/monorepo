import React from "react";
import styled from "styled-components";
import { useWeb3 } from "../hooks";
import ConnectButton from "./ConnectButton";
import { SIDENAV_MARGIN } from "./Sidenav/Sidenav";

type Props = { children?: React.ReactNode; requireConnection: boolean };

export default function Page(props: Props) {
  const { children, requireConnection } = props;
  const { web3State, connectWallet } = useWeb3();

  const connected = requireConnection ? web3State.walletConnected : true;

  return (
    <SPageContainer>
      {connected ? (
        children
      ) : (
        <NotConnectedContainer>
          <NotConnectedTitle>
            You need to connect your wallet to enjoy the GOSU experience !
          </NotConnectedTitle>
        </NotConnectedContainer>
      )}
    </SPageContainer>
  );
}

const SPageContainer = styled.main`
  grid-area: page;
  /* padding: ${SIDENAV_MARGIN}rem ${SIDENAV_MARGIN}rem ${SIDENAV_MARGIN}rem
    ${SIDENAV_MARGIN + 5.885}rem; */
`;

const NotConnectedContainer = styled.div`
  display: flex;
  width: 100%;
`;

const NotConnectedTitle = styled.h2`
  margin: 0 auto;
`;
