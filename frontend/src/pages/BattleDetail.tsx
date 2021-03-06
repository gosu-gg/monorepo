import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import BattleDetailUser from "../components/BattleDetailUser";
import Page from "../components/Page";
import { useWeb3 } from "../hooks";
import { CONTRACT_ADDRESS } from "../utils/chain_infos";
import GosuAbi from "../utils/abi/gosu.json";
import { SButton } from "../components/CreateGame";
import LoaderWrapper from "../components/LoaderWrapper";

export default function BattleDetail() {
  const { web3State } = useWeb3();
  const { battleId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [gameData, setGameData] = useState({
    player1: "",
    player2: "",
    player1Status: "waiting" as "winner" | "loser" | "waiting",
    player2Status: "waiting" as "winner" | "loser" | "waiting",
    player1Tag: "",
    player2Tag: "",
    state: "",
  });

  useEffect(() => {
    const contract = new web3State.provider.eth.Contract(
      // eslint-disable-next-line
      GosuAbi.abi as any,
      CONTRACT_ADDRESS
    );

    (async () => {
      try {
        const game = await contract.methods.games(battleId).call();
        const player1Status =
          game.state === "1"
            ? "winner"
            : game.state === "2"
            ? "loser"
            : "waiting";

        const player2Status =
          game.state === "2"
            ? "winner"
            : game.state === "1"
            ? "loser"
            : "waiting";

        const player1Tag = await contract.methods
          .addressToTag(game.player)
          .call();
        const player2Tag = await contract.methods
          .addressToTag(game.opponent)
          .call();

        setGameData({
          player1: game.player,
          player2: game.opponent,
          player1Status,
          player2Status,
          state: game.state,
          player1Tag,
          player2Tag,
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }, [battleId]);

  const cancelGame = async () => {
    if (loading || !web3State.walletConnected || !web3State.rightChainId)
      return;

    const contract = new web3State.provider.eth.Contract(
      // eslint-disable-next-line
      GosuAbi.abi as any,
      CONTRACT_ADDRESS
    );

    setLoading(true);
    try {
      await contract.methods
        .cancelGame(battleId)
        .send({ from: web3State.address });
      navigate("/battle");
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const url = process.env.NODE_ENV === 'production' ? 'https://avalanche-summit.herokuapp.com/battle-result' : 'http://localhost:8080/battle-result' ;

  const finishGame = async () => {
    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ gameId: parseInt(battleId || "") }),
    })
      .then((response) => response.text())
      .then((data) => console.log(data));
  };

  return (
    <Page requireConnection={false}>
      <SContainer>
        <SGameDataContainer>
          <BattleDetailUser
            address={gameData.player1}
            status={gameData.player1Status}
            tag={gameData.player1Tag}
          />
          <span style={{ fontSize: "6rem" }}>VS</span>
          <BattleDetailUser
            address={gameData.player2}
            status={gameData.player2Status}
            tag={gameData.player2Tag}
          />
        </SGameDataContainer>

        {gameData.state === "3" &&
          gameData.player2 === "0x0000000000000000000000000000000000000000" &&
          (web3State.walletConnected
            ? gameData.player1 === web3State.address
            : false) && (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: "2rem",
              }}
            >
              <SButton onClick={cancelGame}>
                <LoaderWrapper loading={loading}>Cancel</LoaderWrapper>
              </SButton>
            </div>
          )}

        {gameData.state === "3" &&
          gameData.player2 !== "0x0000000000000000000000000000000000000000" &&
          (web3State.walletConnected
            ? gameData.player1 === web3State.address ||
              gameData.player2 === web3State.address
            : false) && (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: "2rem",
              }}
            >
              <SButton onClick={finishGame}>
                <LoaderWrapper loading={loading}>Finish game</LoaderWrapper>
              </SButton>
            </div>
          )}
        <div
          style={{ display: "grid", placeItems: "center", marginTop: "3rem" }}
        >
          Add your opponent's tag on the clash royale game and start a battle!
        </div>
      </SContainer>
    </Page>
  );
}

const SContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #1e2023;
  padding: 2rem;
  border-radius: 10px;
`;

const SGameDataContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
