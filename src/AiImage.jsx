import React from "react";

export default function AiImage(props) {
  const { back, name, onClick } = props;

  return (
    <div className="ai-img-container">
      <div
        alt={name}
        className="ai-img"
        style={{ backgroundImage: `url(${back})` }}
        onClick={onClick}
      />
      <label className="ai-img-text">{name}</label>
    </div>
  );
}
