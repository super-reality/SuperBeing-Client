import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Terminal from "./Terminal";
import Home from "./Home";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="terminal" element={<Terminal />} />
      </Routes>
    </Router>
  );
}
