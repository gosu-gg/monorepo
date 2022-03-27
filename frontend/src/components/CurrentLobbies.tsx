import { Chip } from "@mui/material";
import styled from "styled-components";

import { walletAddressShortener } from "../helpers/helpers";
import ClashRoyaleLogo from "../../assets/clash-royale-icon.png";
import AvaxLogo from "../../assets/avalanche-avax-logo.png";

export default function CurrentLobbies() {
  return (
    <SLobbiesTable>
      <thead>
        <tr>
          <SLobbyHeader>Game</SLobbyHeader>
          <SLobbyHeader>Player 1</SLobbyHeader>
          <SLobbyHeader>Player 2</SLobbyHeader>
          <SLobbyHeader>Bet Amount</SLobbyHeader>
          <SLobbyHeader>Status</SLobbyHeader>
        </tr>
      </thead>
      <tbody>
        <tr>
          <SLobbyTd>
            <SGameDiv>
              <SLogo src={ClashRoyaleLogo} />
              <p>Clash Royale</p>
            </SGameDiv>
          </SLobbyTd>
          <SLobbyTd>
            {walletAddressShortener(
              "0x553411c3597c52BBF4e18521F6f2FfE7e48ca1e1"
            )}
          </SLobbyTd>
          <SLobbyTd>
            {walletAddressShortener(
              "0x31cc282cC1865557246909c760BE7C51B568422D"
            )}
          </SLobbyTd>
          <SLobbyTd>
            <SGameDiv>
              <p>1 WGM</p>
              <SLogo src={AvaxLogo} />
            </SGameDiv>
          </SLobbyTd>
          <SLobbyTd color="#FDDA0D">
            <SGameStatusChip
              background="#feec86"
              customcolor="#caae0a"
              label="Waiting for players"
            />
          </SLobbyTd>
        </tr>
        <tr>
          <SLobbyTd>
            <SGameDiv>
              <SLogo src={ClashRoyaleLogo} />
              <p>Clash Royale</p>
            </SGameDiv>
          </SLobbyTd>
          <SLobbyTd>
            {walletAddressShortener(
              "0x553411c3597c52BBF4e18521F6f2FfE7e48ca1e1"
            )}
          </SLobbyTd>
          <SLobbyTd>
            {walletAddressShortener(
              "0x31cc282cC1865557246909c760BE7C51B568422D"
            )}
          </SLobbyTd>
          <SLobbyTd>
            <SGameDiv>
              <p>1 WGM</p>
              <SLogo src={AvaxLogo} />
            </SGameDiv>
          </SLobbyTd>
          <SLobbyTd>
            <SGameStatusChip
              background="#feec86"
              customcolor="#caae0a"
              label="Waiting for players"
            />
          </SLobbyTd>
        </tr>
        <tr>
          <SLobbyTd>
            <SGameDiv>
              <SLogo src={ClashRoyaleLogo} />
              <p>Clash Royale</p>
            </SGameDiv>
          </SLobbyTd>
          <SLobbyTd>
            {walletAddressShortener(
              "0x553411c3597c52BBF4e18521F6f2FfE7e48ca1e1"
            )}
          </SLobbyTd>
          <SLobbyTd>
            {walletAddressShortener(
              "0x31cc282cC1865557246909c760BE7C51B568422D"
            )}
          </SLobbyTd>
          <SLobbyTd>
            <SGameDiv>
              <p>1 WGM</p>
              <SLogo src={AvaxLogo} />
            </SGameDiv>
          </SLobbyTd>
          <SLobbyTd>
            <SGameStatusChip
              background="#feec86"
              customcolor="#caae0a"
              label="Waiting for players"
            />
          </SLobbyTd>
        </tr>
        <tr>
          <SLobbyTd>
            <SGameDiv>
              <SLogo src={ClashRoyaleLogo} />
              <p>Clash Royale</p>
            </SGameDiv>
          </SLobbyTd>
          <SLobbyTd>
            {walletAddressShortener(
              "0x553411c3597c52BBF4e18521F6f2FfE7e48ca1e1"
            )}
          </SLobbyTd>
          <SLobbyTd>
            {walletAddressShortener(
              "0x31cc282cC1865557246909c760BE7C51B568422D"
            )}
          </SLobbyTd>
          <SLobbyTd>
            <SGameDiv>
              <p>1 WGM</p>
              <SLogo src={AvaxLogo} />
            </SGameDiv>
          </SLobbyTd>
          <SLobbyTd color="#50C878">
            <SGameStatusChip
              background="#a7e3bb"
              customcolor="#388c54"
              label="Currently playing"
            />
          </SLobbyTd>
        </tr>
        <tr>
          <SLobbyTd>
            <SGameDiv>
              <SLogo src={ClashRoyaleLogo} />
              <p>Clash Royale</p>
            </SGameDiv>
          </SLobbyTd>
          <SLobbyTd>
            {walletAddressShortener(
              "0x553411c3597c52BBF4e18521F6f2FfE7e48ca1e1"
            )}
          </SLobbyTd>
          <SLobbyTd>
            {walletAddressShortener(
              "0x31cc282cC1865557246909c760BE7C51B568422D"
            )}
          </SLobbyTd>
          <SLobbyTd>
            <SGameDiv>
              <p>1 WGM</p>
              <SLogo src={AvaxLogo} />
            </SGameDiv>
          </SLobbyTd>
          <SLobbyTd>
            <SGameStatusChip
              background="#a7e3bb"
              customcolor="#388c54"
              label="Currently playing"
            />
          </SLobbyTd>
        </tr>
        <tr>
          <SLobbyTd>
            <SGameDiv>
              <SLogo src={ClashRoyaleLogo} />
              <p>Clash Royale</p>
            </SGameDiv>
          </SLobbyTd>
          <SLobbyTd>
            {walletAddressShortener(
              "0x553411c3597c52BBF4e18521F6f2FfE7e48ca1e1"
            )}
          </SLobbyTd>
          <SLobbyTd>
            {walletAddressShortener(
              "0x31cc282cC1865557246909c760BE7C51B568422D"
            )}
          </SLobbyTd>
          <SLobbyTd>
            <SGameDiv>
              <p>1 WGM</p>
              <SLogo src={AvaxLogo} />
            </SGameDiv>
          </SLobbyTd>
          <SLobbyTd>
            <SGameStatusChip
              background="#afa7ed"
              customcolor="#6050dc"
              label="Finished"
            />
          </SLobbyTd>
        </tr>
      </tbody>
    </SLobbiesTable>
  );
}

const SLobbiesTable = styled.table`
  background-color: #1e2023;
  width: 100%;
  border-radius: 10px;
  padding: 1rem;
  border-collapse: collapse;
  font-size: 14px;
`;

const SLobbyHeader = styled.th`
  text-align: left;
  color: #56575a;
  font-weight: 400;
  padding: 1rem 1rem;
`;

const SLobbyTd = styled.td`
  padding: 1rem 1rem;
`;

const SGameStatusChip = styled(Chip)<{
  background: string;
  customcolor: string;
}>`
  && {
    background-color: ${(props) => props.background};
    color: ${(props) => props.customcolor};
    font-family: inherit;
  }
`;

const SLogo = styled.img`
  height: 1.5rem;
  width: 1.5rem;
`;

const SGameDiv = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;
