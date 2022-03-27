import { Chip } from "@mui/material";
import styled from "styled-components";

import { walletAddressShortener } from "../helpers/helpers";
import ClashRoyaleLogo from "../../assets/clash-royale-icon.png";
import AvaxLogo from "../../assets/avalanche-avax-logo.png";
import { useState } from "react";
import { useEffect } from "react";
import { useWeb3 } from "../hooks";
import GosuAbi from "../utils/abi/gosu.json";
import { CONTRACT_ADDRESS } from "../utils/chain_infos";
import { Link, Navigate, useNavigate } from "react-router-dom";
import LoaderWrapper from "./LoaderWrapper";

type Props = {
  tableType: "currentLobbies" | "lastResults";
};

export default function GameTable({ tableType }: Props) {
  const { web3State } = useWeb3();
  const [loading, setLoading] = useState(false);
  const [joinLoading, setJoinLoading] = useState(false);
  const navigate = useNavigate();
  const [games, setGames] = useState<
    Array<{
      player1: string;
      player2: string;
      value: string;
      status: number;
      id: string;
    }>
  >([]);

  useEffect(() => {
    const contract = new web3State.provider.eth.Contract(
      // eslint-disable-next-line
      GosuAbi.abi as any,
      CONTRACT_ADDRESS
    );

    setLoading(true);

    (async () => {
      try {
        const length = await contract.methods.getGamesLength().call();
        const promisesArray: Array<Promise<unknown>> = [];
        for (let i = 0; i < length; i++) {
          promisesArray.push(await contract.methods.games(i.toString()).call());
        }
        const gamesReal = await Promise.all(promisesArray);
        console.log(gamesReal);
        setGames(
          (
            gamesReal as Array<{
              player: string;
              opponent: string;
              betAmount: string;
              state: string;
              id: string;
            }>
          )
            .map((gameReal) => ({
              player1: gameReal.player,
              player2: gameReal.opponent,
              value: web3State.provider.utils.fromWei(
                gameReal.betAmount,
                "ether"
              ),
              status: parseInt(gameReal.state),
              id: gameReal.id,
            }))
            .filter(
              (gameReal) =>
                tableType === "currentLobbies" ||
                (web3State.walletConnected &&
                  web3State.address === gameReal.player1) ||
                (web3State.walletConnected &&
                  web3State.address === gameReal.player2)
            )
        );
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    })();
  }, []);

  const joinGame = async (gameId: string, value: string) => {
    if (!web3State.walletConnected || !web3State.rightChainId) return;

    const contract = new web3State.provider.eth.Contract(
      // eslint-disable-next-line
      GosuAbi.abi as any,
      CONTRACT_ADDRESS
    );
    setJoinLoading(true);

    try {
      await contract.methods.joinGame(parseInt(gameId)).send({
        from: web3State.address,
        value: web3State.provider.utils.toWei(value, "ether"),
      });
      navigate(`/battle/${gameId}`);
    } catch (error) {
      console.error(error);
    }
    setJoinLoading(false);
  };

  return (
    <SLobbiesTable>
      <thead>
        <tr>
          <SLobbyHeader>Game</SLobbyHeader>
          <SLobbyHeader>Player 1</SLobbyHeader>
          <SLobbyHeader>Player 2</SLobbyHeader>
          <SLobbyHeader>Bet Amount</SLobbyHeader>
          <SLobbyHeader>
            {tableType === "currentLobbies" ? "Status" : "Result"}
          </SLobbyHeader>
        </tr>
      </thead>
      <tbody>
        <SLoaderWrapper loading={loading}>
          {games.map((game) => (
            <STableRow
              onClick={() => navigate(`/battle/${game.id}`)}
              key={game.id}
            >
              <SLobbyTd>
                <SGameDiv>
                  <SLogo src={ClashRoyaleLogo} />
                  <p>Clash Royale</p>
                </SGameDiv>
              </SLobbyTd>
              <SLobbyTd>{walletAddressShortener(game.player1)}</SLobbyTd>
              <SLobbyTd>{walletAddressShortener(game.player2)}</SLobbyTd>
              <SLobbyTd>
                <SGameDiv>
                  <p>{game.value} WGM</p>
                  <SLogo src={AvaxLogo} />
                </SGameDiv>
              </SLobbyTd>
              <SLobbyTd color="#FDDA0D">
                {tableType === "currentLobbies" ? (
                  game.player2 ===
                    "0x0000000000000000000000000000000000000000" &&
                  game.status === 3 ? (
                    <SGameStatusChip
                      onClick={(event) => {
                        event.stopPropagation();
                        joinGame(game.id, game.value);
                      }}
                      style={{ cursor: "pointer" }}
                      background="#feec86"
                      customcolor="#caae0a"
                      label={joinLoading ? "Loading..." : "Join game"}
                    />
                  ) : game.status === 1 ||
                    game.status === 0 ||
                    game.status === 2 ||
                    game.status === 4 ||
                    game.status === 5 ? (
                    <SGameStatusChip
                      background="#afa7ed"
                      customcolor="#6050dc"
                      label="Finished"
                    />
                  ) : (
                    <SGameStatusChip
                      background="#a7e3bb"
                      customcolor="#388c54"
                      label={
                        tableType === "currentLobbies"
                          ? "Currently playing"
                          : "Victory"
                      }
                    />
                  )
                ) : (game.player1 ===
                    (web3State.walletConnected ? web3State.address : "") &&
                    game.status === 1) ||
                  (game.player2 ===
                    (web3State.walletConnected ? web3State.address : "") &&
                    game.status === 2) ? (
                  <SGameStatusChip
                    background="#a7e3bb"
                    customcolor="#388c54"
                    label="Victory"
                  />
                ) : game.player2 ===
                    "0x0000000000000000000000000000000000000000" &&
                  game.status === 3 ? (
                  <SGameStatusChip
                    background="#e68f94"
                    customcolor="#d2363e"
                    label="Pending"
                  />
                ) : game.status === 0 ? (
                  <SGameStatusChip
                    background="#feec86"
                    customcolor="#caae0a"
                    label="Canceled"
                  />
                ) : (
                  <SGameStatusChip
                    background="#e68f94"
                    customcolor="#d2363e"
                    label="Defeat"
                  />
                )}
              </SLobbyTd>
            </STableRow>
          ))}
        </SLoaderWrapper>
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

const STableRow = styled.tr`
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    background-color: #ffffff10;
  }
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

const SLoaderWrapper = styled(LoaderWrapper)`
  margin: 1rem;
`;
