import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Route from "./routes/public";

export default function App() {
  return (
    <Router>
      <Route />
    </Router>
  );
}
