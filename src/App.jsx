import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Terminal from "./Terminal";
import Home from "./Home";
import AdminPanel from "./admin";
import TopNav from "./TopNav";

export default function App() {
  return (
    <Router>
      <TopNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terminal" element={<Terminal />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

