import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { Web3Provider } from "./contexts/Web3Context";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Web3Provider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Web3Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
