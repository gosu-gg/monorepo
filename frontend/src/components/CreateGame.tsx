import * as React from "react";
import styled from "styled-components";
import { Button } from "@mui/material";

import CoCBackgorund from "../../assets/coc_background.jpeg";
import AvalancheLogo from "../../assets/avalanche-avax-logo.png";
import Input from "./Input";
import ConnectButtonWrapper from "./ConnectButtonWrapper";
import { useWeb3 } from "../hooks";
import GosuAbi from "../utils/abi/gosu.json";
import { CONTRACT_ADDRESS } from "../utils/chain_infos";
import LoaderWrapper from "./LoaderWrapper";
import { useNavigate } from "react-router-dom";

export default function CreateGame() {
  const { web3State } = useWeb3();
  const navigate = useNavigate();
  const [betValue, setBetValue] = React.useState("1");
  const [loading, setLoading] = React.useState(false);

  const operationBetValue = (operation: "add" | "sub") => {
    setBetValue((prev) => {
      const currentValue = parseFloat(prev);
      if (operation === "add") return `${(currentValue + 0.05).toFixed(2)}`;
      return currentValue <= 0 ? "0.0" : `${(currentValue - 0.05).toFixed(2)}`;
    });
  };

  const createGame = async () => {
    if (loading || !web3State.walletConnected || !web3State.rightChainId)
      return;

    const contract = new web3State.provider.eth.Contract(
      // eslint-disable-next-line
      GosuAbi.abi as any,
      CONTRACT_ADDRESS
    );

    setLoading(true);
    try {
      await contract.methods.createGame().send({
        from: web3State.address,
        value: web3State.provider.utils.toWei(betValue.toString(), "ether"),
      });

      const gameId = await contract.methods.games(web3State.address).call();

      navigate(gameId);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <SCreateGameContainer>
      <h2>Challenge someone</h2>
      <p>Not finding the game you are looking for ? Create one</p>
      <SCOCOption>
        <SGameTitle>Clash Royale</SGameTitle>
      </SCOCOption>
      <SBetContainer>
        <SBetInputContainer>
          <SBetButton onClick={() => operationBetValue("sub")}>-</SBetButton>
          <Input
            placeholder="0.0"
            value={betValue}
            onChange={(event) => setBetValue(event.target.value)}
          />
          <SBetButton onClick={() => operationBetValue("add")}>+</SBetButton>
        </SBetInputContainer>
        <SAvaxContainer>
          <SAvaxLogo src={AvalancheLogo} />
          <h4>WGM</h4>
        </SAvaxContainer>
      </SBetContainer>
      <ConnectButtonWrapper action={createGame}>
        <LoaderWrapper loading={loading}>CREATE GAME</LoaderWrapper>
      </ConnectButtonWrapper>
    </SCreateGameContainer>
  );
}

const SCreateGameContainer = styled.div`
  width: 25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1e2023;
  border-radius: 10px;
  gap: 1rem;
  padding: 1rem;
`;
const SCOCOption = styled.div`
  background: url(${CoCBackgorund}) no-repeat;
  background-position: center;
  background-size: 100%;
  height: 8rem;
  border-radius: 10px;
  position: relative;
  width: 100%;

  &:before {
    height: 100%;
    width: 100%;
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    background: linear-gradient(transparent, black);
    border-radius: 10px;
  }
`;

const SGameTitle = styled.h3`
  text-transform: uppercase;
  color: white;
  position: absolute;
  margin: auto;
  bottom: 1rem;
  left: 1rem;
`;

const SBetContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SBetInputContainer = styled(SBetContainer)`
  border-radius: 5px;
  border: 2px solid #6050dc;
  overflow: hidden;
`;

const SBetButton = styled.button`
  height: 100%;
  width: 2rem;
  color: white;
  background-color: #6050dc;
  font-size: 20px;
  padding: 0.3rem;
`;

export const SButton = styled(Button)`
  && {
    background-color: #6050dc;
    color: white;
    padding: 0.5rem;
    width: 10rem;
    font-family: inherit;
    font-weight: 600;
  }
`;

const SAvaxLogo = styled.img`
  width: 2rem;
  height: 2rem;
`;

const SAvaxContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;
