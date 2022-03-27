import * as React from "react";

import { Button, Dialog, DialogTitle } from "@mui/material";
import styled from "styled-components";
import Input from "./Input";

type Props = {
  open: boolean;
  closeModal: () => void;
  registerGameTag: (gameTag: string) => void;
};

export default function GameTagModal(props: Props) {
  const { open, closeModal, registerGameTag } = props;
  const [gameTag, setGameTag] = React.useState("");

  const handleClose = () => {
    registerGameTag(gameTag);
    closeModal();
  };

  return (
    <SDialog open={open} onClose={closeModal}>
      <DialogTitle>Enter Game Tag</DialogTitle>
      <SInput
        placeholder="Game Tag"
        value={gameTag}
        onChange={(event) => setGameTag(event.target.value)}
      />
      <SButton onClick={handleClose}>Add Game Tag</SButton>
    </SDialog>
  );
}

const SDialog = styled(Dialog)`
  && .MuiPaper-root {
    background-color: #1e2023;
    font-family: inherit;
    color: white;
    padding: 0 3rem 1.5rem 3rem;
    border-radius: 10px;
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
    margin-top: 2rem;
    margin-left: auto;
    margin-right: auto;
  }
`;

const SInput = styled(Input)`
  border: 1px solid lightgray;
  margin-top: 2rem;
  border-radius: 5px;
  padding: 0.3rem;
`;
