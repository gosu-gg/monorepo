import { useEffect, useState } from "react";
import styled from "styled-components";

import Page from "../components/Page";
import AvalancheBackground from "../../assets/avalanche-background.png";
import HuskyLogo from "../../assets/husky-logo.svg";
import ClashRoyaleLogo from "../../assets/clash-royale-icon.png";
import GameTable from "../components/GameTable";
import { SIDENAV_MARGIN } from "../components/Sidenav/Sidenav";
import { Button } from "@mui/material";
import GameTagModal from "../components/GameTagModal";
import { useWeb3 } from "../hooks";
import GosuAbi from "../utils/abi/gosu.json";
import { CONTRACT_ADDRESS } from "../utils/chain_infos";

export default function Profile() {
  const [openModal, setOpenModal] = useState(false);
  const { web3State } = useWeb3();
  const [gameTag, setGameTag] = useState("");
  const [playerStats, setPlayerStats] = useState({
    win: "0",
    defeat: "0",
    draw: "0",
  });
  const nbWin = parseInt(playerStats.win);
  const nbLose = parseInt(playerStats.defeat);
  const nbDraw = parseInt(playerStats.draw);
  const nbGames = nbWin + nbLose + nbDraw;

  const contract = new web3State.provider.eth.Contract(
    // eslint-disable-next-line
    GosuAbi.abi as any,
    CONTRACT_ADDRESS
  );

  useEffect(() => {
    if (!web3State.walletConnected || !web3State.rightChainId) return;
    (async () => {
      try {
        const getGameTag = await contract.methods
          .addressToTag(web3State.address)
          .call();
        setGameTag(getGameTag);

        const statsPlayer = await contract.methods
          .statsPlayer(web3State.address)
          .call();
        setPlayerStats(statsPlayer);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [web3State]);

  const addGameTag = async (gameTag: string) => {
    if (!web3State.walletConnected || !web3State.rightChainId) return;
    try {
      await contract.methods.register(gameTag).send({
        from: web3State.address,
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (!web3State.walletConnected) {
    return <Page requireConnection={true}></Page>;
  }

  return (
    <Page requireConnection={true}>
      <SUserBasicInfoContainer>
        <SUserProfileHeaderContainer>
          <SUserPicture src={HuskyLogo} />
        </SUserProfileHeaderContainer>
        <SUserDetailsContainer>
          <div>
            <h2>C-Chain Address</h2>
            <p>{web3State.address}</p>
          </div>
          <SUserStatsContainer>
            <div>
              <h3># of Games</h3>
              <p>{nbGames}</p>
            </div>
            <div>
              <h3># of Victories</h3>
              <p>{playerStats.win}</p>
            </div>
            <div>
              <h3>Victory Ratio</h3>
              <p>{nbGames === 0 ? 0 : (nbWin / nbGames) * 100}%</p>
            </div>
          </SUserStatsContainer>
        </SUserDetailsContainer>
      </SUserBasicInfoContainer>
      <SUserGameDetailsContainer>
        <SUserGameTagContainer>
          <h3>Game Tags</h3>
          <SUserGameTags>
            {gameTag.length > 0 ? (
              <SGameTag>
                <SLogo src={ClashRoyaleLogo} />
                <h5>{gameTag}</h5>
              </SGameTag>
            ) : null}
          </SUserGameTags>
          <SButton onClick={() => setOpenModal(true)}>Add a Game Tag</SButton>
        </SUserGameTagContainer>
        <GameTable tableType="lastResults" />
      </SUserGameDetailsContainer>
      <GameTagModal
        open={openModal}
        closeModal={() => setOpenModal(false)}
        registerGameTag={addGameTag}
      />
    </Page>
  );
}

const SUserBasicInfoContainer = styled.div`
  width: 100%;
  background-color: #1e2023;
`;

const SUserProfileHeaderContainer = styled.div`
  position: relative;
  background: url(${AvalancheBackground}) no-repeat;
  background-size: cover;
  background-position: center;
  height: 15rem;
  border-radius: 10px 10px 0 0;
`;

const SUserPicture = styled.img`
  position: absolute;
  bottom: -3.5rem;
  left: 2rem;
  border: 10px solid #1e2023;
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
`;

const SUserDetailsContainer = styled.div`
  width: 100%;
  margin-top: 4rem;
  padding: 0 2rem 2rem 2rem;
  display: flex;
`;

const SUserStatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  text-align: center;
  margin-left: auto;
  margin-right: 5rem;
  gap: 3rem;
  place-items: center;
`;

const SUserGameDetailsContainer = styled.div`
  display: flex;
  gap: ${SIDENAV_MARGIN}rem;
  padding-top: ${SIDENAV_MARGIN}rem;
`;

const SUserGameTagContainer = styled.div`
  width: 30rem;
  background-color: #1e2023;
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const SUserGameTags = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 1.5rem;
`;

const SGameTag = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SLogo = styled.img`
  height: 3rem;
  width: 3rem;
`;

export const SButton = styled(Button)`
  && {
    background-color: #6050dc;
    color: white;
    padding: 0.5rem;
    width: 10rem;
    font-family: inherit;
    font-weight: 600;
    margin-top: auto;
    align-self: center;
  }
`;
