import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidenav from "./components/Sidenav";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Sidenav />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
