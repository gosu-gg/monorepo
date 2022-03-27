import React from "react";
import { Routes, Route } from "react-router-dom";

import Sidenav from "./components/Sidenav/Sidenav";
import { useWeb3 } from "./hooks";
import Battle from "./pages/Battle";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <Sidenav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/battle" element={<Battle />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
