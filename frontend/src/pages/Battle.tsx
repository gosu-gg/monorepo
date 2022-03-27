import Page from "../components/Page";
import styled from "styled-components";

import CreateGame from "../components/CreateGame";
import GameTable from "../components/GameTable";
import { SIDENAV_MARGIN } from "../components/Sidenav/Sidenav";
import { useEffect } from "react";

export default function Battle() {
  useEffect(() => {
    // Fetch data to know if someone is in a game
    // if in a game => set a state and redirect to the game page
  }, []);
  return (
    <Page requireConnection={false}>
      <SPageContainer>
        <SLeftContainer>
          <CreateGame />
        </SLeftContainer>
        <SRightContainer>
          <GameTable tableType="currentLobbies" />
        </SRightContainer>
      </SPageContainer>
    </Page>
  );
}

const SPageContainer = styled.div`
  display: flex;
  gap: ${SIDENAV_MARGIN}rem;
`;

const SLeftContainer = styled.div``;

const SRightContainer = styled.div`
  flex: 1;
`;
