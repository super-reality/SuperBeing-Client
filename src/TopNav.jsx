import React from "react";
import { useNavigate } from "react-router-dom";

export default function TopNav() {
  const navigate = useNavigate();

  return (
    <div className="top-nav-container">
      <div className="top-nav-options-container">
        <div className="top-nav-option" onClick={() => navigate("/admin")}>
          ADMIN
        </div>
        <div className="top-nav-option" onClick={() => navigate("/")}>
          MEME PAPER
        </div>
        <div className="top-nav-option" onClick={() => navigate("/")}>
          BUY SUPER
        </div>
      </div>
    </div>
  );
}
