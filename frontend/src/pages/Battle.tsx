import Page from "../components/Page";
import styled from "styled-components";

import CreateGame from "../components/CreateGame";
import GameTable from "../components/GameTable";

export default function Battle() {
  return (
    <Page requireConnection={true}>
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
  gap: 1rem;
`;
const SLeftContainer = styled.div``;
const SRightContainer = styled.div`
  flex: 1;
`;
