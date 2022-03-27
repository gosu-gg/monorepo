import * as React from "react";
import styled from "styled-components";
import { Button, IconButton, TextField } from "@mui/material";

import CoCBackgorund from "../../assets/coc_background.jpeg";
import AvalancheLogo from "../../assets/avalanche-avax-logo.png";
import Input from "./Input";

export default function CreateGame() {
  const [betValue, setBetValue] = React.useState("1");

  const operationBetValue = (operation: "add" | "sub") => {
    setBetValue((prev) => {
      const currentValue = parseFloat(prev);
      if (operation === "add") return `${(currentValue + 0.05).toFixed(2)}`;
      return currentValue <= 0 ? "0.0" : `${(currentValue - 0.05).toFixed(2)}`;
    });
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
      <SButton>CREATE GAME</SButton>
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

const SButton = styled(Button)`
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
