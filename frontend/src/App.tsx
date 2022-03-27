import React from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import ConnectButton from "./components/ConnectButton";

import Sidenav, { SIDENAV_MARGIN } from "./components/Sidenav/Sidenav";
import { useWeb3 } from "./hooks";
import Battle from "./pages/Battle";
import BattleDetail from "./pages/BattleDetail";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <SAppContainer>
      <Sidenav />
      {/* GOSU */}
      <ConnectButton />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/battle" element={<Battle />} />
        <Route path="/battle/:battleId" element={<BattleDetail />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </SAppContainer>
  );
}

const SAppContainer = styled.div`
  display: grid;
  height: 100vh;
  width: 100%;
  padding: ${SIDENAV_MARGIN}rem;
  grid-gap: ${SIDENAV_MARGIN}rem;
  grid-template-columns: 4.5rem 1fr 12rem;
  grid-template-rows: 50px 1fr;
  grid-template-areas:
    ". . connect"
    "sidenav page page"
    "sidenav page page";
`;
