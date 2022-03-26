import styled from "styled-components";
import { Button, IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import CoCBackgorund from "../../assets/coc_background.jpeg";
import AvalancheLogo from "../../assets/avalanche-avax-logo.png";

export default function CreateGame() {
  return (
    <SCreateGameContainer>
      <h2>Challenge someone</h2>
      <p>Not finding the game you are looking for ? Create one</p>
      <SCOCOption>
        <SGameTitle>Clash Royale</SGameTitle>
      </SCOCOption>
      <SBetContainer>
        <IconButton color="primary">
          <RemoveIcon />
        </IconButton>
        <STextField variant="outlined" placeholder="0.0" />
        <IconButton color="primary">
          <AddIcon />
        </IconButton>
        <SAvaxContainer>
          <SAvaxLogo src={AvalancheLogo} />
          <h4>AVAX</h4>
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
`;

const STextField = styled(TextField)`
  && {
    border-color: #6050dc;
  }
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
