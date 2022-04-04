import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "typeface-roboto";

import "./stylesheets/App.css";
import "./stylesheets/ChatWindow.css";
import "./stylesheets/Home.css";
import "./stylesheets/TopNav.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
