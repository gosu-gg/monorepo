import { Skeleton } from "@mui/material";
import React from "react";
import styled from "styled-components";

type Props = {
  address: string | undefined;
  status: "winner" | "looser" | "waiting";
};

export default function BattleDetailUser(props: Props) {
  const { address, status } = props;
  return (
    <SUserContainer>
      {address ? (
        <div
          style={{
            height: "12rem",
            width: "12rem",
            backgroundColor: "white",
            borderRadius: "50%",
          }}
        ></div>
      ) : (
        <Skeleton
          // sx={{ bgcolor: "grey.900" }}
          variant="circular"
          width="12rem"
          height="12rem"
        />
      )}
      {/* TODO: ONCLICK => REDIRECT TO PROFILE */}
      <SAddressContainer>
        {address === undefined ? "0x0000000000" : address}
      </SAddressContainer>
      <SUserStatus>{status}</SUserStatus>
    </SUserContainer>
  );
}

const SUserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const SUserStatus = styled.div`
  font-size: 3rem;
  text-transform: capitalize;
`;

const SAddressContainer = styled.div`
  color: #6050dc;
`;
