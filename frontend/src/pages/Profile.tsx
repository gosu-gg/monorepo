import styled from "styled-components";

import Page from "../components/Page";
import AvalancheBackground from "../../assets/avalanche-background.png";
import HuskyLogo from "../../assets/husky-logo.svg";
import ClashRoyaleLogo from "../../assets/clash-royale-icon.png";
import GameTable from "../components/GameTable";
import { SIDENAV_MARGIN } from "../components/Sidenav/Sidenav";

export default function Profile() {
  return (
    <Page requireConnection={true}>
      <SUserBasicInfoContainer>
        <SUserProfileHeaderContainer>
          <SUserPicture src={HuskyLogo} />
        </SUserProfileHeaderContainer>
        <SUserDetailsContainer>
          <div>
            <h2>C-Chain Address</h2>
            <p>0x553411c3597c52BBF4e18521F6f2FfE7e48ca1e1</p>
          </div>
          <SUserStatsContainer>
            <div>
              <h3># of Games</h3>
              <p>50</p>
            </div>
            <div>
              <h3># of Victories</h3>
              <p>25</p>
            </div>
            <div>
              <h3>Victory Ratio</h3>
              <p>50%</p>
            </div>
          </SUserStatsContainer>
        </SUserDetailsContainer>
      </SUserBasicInfoContainer>
      <SUserGameDetailsContainer>
        <SUserGameTagContainer>
          <h3>Game Tags</h3>
          <SUserGameTags>
            <SGameTag>
              <SLogo src={ClashRoyaleLogo} />
              <h5>#PUPP8LPV</h5>
            </SGameTag>
          </SUserGameTags>
        </SUserGameTagContainer>
        <GameTable tableType="lastResults" />
      </SUserGameDetailsContainer>
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
