import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import BattleDetailUser from "../components/BattleDetailUser";
import Page from "../components/Page";

export default function BattleDetail() {
  const { battleId } = useParams();
  const user1 = "0xbb3434ab44abaaeeeebe";
  const user2 = undefined;

  useEffect(() => {
    console.log(battleId);
  }, [battleId]);

  return (
    <Page requireConnection={false}>
      <SContainer>
        <BattleDetailUser address={user1} status={"waiting"} />
        <span style={{ fontSize: "6rem" }}>VS</span>
        <BattleDetailUser address={user2} status={"waiting"} />
      </SContainer>
    </Page>
  );
}

const SContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-around;
  align-items: center;
  background-color: #1e2023;
  padding: 2rem;
  border-radius: 10px;
`;
