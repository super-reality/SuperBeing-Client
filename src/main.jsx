import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "typeface-roboto";

import "./stylesheets/App.css";
import "./stylesheets/ChatWindow.css";
import "./stylesheets/Home.css";
import "./stylesheets/TopNav.css";
import "./stylesheets/bootstrap.css";
import "./stylesheets/animate.min.css";
import "./js/bootstrap.js";
import "./js/jquery.min.js";
import "./js/wow.min.js";


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
